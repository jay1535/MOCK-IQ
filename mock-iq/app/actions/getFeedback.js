"use server";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq, asc } from "drizzle-orm";

export async function getFeedbackByInterviewId(interviewId) {
  const result = await db
    .select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef, interviewId))
    .orderBy(asc(UserAnswer.id));

  return result;
}
