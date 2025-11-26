"use client";

import React from "react";
import dynamic from "next/dynamic";

// Webcam must be dynamic
const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

function RecordAnswerSection({ userAnswer, currentFeedback }) {
  return (
    <div className="flex flex-col justify-center items-center border-purple-900 border-4 bg-gray-800 my-10 rounded-2xl p-5 w-full relative">
      
      <Webcam
        mirrored={true}
        videoConstraints={{ facingMode: "user" }}
        style={{
          height: 400,
          width: "100%",
          borderRadius: "20px",
        }}
      />

      {/* Feedback UI */}
      <div className="text-white text-center mt-3">
        <p className="text-lg font-semibold">{currentFeedback?.feedback}</p>
        <p className="text-yellow-400">Rating: {currentFeedback?.rating}</p>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
