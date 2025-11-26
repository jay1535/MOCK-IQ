"use client";

import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

import useSpeechToText from "react-hook-speech-to-text";

import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";

/**
 * InterviewCore.jsx
 *
 * - Robust start/stop toggling for SpeechRecognition (avoids InvalidStateError)
 * - Always requests feedback from AI even when answer is empty
 * - Safe JSON extraction & fallback feedback
 * - Defensive DB insert using fallback mockIdRef
 */

export default function InterviewCore() {
  const params = useParams();

  // -------------------------------
  // Speech hook (must be top-level)
  // -------------------------------
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
    error,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // -------------------------------
  // State
  // -------------------------------
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  // Prevent concurrent toggles that cause InvalidStateError
  const [isToggling, setIsToggling] = useState(false);

  // -------------------------------
  // Load interview data + questions
  // -------------------------------
  useEffect(() => {
    if (!params?.interviewId) return;

    const load = async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

        const row = result?.[0] ?? null;
        setInterviewData(row);

        try {
          setMockInterviewQuestion(JSON.parse(row?.jsonMockResp ?? "[]"));
        } catch (e) {
          console.warn("Failed to parse jsonMockResp:", e);
          setMockInterviewQuestion([]);
        }
      } catch (err) {
        console.error("Failed to load interview:", err);
        setInterviewData(null);
        setMockInterviewQuestion([]);
      }
    };

    load();
  }, [params?.interviewId]);

  // -------------------------------
  // Update userAnswer as speech results arrive
  // -------------------------------
  useEffect(() => {
    if (results && results.length > 0) {
      const transcript = results.map((r) => r.transcript).join(" ");
      setUserAnswer(transcript);
    }
  }, [results]);

  // -------------------------------
  // Build prompt helper
  // -------------------------------
  const buildPrompt = (questionText, correctText, userAnsText) => {
    return `
You are an expert interviewer and grader.
Return STRICT JSON ONLY — no extra commentary, nothing outside the JSON object.

JSON schema:
{
  "rating": <integer 1-10>,
  "feedback": "<one-paragraph feedback string>"
}

Question: ${questionText}
Correct Answer: ${correctText}
User Answer: ${userAnsText}
`;
  };

  // -------------------------------
  // Save user answer & request feedback
  // -------------------------------
  const SaveUserAnswer = useCallback(
    async (answer) => {
      setLoading(true);

      try {
        const q = mockInterviewQuestion?.[activeQuestionIndex];

        const questionText = q?.question ?? "No question loaded";
        const correctText = q?.answer ?? "No correct answer available";
        const userAnsText = (answer ?? "").trim() || "No answer provided";

        const prompt = buildPrompt(questionText, correctText, userAnsText);

        // Send prompt to AI
        const ai = await chatSession.sendMessage(prompt);

        // accommodate different SDK shapes safely
        const text =
          (await (ai?.response?.text ? ai.response.text() : Promise.resolve(String(ai)))) ||
          "";

        // Extract JSON safely (first {...} block)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        let feedback = { rating: 0, feedback: "No feedback generated." };

        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]);

            const rating =
              typeof parsed.rating === "number"
                ? Math.max(0, Math.min(10, Math.round(parsed.rating)))
                : Number.isInteger(parsed.rating)
                ? parsed.rating
                : 0;
            const fb =
              typeof parsed.feedback === "string"
                ? parsed.feedback
                : String(parsed.feedback ?? "");

            feedback = { rating: Number(rating || 0), feedback: fb };
          } catch (parseErr) {
            console.error("Failed to parse AI JSON:", parseErr, "raw:", jsonMatch[0]);
            feedback = {
              rating: 0,
              feedback: `Could not parse model response. Raw: ${text.slice(0, 400)}`,
            };
          }
        } else {
          console.warn("No JSON found in model response:", text.slice(0, 400));
          feedback = { rating: 0, feedback: `Model did not return JSON. Raw: ${text.slice(0, 400)}` };
        }

        setCurrentFeedback(feedback);

        // Fallback mockIdRef so DB insert won't fail
        const mockIdRef = interviewData?.mockId ?? params?.interviewId ?? null;

        // Save in DB
        await db.insert(UserAnswer).values({
          mockIdRef,
          question: questionText,
          correctAns: correctText,
          userAns: userAnsText,
          feedback: feedback.feedback,
          rating: feedback.rating,
          // if you add createdAt/rawResponse fields, insert them here
        });

        toast.success("Answer saved with feedback!");
      } catch (err) {
        console.error("SaveUserAnswer error:", err);
        toast.error("Error generating or saving feedback");
      } finally {
        setLoading(false);
      }
    },
    [activeQuestionIndex, interviewData, mockInterviewQuestion, params?.interviewId]
  );

  // -------------------------------
  // Start / Stop recording (robust)
  // -------------------------------
  const StartStopRecording = async () => {
    // prevent concurrent toggles (double click)
    if (isToggling) return;
    setIsToggling(true);

    try {
      if (isRecording) {
        // Attempt to stop (guarded)
        try {
          stopSpeechToText();
        } catch (stopErr) {
          console.warn("stopSpeechToText threw:", stopErr);
        }

        // wait briefly for final results to flush
        setTimeout(() => {
          const finalAnswer = (results || []).map((r) => r.transcript).join(" ").trim() || "No answer provided";
          setUserAnswer(finalAnswer);
          // Always attempt to generate feedback
          SaveUserAnswer(finalAnswer);
          setIsToggling(false);
        }, 700);
      } else {
        // Starting
        try {
          // reset previous results and UI state
          setResults([]);
          setUserAnswer("");
          setCurrentFeedback(null);

          // try starting
          startSpeechToText();

          // release toggle lock after small delay to avoid quick double-starts
          setTimeout(() => setIsToggling(false), 500);
        } catch (startErr) {
          console.warn("startSpeechToText error:", startErr);
          // handle InvalidStateError by trying to stop then restart
          if (startErr?.name === "InvalidStateError") {
            try {
              stopSpeechToText();
            } catch (e) {
              console.warn("stop after InvalidStateError failed:", e);
            }
            setTimeout(() => {
              try {
                startSpeechToText();
              } catch (e2) {
                console.error("retry startSpeechToText failed:", e2);
              } finally {
                setIsToggling(false);
              }
            }, 300);
          } else {
            setIsToggling(false);
          }
        }
      }
    } catch (err) {
      console.error("StartStopRecording top-level error:", err);
      setIsToggling(false);
    }
  };

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          interviewData={interviewData}
        />

        <RecordAnswerSection
          userAnswer={userAnswer}
          currentFeedback={currentFeedback}
          onManualSave={() => SaveUserAnswer(userAnswer)}
        />

        <div className="md:col-span-2">
          <Button
            disabled={loading || isToggling}
            className="border hover:bg-primary text-white mt-4"
            onClick={StartStopRecording}
            aria-pressed={isRecording}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            {isRecording ? (
              <>
                <StopCircle className="mr-2" /> Stop Recording
              </>
            ) : (
              <>
                <Mic className="mr-2" /> Start Recording
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
