"use client";

import { useEffect, useRef, useState } from "react";

export function useSpeechRecognition() {
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }

      setTranscript(finalTranscript.trim());
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e);
    };

    recognitionRef.current = recognition;
  }, []);

  const start = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.start();
    setTranscript("");
    setIsRecording(true);
  };

  const stop = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsRecording(false);
  };

  return { transcript, isRecording, start, stop };
}
