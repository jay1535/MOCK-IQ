"use client";

import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";

function StartInterview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentFeedback, setCurrentFeedback] = useState(null);

  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Fetch interview questions
  useEffect(() => {
    if (!params.interviewId) return;

    const GetInterviewDetails = async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

        if (result.length > 0) {
          const jsonMockResp = JSON.parse(result[0].jsonMockResp || "[]");
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
        toast("Error fetching interview questions");
      }
    };

    GetInterviewDetails();
  }, [params.interviewId]);

  // Update user answer as speech is recognized
  useEffect(() => {
    setUserAnswer(results.map((r) => r.transcript).join(" "));
  }, [results]);

  // Automatically save answer (even empty) when recording stops
  useEffect(() => {
    if (!isRecording) {
      SaveUserAnswer(userAnswer);
    }
  }, [isRecording]);

  // Start / Stop recording
  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      setResults([]);
      startSpeechToText();
    }
  };

  // Save answer & get AI feedback
  const SaveUserAnswer = async (answer) => {
    if (!interviewData || !mockInterviewQuestion[activeQuestionIndex]) return;

    setLoading(true);

    const questionObj = mockInterviewQuestion[activeQuestionIndex];
    const feedbackPrompt = `
      Question: "${questionObj.question}"
      User answer: "${answer || ''}"
      Based on this, provide a rating (out of 10) and feedback as a valid JSON object.
      Example: { "rating": 8, "feedback": "Good answer, but could be more detailed." }
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = await result.response.text();

      // Extract JSON safely
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      let JsonFeedbackResp = { rating: 0, feedback: "No feedback available" };
      if (jsonMatch) {
        try {
          JsonFeedbackResp = JSON.parse(jsonMatch[0]);
        } catch (err) {
          console.error("Error parsing AI JSON:", err, responseText);
        }
      }

      setCurrentFeedback(JsonFeedbackResp);

      // Save in DB
      await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: questionObj.question,
        correctAns: questionObj.answer,
        userAns: answer || "",
        feedback: JsonFeedbackResp.feedback || "",
        rating: JsonFeedbackResp.rating || 0,
      });

      toast("Answer saved successfully");

      // Reset user answer for next question
      setUserAnswer("");
      setResults([]);
    } catch (error) {
      console.error("Error saving user answer:", error);
      toast("Error saving answer");
    } finally {
      setLoading(false);
    }
  };

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
          className="border hover:bg-primary text-white mt-2"
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <>
              <StopCircle /> Stop Recording
            </>
          ) : (
            <>
              <Mic /> Record Answer
            </>
          )}
        </Button>

        <Button
          className="border rounded-lg hover:bg-primary text-white mt-2"
          onClick={() => console.log("User Answer:", userAnswer)}
        >
          Show User Answer
        </Button>
      </div>
    </div>
  );
}

export default StartInterview;
