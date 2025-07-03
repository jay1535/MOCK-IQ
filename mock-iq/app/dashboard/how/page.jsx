"use client";
import React from "react";
import Link from "next/link";

const steps = [
  {
    title: "Sign In",
    description:
      "Log in to your account to save your progress and view personalized feedback.",
    icon: "📝",
  },
  {
    title: "Select a Topic",
    description:
      "Choose the domain or type of interview you want to practice — technical, HR, or more.",
    icon: "📋",
  },
  {
    title: "Enable Webcam",
    description:
      "Allow webcam access to simulate a real interview with presence & body language.",
    icon: "🎥",
  },
  {
    title: "Begin Interview",
    description:
      "Answer five targeted questions based on your chosen topic in a timed environment.",
    icon: "🗣️",
  },
  {
    title: "Get Feedback",
    description:
      "Receive actionable feedback on your answers, confidence, and communication.",
    icon: "✅",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen  p-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
        How It Works
      </h1>

      <p className="text-center max-w-2xl text-lg mb-8">
        Experience realistic, AI-powered mock interviews with step-by-step guidance
        designed to help you improve your interview skills in a professional setting.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-3">{step.icon}</div>
            <h2 className="text-xl font-semibold text-blue-600">{step.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard"
        className="mt-10 inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-700 transition"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default HowItWorks;
