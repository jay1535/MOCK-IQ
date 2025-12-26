"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";

import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

import { chatSession } from "@/utils/GeminiAiModel";
import { saveUserAnswerAction } from "@/app/actions/saveUserAnswer";
import { getInterviewByMockId } from "@/app/actions/getInterview";
import { useSpeechRecognition } from "@/app/hooks/useSpeechRecognition";

/* --------------------------------------------------
   🔒 SAFE FALLBACK (NO AI REQUIRED)
-------------------------------------------------- */
function fallbackFeedback(answer = "") {
  if (!answer.trim()) {
    return {
      rating: 0,
      feedback:
        "No answer was provided. Try answering clearly and confidently next time.",
    };
  }

  const wordCount = answer.split(" ").length;

  return {
    rating: Math.min(8, Math.max(3, Math.floor(wordCount / 10))),
    feedback:
      "Your answer was recorded successfully. Improve clarity, structure, and include real examples for a stronger response.",
  };
}

export default function InterviewCore() {
  const params = useParams();
  const interviewId = params?.interviewId; // ✅ SINGLE SOURCE OF TRUTH

  const { transcript, isRecording, start, stop } = useSpeechRecognition();

  const [questions, setQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  /* --------------------------------------------------
     LOAD INTERVIEW QUESTIONS
  -------------------------------------------------- */
  useEffect(() => {
    if (!interviewId) return;

    getInterviewByMockId(interviewId).then((data) => {
      try {
        setQuestions(JSON.parse(data?.jsonMockResp ?? "[]"));
      } catch {
        setQuestions([]);
      }
    });
  }, [interviewId]);

  /* --------------------------------------------------
     SAVE ANSWER (AI + FALLBACK SAFE)
  -------------------------------------------------- */
  const saveAnswer = useCallback(async () => {
    try {
      setLoading(true);

      const q = questions[activeQuestionIndex];
      if (!q) return;

      let feedbackData;

      /* ---------- TRY AI ---------- */
      try {
        const prompt = `
Return STRICT JSON only.

{
  "rating": 1-10,
  "feedback": "one paragraph"
}

Question: ${q.question}
Correct Answer: ${q.answer}
User Answer: ${transcript || "No answer"}
`;

        const ai = await chatSession.sendMessage(prompt);
        const text = await ai.response.text();
        feedbackData = JSON.parse(text.match(/\{[\s\S]*\}/)[0]);
      } catch (aiError) {
        console.warn("⚠️ AI quota exceeded, using fallback feedback");
        feedbackData = fallbackFeedback(transcript);
      }

      setCurrentFeedback(feedbackData);

      /* ---------- ALWAYS SAVE ---------- */
      await saveUserAnswerAction({
        mockIdRef: interviewId,
        question: q.question,
        correctAns: q.answer,
        userAns: transcript,
        feedback: feedbackData.feedback,
        rating: feedbackData.rating,
      });

      toast.success("Answer saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save answer");
    } finally {
      setLoading(false);
    }
  }, [questions, activeQuestionIndex, transcript, interviewId]);

  /* --------------------------------------------------
     MIC HANDLER
  -------------------------------------------------- */
  const handleMic = () => {
    if (isRecording) {
      stop();
      setTimeout(saveAnswer, 400);
    } else {
      start();
    }
  };

  /* --------------------------------------------------
     UI
  -------------------------------------------------- */
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          interviewId={interviewId}
          mockInterviewQuestion={questions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />

        <RecordAnswerSection
          userAnswer={transcript}
          currentFeedback={currentFeedback}
        />

        <div className="md:col-span-2 flex justify-center">
          <Button onClick={handleMic} disabled={loading}>
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
