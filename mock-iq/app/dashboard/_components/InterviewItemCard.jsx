"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  return (
    <div
      className="
        w-full
        rounded-xl
        border
        bg-white
        p-5
        shadow-sm
        transition-all
        hover:shadow-md
        hover:-translate-y-1
        flex
        flex-col
        justify-between
      "
    >
      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
          {interview?.jobPosition}
        </h3>

        <p className="text-sm text-gray-500">
          {interview?.jobExperience} years experience
        </p>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          <span className="font-medium text-gray-700">
            Description:
          </span>{" "}
          {interview?.jobDesc}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          className="w-full sm:w-1/2"
          onClick={() =>
            router.push(
              `/dashboard/interview/${interview?.mockId}/feedback`
            )
          }
        >
          Feedback
        </Button>

        <Button
          className="w-full sm:w-1/2"
          onClick={() =>
            router.push(`/dashboard/interview/${interview?.mockId}`)
          }
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
