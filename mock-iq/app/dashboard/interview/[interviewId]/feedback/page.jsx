"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ----------------------------------------------
   CLEAN TEXT FUNCTION — removes all weird chars
------------------------------------------------ */
/* ----------------------------------------------
   CLEAN TEXT FUNCTION — keeps newlines, removes junk
------------------------------------------------ */
function cleanText(text = "") {
  if (!text) return "";

  return text
    .replace(/\\n/g, "\n")               // convert literal \n to real newline
    .replace(/\r/g, "")                  // remove carriage returns
    .replace(/[*>#_`]/g, "")             // remove markdown symbols
    .replace(/\s+\n/g, "\n")             // remove spaces before newlines
    .replace(/\n{3,}/g, "\n\n")          // limit extra empty lines
    .trim();
}


function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!params.interviewId) return;

    const fetchData = async () => {
      try {
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, params.interviewId))
          .orderBy(UserAnswer.id);

        setFeedbackList(result);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchData();
  }, [params.interviewId]);

  const getAverageRating = (list) => {
    const ratings = list.map((fb) => Number(fb.rating)).filter((r) => !isNaN(r));
    if (ratings.length === 0) return "N/A";

    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return `${avg.toFixed(1)}/10`;
  };

  return (
    <div className="p-4 sm:p-6 md:p-10">
      
      {/* Heading Section */}
      <h2 className="text-2xl md:text-3xl font-bold text-green-600 text-center md:text-left">
        Congratulations 🎉!!
      </h2>
      <h2 className="font-bold text-xl md:text-2xl mt-2 text-center md:text-left">
        Here is your interview feedback...
      </h2>

      {feedbackList.length > 0 && (
        <h2 className="text-blue-800 text-md md:text-lg my-4 text-center md:text-left">
          Your overall interview rating:
          <strong className="mx-2">{getAverageRating(feedbackList)}</strong>
        </h2>
      )}

      {/* Feedback Cards */}
      <div className="mt-6 space-y-5">
        {feedbackList.length > 0 ? (
          feedbackList.map((feedback, index) => (
            <Collapsible
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-sm"
            >
              <CollapsibleTrigger className="p-3 bg-gray-100 border-b border-gray-300 flex justify-between items-center w-full text-left">
                <span className="text-black font-medium text-sm sm:text-md">
                  {cleanText(feedback?.question) || "Question not found"}
                </span>
                <ChevronsUpDown className="h-5 w-5 text-gray-600" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="flex flex-col gap-4 p-3 text-sm sm:text-md">
                  
                  <div className="text-yellow-700 border p-2 rounded-lg text-sm">
                    <strong>Rating:</strong> {feedback.rating || "0"}
                  </div>

                  <div className="text-red-900 border p-2 rounded-lg bg-red-50">
                    <strong>Your Answer:</strong>
                    <pre className="whitespace-pre-wrap mt-1 text-xs sm:text-sm">
                      {cleanText(feedback.userAns) || "No Answer Provided"}
                    </pre>
                  </div>

                  <div className="text-green-900 border p-2 rounded-lg bg-green-50">
                    <strong>Correct Answer:</strong>
                    <pre className="whitespace-pre-wrap mt-1 text-xs sm:text-sm">
                      {cleanText(feedback.correctAns) || "No Answer Available"}
                    </pre>
                  </div>

                  <div className="text-blue-900 border p-2 rounded-lg bg-blue-50">
                    <strong>Feedback:</strong> {cleanText(feedback.feedback) || "No feedback"}
                  </div>

                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <p className="text-gray-500 mt-5 text-center">
            No feedback available for this interview.
          </p>
        )}
      </div>

      <div className="flex justify-center md:justify-start">
        <Button
          onClick={() => router.replace("/dashboard")}
          className="mt-6 bg-primary text-white px-6 py-2"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default Feedback;
