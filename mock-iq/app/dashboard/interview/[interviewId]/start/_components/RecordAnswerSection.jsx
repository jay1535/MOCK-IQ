"use client";
import React from "react";
import Webcam from "react-webcam";

function RecordAnswerSection() {
  return (
    <div className="flex flex-col justify-center items-center border-purple-900 border-4
      bg-gray-800 my-10 rounded-2xl p-5 w-full relative">
      
      <Webcam
        mirrored={true}
        style={{
          height: 400,
          width: "100%",
          zIndex: 10,
          borderRadius: "20px",
        }}
      />
      
      {/* Removed overlay of user answer and feedback */}
    </div>
  );
}

export default RecordAnswerSection;
