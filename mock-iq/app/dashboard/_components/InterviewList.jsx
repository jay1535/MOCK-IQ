"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq, and, desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { useUser } from "@clerk/nextjs";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]); // ✅ Removed extra useEffect

  const GetInterviewList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.warn("User email not available.");
      return;
    }

    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          and(
            eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress) // ✅ Corrected `where`
          )
        )
        .orderBy(desc(MockInterview.id));

      console.log("Fetched Interviews:", result);
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interview list:", error);
    }
  };

  return (
    <div>
      <h2 className="text-bold">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-3">
        {interviewList.map((interview, index) => (
          <InterviewItemCard interview={interview} key={index} />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;
