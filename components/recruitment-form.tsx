"use client";

import { useState } from "react";

export default function RecruitmentForm() {
  const [form, setForm] = useState({
    name: "",
    year: "",
    fact: "",
    number: "",
    usn: "",
    email: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Post form to API
    (async () => {
      setStatus("loading");
      setErrorMsg("");
      try {
        const res = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          setStatus("success");
          setForm({ name: "", year: "", fact: "", number: "", usn: "", email: "" });
        } else {
          const data = await res.json().catch(() => ({}));
          setErrorMsg(data?.error || "Failed to submit. Please try again.");
          setStatus("error");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Network error. Please try again later.");
        setStatus("error");
      }
    })();
  };

  return (
    <section id="apply" className="relative py-20 text-gray-100 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-indigo-500/20 bg-gray-950/70 p-8 shadow-[0_0_45px_-18px_rgba(99,102,241,0.65)] backdrop-blur md:max-w-4xl md:p-12"
          data-aos="fade-up"
        >
          <div
            aria-hidden
            className="absolute -top-24 right-1/3 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl sm:-top-32 sm:h-52 sm:w-52"
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-400/50 to-indigo-500/0" aria-hidden />

          <div className="relative">
            <div className="mb-10 text-center md:mb-12">
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-indigo-300/70">Applications Open</p>
              <h2 className="bg-gradient-to-r from-indigo-300 via-indigo-200 to-indigo-400 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                Join TechClan
              </h2>
              <p className="mt-4 text-sm text-indigo-100/70 sm:text-base">
                Be part of a community that ships, shares, and mentors every single week. Tell us who you are and what excites you—we will take it from there.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 sm:gap-6">
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-indigo-100/80">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-500/30 bg-gray-950/70 px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="year" className="mb-1 block text-sm font-medium text-indigo-100/80">
                    Year of Study
                  </label>
                  <select
                    name="year"
                    id="year"
                    required
                    value={form.year}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-500/30 bg-gray-950/70 px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  >
                    <option value="">Select your year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="fact" className="mb-1 block text-sm font-medium text-indigo-100/80">
                  An interesting fact about yourself
                </label>
                <textarea
                  name="fact"
                  id="fact"
                  rows={3}
                  value={form.fact}
                  onChange={handleChange}
                  required
                  className="h-28 w-full resize-none rounded-xl border border-indigo-500/30 bg-gray-950/70 px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  placeholder="Something fun or unique about you"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label htmlFor="number" className="mb-1 block text-sm font-medium text-indigo-100/80">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="number"
                    id="number"
                    required
                    value={form.number}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-500/30 bg-gray-950/70 px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="usn" className="mb-1 block text-sm font-medium text-indigo-100/80">
                    USN Number
                  </label>
                  <input
                    type="text"
                    name="usn"
                    id="usn"
                    required
                    value={form.usn}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-500/30 bg-gray-950/70 px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="e.g. 1DS24CD000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-indigo-100/80">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-indigo-500/30 bg-gray-950/70 px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  placeholder="Enter your email"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_-20px_rgba(99,102,241,0.95)] transition hover:from-indigo-500 hover:to-indigo-400"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Submit Application"}
                </button>
              </div>
              <div className="mt-2">
                {status === "success" && (
                  <p className="text-sm text-green-400">Thank you — your application has been submitted.</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-rose-400">{errorMsg || "Submission failed."}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
