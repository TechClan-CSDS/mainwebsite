"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RecruitmentForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Application submitted successfully!");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-100 to-slate-100 p-6">
      <Card className="max-w-2xl w-full bg-white/90 backdrop-blur-md shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-3xl font-semibold text-center mb-2">
            Club Recruitment 2025
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Join our community — fill out the details below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input required />
            </div>
            <div>
              <Label>College Email</Label>
              <Input type="email" required />
            </div>
            <div>
              <Label>Department / Year</Label>
              <Input placeholder="e.g. CSE, 2nd Year" required />
            </div>
            <div>
              <Label>Domain Applying For</Label>
              <Input placeholder="Technical / PR / Design" required />
            </div>
            <div>
              <Label>Portfolio / GitHub Link</Label>
              <Input type="url" />
            </div>
            <div>
              <Label>Why do you want to join?</Label>
              <Textarea required />
            </div>
            <div>
              <Label>Upload Resume (PDF)</Label>
              <Input type="file" accept="application/pdf" required />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
