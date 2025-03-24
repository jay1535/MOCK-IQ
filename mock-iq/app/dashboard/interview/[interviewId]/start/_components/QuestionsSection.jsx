import { Lightbulb, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link'; // ✅ Import Link for navigation
import { Button } from '@/components/ui/button'; // ✅ Ensure you import your Button component

function QuestionsSection({ mockInterviewQuestion = [], interviewData }) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  // Handle case where mockInterviewQuestion is empty
  if (!mockInterviewQuestion.length) {
    return <p className="text-center text-gray-500">No questions available.</p>;
  }

  return (
    <div className="p-5 border rounded-2xl border-primary my-10">
      {/* Question Number List */}
      <div className="my-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((_, index) => (
          <h2
            key={index}
            className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ml-2 mr-2 
              ${activeQuestionIndex === index 
                ? 'text-white font-bold border-primary bg-primary' 
                : 'border-primary'
              }`}
            onClick={() => setActiveQuestionIndex(index)} 
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {/* Active Question */}
      <h2 className="my-5 text-md md:text-lg mx-2">
        {mockInterviewQuestion[activeQuestionIndex]?.question || 'No question available'}
      </h2>

      {/* Text-to-Speech Button */}
      <Volume2 
        className="ml-2 mr-2 cursor-pointer hover:text-primary" 
        onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
      />

      {/* Navigation Buttons & End Interview */}
      <div className="flex justify-between items-center mt-5">
        {/* Previous Button */}
        <button 
          className="p-2 px-4 border rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
          disabled={activeQuestionIndex === 0} 
        >
          <ChevronLeft className="inline-block mr-1" /> Previous
        </button>

        {/* Next Button or End Interview */}
        {activeQuestionIndex === mockInterviewQuestion.length - 1 ? (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button className="border hover:bg-primary bg-primary border-primary">
              End Interview
            </Button>
          </Link>
        ) : (
          <button 
            className="p-2 px-4 border rounded-lg bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
            onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
          >
            Next <ChevronRight className="inline-block ml-1" />
          </button>
        )}
      </div>

      {/* Note Section */}
      <div className="border my-3 rounded-2xl p-2 mx-2 mt-5 border-blue-400 bg-blue-200">
        <h2 className="flex gap-2 items-center text-lg text-blue-700">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-md text-blue-700 my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE || 'No note available'}
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
