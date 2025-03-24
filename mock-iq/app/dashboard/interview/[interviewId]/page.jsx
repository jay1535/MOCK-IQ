"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

function Interview() {
  const params = useParams(); 
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails(params.interviewId);
    }
  }, [params.interviewId]); 
  const GetInterviewDetails = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      setInterviewData(result[0] || {}); 
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              className="border-3 border-yellow-600 p-10  mt-10 rounded-lg shadow-lg"
              style={{
                height: 400,
                width: 400,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-80 w-full my-7 p-20 bg-secondary border rounded-lg border-yellow-500" />
              <Button
                onClick={() => setWebCamEnabled(true)}
                className="h-10 w-full my-10 p-2 bg-primary text-white rounded-lg border"
              >
                Enable WebCam And Microphone
              </Button>
            </>
          )}
        </div>

        <div className="flex flex-col my-5 gap-5 ml-3">
          {interviewData && (
            <div className="flex flex-col gap-5 my-3 p-5 border rounded-lg border-yellow-500">
              <h2 className="text-lg">
                <strong>Job Role/ Job Position: </strong>
                {interviewData.jobPosition || "N/A"}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description: </strong>
                {interviewData.jobDesc || "N/A"}
              </h2>
              <h2 className="text-lg">
                <strong>Years Of Experience: </strong>
                {interviewData.jobExperience || "N/A"}
              </h2>
            </div>
          )}

          <div className="p-5 border rounded-lg border-yellow-600 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-700">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-700">
              {process.env.NEXT_PUBLIC_INFORMATION || "No additional info"}
            </h2>
          </div>

          <div className="flex justify-end items-end ">
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
              <Button className="bg-primary text-white ">Start Interview</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
