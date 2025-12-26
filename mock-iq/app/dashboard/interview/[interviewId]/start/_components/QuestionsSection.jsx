"use client";

import { Lightbulb, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function QuestionsSection({
  mockInterviewQuestion = [],
  activeQuestionIndex,
  setActiveQuestionIndex,
}) {
  const [isMobile, setIsMobile] = useState(false);

  /* Detect screen size (UI feature) */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mockInterviewQuestion.length) {
    return <p className="text-center text-gray-500">No questions available.</p>;
  }

  /* Text to Speech */
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="p-4 md:p-5 border rounded-2xl border-primary my-6 w-full">

      {/* Question Number List */}
      <div className="my-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-x-auto px-1">
        {mockInterviewQuestion.map((_, index) => (
          <h2
            key={index}
            className={`px-3 py-2 border rounded-full text-xs sm:text-sm text-center cursor-pointer whitespace-nowrap
            ${
              activeQuestionIndex === index
                ? "text-white font-bold border-primary bg-primary"
                : "border-primary"
            }`}
            onClick={() => setActiveQuestionIndex(index)}
          >
            {isMobile ? `Q #${index + 1}` : `Question #${index + 1}`}
          </h2>
        ))}
      </div>

      {/* Active Question */}
      <h2 className="my-4 text-sm sm:text-md md:text-lg mx-1 leading-relaxed">
        {mockInterviewQuestion[activeQuestionIndex]?.question ||
          "No question available"}
      </h2>

      {/* Text-to-Speech */}
      <div className="flex items-center mb-3">
        <Volume2
          className="cursor-pointer hover:text-primary"
          onClick={() =>
            textToSpeech(
              mockInterviewQuestion[activeQuestionIndex]?.question
            )
          }
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
        <button
          className="w-full sm:w-auto p-2 px-4 border rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
          disabled={activeQuestionIndex === 0}
        >
          <ChevronLeft className="inline-block mr-1" /> Previous
        </button>

        {activeQuestionIndex === mockInterviewQuestion.length - 1 ? (
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button className="w-full bg-primary border-primary hover:bg-primary">
              End Interview
            </Button>
          </Link>
        ) : (
          <button
            className="w-full sm:w-auto p-2 px-4 border rounded-lg bg-primary text-white hover:bg-primary-dark"
            onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
          >
            Next <ChevronRight className="inline-block ml-1" />
          </button>
        )}
      </div>

      {/* Note */}
      <div className="border my-4 rounded-2xl p-3 mt-5 border-blue-400 bg-blue-200">
        <h2 className="flex gap-2 items-center text-md sm:text-lg text-blue-700">
          <Lightbulb /> <strong>Note:</strong>
        </h2>
        <h2 className="text-sm sm:text-md text-blue-700 my-2 leading-relaxed">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE || "No note available"}
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
