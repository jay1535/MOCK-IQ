"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on the given Job position, Job Description, and Years of Experience, generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions in JSON format with questions and answers.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const mockJsonResponse = (await result.response.text())
        .replace(/```json|```/g, "")
        .trim();
      console.log(JSON.parse(mockJsonResponse));
      setJsonResponse(mockJsonResponse);

      if (mockJsonResponse) {
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: mockJsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        }).returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", resp);

        if (resp) {
          setOpenDialog(false);
          router.push(`/dashboard/interview/${resp[0]?.mockId}`);
        }
      } else {
        console.log("No Response");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 rounded-lg border-2 bg-slate-200 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell Us More About Your Job Interview
            </DialogTitle>
          </DialogHeader>

          {/* ✅ Moved Form Outside DialogDescription */}
          <form onSubmit={onSubmit} className="mt-4">
            <div>
              <h2 className="text-lg">
                Add details about your job position, description, and experience.
              </h2>

              <div className="text-xl mt-5 my-2">
                <label>Job Role / Position</label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  className="mt-2 my-3"
                  required
                  value={jobPosition}
                  onChange={(event) => setJobPosition(event.target.value)}
                />
              </div>

              <div className="text-xl mt-5 my-3">
                <label>Job Description / Tech Stack</label>
                <Textarea
                  placeholder="Ex. React, Angular, Node.js, MySQL..."
                  className="mt-2 my-3"
                  required
                  value={jobDesc}
                  onChange={(event) => setJobDesc(event.target.value)}
                />
              </div>

              <div className="text-xl mt-5 my-2">
                <label>Years of Experience</label>
                <Input
                  placeholder="Ex. 2"
                  type="number"
                  className="mt-2 my-3"
                  required
                  value={jobExperience}
                  onChange={(event) => setJobExperience(event.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-5 justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Generating Questions...
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
