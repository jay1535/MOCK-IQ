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

        console.log("Fetched Feedback Data:", result);
        setFeedbackList(result);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchData();
  }, [params.interviewId]);

  const getAverageRating = (list) => {
    const ratings = list
      .map((fb) => Number(fb.rating))
      .filter((r) => !isNaN(r));

    if (ratings.length === 0) return "N/A";

    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return `${avg.toFixed(1)}/10`;
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-600">
        Congratulations 🎉!!
      </h2>
      <h2 className="font-bold text-2xl">
        Here is your interview feedback...
      </h2>

      {feedbackList.length > 0 && (
        <h2 className="text-blue-800 text-lg my-3">
          Your overall interview rating:
          <strong className="mx-2">{getAverageRating(feedbackList)}</strong>
        </h2>
      )}

      {feedbackList.length > 0 ? (
        feedbackList.map((feedback, index) => (
          <Collapsible
            key={index}
            className="my-3 border border-gray-300 p-3 rounded-lg mt-7"
          >
            <CollapsibleTrigger className="p-3 bg-gray-100 border border-gray-400 flex rounded-lg justify-between items-center w-full">
              <span className="text-black font-medium">
                {feedback?.question || "Question not found"}
              </span>
              <ChevronsUpDown className="h-5 w-5 text-gray-600" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-4 p-3">
                <div className="text-md text-yellow-700 border p-2 rounded-lg">
                  <strong>Rating:</strong> {feedback.rating || "0"}
                </div>

                <div className="text-md text-red-900 p-3 border rounded-lg bg-red-50">
                  <strong>Your Answer:</strong>
                  <pre className="whitespace-pre-wrap mt-1 text-sm text-red-800">
                    {feedback.userAns || "No Answer Provided"}
                  </pre>
                </div>

                <div className="text-md text-green-900 p-3 border rounded-lg bg-green-50">
                  <strong>Correct Answer:</strong>
                  <pre className="whitespace-pre-wrap mt-1 text-sm text-green-800">
                    {feedback.correctAns || "No Answer Available"}
                  </pre>
                </div>

                <div className="text-md text-blue-900 p-2 border rounded-lg bg-blue-50">
                  <strong>Feedback:</strong> {feedback.feedback || "No feedback"}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p className="text-gray-500 mt-5">
          No feedback available for this interview.
        </p>
      )}

      <Button
        onClick={() => router.replace("/dashboard")}
        className="mt-5 bg-primary text-white"
      >
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
