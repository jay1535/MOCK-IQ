"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

function InterviewItemCard({ interview }) {
  const router = useRouter();
  const onStart=()=>{
    router.push(`/dashboard/interview/${interview?.mockId}`);
  }
  const onFeedbackPush=()=>{
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  }

  return (
    <div className="border shadow-sm rounded-lg p-3 mx-2 my-2">
      <h2 className="font-bold text-secondary"> Job Position : {interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-500">
        {interview?.jobExperience} Years of Experience
      </h2>
        <h2 className="text-sm text-gray-500"> Job Description : {interview?.jobDesc}</h2>

      <div className="flex justify-between mt-2 gap-5">
        {/* ✅ Navigate to Feedback Page */}
        <Button
          size="sm"
          variant="outline"
          className="w-30 bg-primary text-white hover:border-black border-1 "
          onClick={onFeedbackPush}
        >
          Feedback
        </Button>

        {/* ✅ Navigate to Start Interview Page */}
        <Button
          size="sm"
          className="w-30 bg-primary text-white hover:bg-gray-200 hover:border-black border-1  hover:text-black"
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
