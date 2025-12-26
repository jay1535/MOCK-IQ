"use client";

import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress))
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
  };

  return (
    <section className="w-full mt-8">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 px-2">
        Previous Mock Interviews
      </h2>

      {/* Responsive Grid */}
      <div
        className="
          mx-auto
          max-w-7xl
          grid
          grid-cols-1
          gap-4
          sm:gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          px-2
        "
      >
        {interviewList.length > 0 ? (
          interviewList.map((interview) => (
            <InterviewItemCard
              key={interview.id}
              interview={interview}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center mt-10">
            No interviews found.
          </p>
        )}
      </div>
    </section>
  );
}

export default InterviewList;
