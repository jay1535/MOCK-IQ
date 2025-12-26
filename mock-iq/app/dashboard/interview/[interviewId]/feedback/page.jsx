"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getFeedbackByInterviewId } from "@/app/actions/getFeedback";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, RotateCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ---------------- CLEAN TEXT ---------------- */
const cleanText = (t = "") =>
  String(t)
    .replace(/\\n/g, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s.,?!]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

export default function Feedback() {
  const params = useParams();
  const interviewId = params?.interviewId;
  const router = useRouter();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!interviewId) return;
    setLoading(true);
    const res = await getFeedbackByInterviewId(interviewId);
    setList(res ?? []);
    setLoading(false);
  }, [interviewId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
            🎉 Interview Feedback
          </h2>
          <p className="text-gray-500 mt-1">
            Detailed review of your answers
          </p>
        </div>

        <Button onClick={fetchData} variant="outline" disabled={loading}>
          <RotateCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* CONTENT */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading feedback...</p>
        ) : list.length === 0 ? (
          <p className="text-center text-gray-500">
            No feedback available for this interview.
          </p>
        ) : (
          list.map((fb, i) => (
            <Collapsible
              key={i}
              className="rounded-xl border bg-white shadow-sm"
            >
              {/* QUESTION */}
              <CollapsibleTrigger className="flex justify-between items-center p-4 hover:bg-gray-50">
                <p className="font-medium text-sm sm:text-base text-gray-900 line-clamp-2">
                  {cleanText(fb.question)}
                </p>
                <ChevronsUpDown className="h-5 w-5 text-gray-500" />
              </CollapsibleTrigger>

              {/* DETAILS */}
              <CollapsibleContent>
                <div className="space-y-4 px-4 pb-4 text-sm">

                  {/* RATING */}
                  <div className="rounded-lg border bg-yellow-50 p-3 text-yellow-800">
                    <strong>Rating:</strong> {fb.rating ?? "0"} / 10
                  </div>

                  {/* USER ANSWER */}
                  <div className="rounded-lg border bg-red-50 p-3 text-red-900">
                    <strong>Your Answer</strong>
                    <pre className="mt-2 whitespace-pre-wrap text-xs sm:text-sm">
                      {cleanText(fb.userAns) || "No answer provided"}
                    </pre>
                  </div>

                  {/* CORRECT ANSWER */}
                  <div className="rounded-lg border bg-green-50 p-3 text-green-900">
                    <strong>Expected Answer</strong>
                    <pre className="mt-2 whitespace-pre-wrap text-xs sm:text-sm">
                      {cleanText(fb.correctAns) || "No reference answer"}
                    </pre>
                  </div>

                  {/* AI FEEDBACK */}
                  <div className="rounded-lg border bg-blue-50 p-3 text-blue-900">
                    <strong>AI Feedback</strong>
                    <p className="mt-2 text-xs sm:text-sm">
                      {cleanText(fb.feedback) || "No feedback generated"}
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-8 flex justify-center sm:justify-start">
        <Button onClick={() => router.replace("/dashboard")}>
          <Home className="mr-2 h-4 w-4" />
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
