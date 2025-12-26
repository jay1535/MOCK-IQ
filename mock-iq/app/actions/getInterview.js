"use server";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function getInterviewByMockId(mockId) {
  const res = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, mockId));

  return res?.[0] ?? null;
}
