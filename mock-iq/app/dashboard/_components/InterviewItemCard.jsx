"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedbackPush = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 mx-2 my-3">

      {/* Job Position */}
      <h2 className="font-bold text-secondary text-base sm:text-lg">
        Job Position : {interview?.jobPosition}
      </h2>

      {/* Experience */}
      <h2 className="text-sm text-gray-500 mt-1">
        {interview?.jobExperience} Years of Experience
      </h2>

      {/* Job Description (wrapped nicely) */}
      <h2 className="text-sm text-gray-500 mt-1 break-words">
        Job Description : {interview?.jobDesc}
      </h2>

      {/* Buttons → responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between mt-4 gap-3 sm:gap-5">

        {/* Feedback Button */}
        <Button
          size="sm"
          variant="outline"
          className="w-full sm:w-1/2 bg-primary text-white hover:border-black border-1"
          onClick={onFeedbackPush}
        >
          Feedback
        </Button>

        {/* Start Button */}
        <Button
          size="sm"
          className="w-full sm:w-1/2 bg-primary text-white hover:bg-gray-200 hover:border-black border-1 hover:text-black"
          onClick={onStart}
        >
          Start
        </Button>

      </div>
    </div>
  );
}

export default InterviewItemCard;
