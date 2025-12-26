"use client";

import React from "react";
import dynamic from "next/dynamic";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

export default function RecordAnswerSection({ userAnswer, currentFeedback }) {
  return (
    <div className="flex flex-col items-center border-4 border-purple-900 bg-gray-800 rounded-2xl p-5">
      <Webcam
        mirrored
        audio={false}  
        videoConstraints={{ facingMode: "user" }}
        className="rounded-xl w-full h-[400px]"
      />

      <p className="text-white mt-4 text-sm">
        <b>Your Answer:</b> {userAnswer}
      </p>

      {currentFeedback && (
        <div className="mt-3 text-center">
          <p className="text-white">{currentFeedback.feedback}</p>
          <p className="text-yellow-400">
            Rating: {currentFeedback.rating}/10
          </p>
        </div>
      )}
    </div>
  );
}
