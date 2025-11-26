"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronsUpDown, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ----------------------------------------------
   CLEAN TEXT FUNCTION — keeps newlines, removes junk
------------------------------------------------ */
function cleanText(text = "") {
  if (!text) return "";

  // convert to string and normalize
  const s = String(text);

  return s
    .replace(/\\n/g, "\n")               // convert literal \n to real newline
    .replace(/\r/g, "")                  // remove carriage returns
    .replace(/<[^>]*>/g, "")             // strip any HTML tags
    .replace(/[*>#_`]/g, "")             // remove markdown symbols
    .replace(/[ \t]+\n/g, "\n")          // remove trailing spaces before newline
    .replace(/\n{3,}/g, "\n\n")          // limit extra empty lines
    .replace(/\s{3,}/g, " ")             // collapse long whitespace
    .trim();
}

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const fetchData = useCallback(async () => {
    if (!params?.interviewId) return;
    setLoading(true);

    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id); // keep your ordering; adjust if your ORM expects a direction

      setFeedbackList(result ?? []);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedbackList([]);
    } finally {
      setLoading(false);
    }
  }, [params?.interviewId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getAverageRating = (list) => {
    const ratings = list
      .map((fb) => {
        // support both number and string ratings
        const n = Number(fb?.rating);
        return Number.isFinite(n) ? n : NaN;
      })
      .filter((r) => !Number.isNaN(r));

    if (ratings.length === 0) return "N/A";

    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return `${avg.toFixed(1)}/10`;
  };

  // optional: format a timestamp if you stored one (fallback to undefined)
  const formatDate = (isoOrTs) => {
    if (!isoOrTs) return null;
    try {
      const d = new Date(isoOrTs);
      return d.toLocaleString(); // user's locale
    } catch {
      return String(isoOrTs);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-green-600">
            Congratulations 🎉!!
          </h2>
          <h3 className="font-bold text-xl md:text-2xl mt-1">
            Here is your interview feedback...
          </h3>

          {feedbackList.length > 0 && (
            <p className="text-blue-800 text-md md:text-lg my-3">
              Your overall interview rating:
              <strong className="mx-2">{getAverageRating(feedbackList)}</strong>
              <span className="text-sm text-gray-500">({feedbackList.length} answers)</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-label="Refresh feedback"
            onClick={fetchData}
            className="bg-white border"
            disabled={loading}
          >
            <RotateCw className="mr-2" /> Refresh
          </Button>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {loading ? (
          <p className="text-gray-600 text-center">Loading feedback...</p>
        ) : feedbackList.length > 0 ? (
          feedbackList.map((feedback, index) => {
            const key = feedback.id ?? index;
            return (
              <Collapsible
                key={key}
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
                      <strong>Rating:</strong> {String(feedback?.rating ?? "0")}
                      {feedback?.createdAt && (
                        <span className="ml-3 text-xs text-gray-500">• {formatDate(feedback.createdAt)}</span>
                      )}
                    </div>

                    <div className="text-red-900 border p-2 rounded-lg bg-red-50">
                      <strong>Your Answer:</strong>
                      <pre className="whitespace-pre-wrap mt-1 text-xs sm:text-sm">
                        {cleanText(feedback?.userAns) || "No Answer Provided"}
                      </pre>
                    </div>

                    <div className="text-green-900 border p-2 rounded-lg bg-green-50">
                      <strong>Correct Answer:</strong>
                      <pre className="whitespace-pre-wrap mt-1 text-xs sm:text-sm">
                        {cleanText(feedback?.correctAns) || "No Answer Available"}
                      </pre>
                    </div>

                    <div className="text-blue-900 border p-2 rounded-lg bg-blue-50">
                      <strong>Feedback:</strong>
                      <div className="mt-1 text-xs sm:text-sm">
                        {cleanText(feedback?.feedback) || "No feedback"}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })
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
