"use client";

import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

import useSpeechToText from "react-hook-speech-to-text";

import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";

export default function InterviewCore() {
  const params = useParams();

  // ---------------------------------------
  // HOOKS — MUST ALWAYS BE AT TOP LEVEL
  // ---------------------------------------
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
    error
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // ---------------------------------------
  // STATES
  // ---------------------------------------
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------------------------------
  // LOAD INTERVIEW DETAILS + QUESTIONS
  // ---------------------------------------
  useEffect(() => {
    const load = async () => {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      const row = result[0];
      setInterviewData(row);

      try {
        setMockInterviewQuestion(JSON.parse(row.jsonMockResp || "[]"));
      } catch {
        setMockInterviewQuestion([]);
      }
    };
    load();
  }, [params.interviewId]);

  // ---------------------------------------
  // UPDATE TEXT WHEN SPEECH RESULTS UPDATE
  // ---------------------------------------
  useEffect(() => {
    if (results.length > 0) {
      const transcript = results.map((r) => r.transcript).join(" ");
      setUserAnswer(transcript);
    }
  }, [results]);

  // ---------------------------------------
  // SAVE USER ANSWER + GENERATE FEEDBACK
  // ---------------------------------------
  const SaveUserAnswer = async (answer) => {
    setLoading(true);

    try {
      const q = mockInterviewQuestion[activeQuestionIndex];

      const prompt = `
        You are an expert interviewer.
        Give STRICT JSON ONLY:
        {"rating":7,"feedback":"Your answer was good."}

        Question: ${q.question}
        Correct Answer: ${q.answer}
        User Answer: ${answer || "No answer provided"}
      `;

      const ai = await chatSession.sendMessage(prompt);
      const text = await ai.response.text();

      // Extract JSON safely
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      let feedback = { rating: 0, feedback: "No feedback generated." };

      if (jsonMatch) {
        feedback = JSON.parse(jsonMatch[0]);
      }

      setCurrentFeedback(feedback);

      // Save to DB
      await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: q.question,
        correctAns: q.answer,
        userAns: answer,
        feedback: feedback.feedback,
        rating: feedback.rating,
      });

      toast.success("Answer saved with feedback!");
    } catch (error) {
      console.error(error);
      toast.error("Error generating feedback");
    }

    setLoading(false);
  };

  // ---------------------------------------
  // START / STOP RECORDING
  // ---------------------------------------
  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();

      setTimeout(() => {
        let finalAnswer = results.map((r) => r.transcript).join(" ");

        if (!finalAnswer.trim()) {
          finalAnswer = "No answer provided";
        }

        setUserAnswer(finalAnswer);
        SaveUserAnswer(finalAnswer);
      }, 800);
    } else {
      setResults([]);
      setUserAnswer("");
      startSpeechToText();
    }
  };

  // ---------------------------------------
  // UI
  // ---------------------------------------
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
        />

        <Button
          disabled={loading}
          className="border hover:bg-primary text-white mt-4"
          onClick={StartStopRecording}
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
  );
}
