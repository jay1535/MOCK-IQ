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

  // ✅ Fetch interview details
  useEffect(() => {
    if (!params.interviewId) return;
    console.log("Params Interview ID:", params.interviewId);

    const GetInterviewDetails = async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

        if (result.length > 0) {
          console.log("Raw DB Response:", result);
          const jsonMockResp = JSON.parse(result[0].jsonMockResp);
          console.log("Fetched Questions:", jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    GetInterviewDetails();
  }, [params.interviewId]);

  // ✅ Process speech-to-text results
  useEffect(() => {
    console.log("Speech-to-Text Results:", results);
    setUserAnswer(results.map((r) => r.transcript).join(" "));
  }, [results]);

  // ✅ Save answer when recording stops
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      console.log("Stopping Recording. Saving Answer:", userAnswer);
      UpdateUserAnswerInDb();
    }
  }, [userAnswer]);

  // ✅ Start/Stop recording
  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer.length < 10) {
        toast("Error while saving your answer, please try again");
        return;
      }
      UpdateUserAnswerInDb();
    } else {
      startSpeechToText();
    }
  };

  // ✅ Save user answer to DB
  const UpdateUserAnswerInDb = async () => {
    if (!interviewData || !mockInterviewQuestion[activeQuestionIndex]) return;

    setLoading(true);
    const feedbackPrompt =
      `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, ` +
      `User answer: ${userAnswer}. Based on this, provide a rating and feedback.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = result.response.text();
      console.log("AI Response:", responseText);

      const cleanedJson = responseText.replace("```json", "").replace("```", "");
      let JsonFeedbackResp;
      try {
        JsonFeedbackResp = JSON.parse(cleanedJson);
      } catch (error) {
        console.error("Error parsing AI response:", error);
        return toast("AI feedback could not be processed.");
      }

      console.log("Saving Answer:", {
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
      });

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
      });

      if (resp) {
        toast("User answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error updating user answer:", error);
      toast("Error saving answer, please try again");
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
        />

        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
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

        {/* <Button
          className="border rounded-lg hover:bg-primary text-white mt-2 "
          onClick={() => console.log(userAnswer)}
        >
          Show User Answer
        </Button> */}
      </div>
    </div>
  );
}

export default StartInterview;
