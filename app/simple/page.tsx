import React, { Suspense } from "react";
import SimpleView from "@/components/SimpleView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hazeeq Najmuddin | Recruiter View",
  description:
    "Recruiter-friendly single page portfolio of Hazeeq Najmuddin — Software Engineer and Quality Assurance Specialist. Experienced full-stack developer in Laravel, React, Next.js, and automated QA testing.",
};

export default function SimplePage() {
  return (
    <Suspense fallback={<div className="h-screen bg-black text-white flex items-center justify-center font-sans select-none">LOADING RECRUITER VIEW...</div>}>
      <SimpleView />
    </Suspense>
  );
}
