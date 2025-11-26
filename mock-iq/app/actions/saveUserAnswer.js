"use server";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";

export async function saveUserAnswerAction(payload) {
  try {
    await db.insert(UserAnswer).values({
      mockIdRef: payload.mockIdRef,
      question: payload.question,
      correctAns: payload.correctAns,
      userAns: payload.userAns,
      feedback: payload.feedback,
      rating: payload.rating,
    });

    return { success: true };
  } catch (error) {
    console.error("DB Insert Error:", error);
    return { success: false, error: error.message };
  }
}
