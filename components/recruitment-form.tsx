"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export default function RecruitmentForm() {
  const [form, setForm] = useState({
    name: "",
    year: "",
    fact: "",
    number: "",
    usn: "",
    email: "",
  });

  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [usnError, setUsnError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [showTips, setShowTips] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    // Force USN to uppercase and remove spaces
    if (e.target.name === "usn") {
      value = value.toUpperCase().replace(/\s+/g, "");
    }

    setForm({ ...form, [e.target.name]: value });
    // Clear field-specific errors while typing
    if (e.target.name === "usn") setUsnError("");
    if (e.target.name === "email") setEmailError("");
    if (e.target.name === "number") setNumberError("");
    if (status !== "loading") setStatus("idle");
  };

  const validateUSN = (usn: string) => {
    // USN format: 1DSXXCDXXX where X = digits
    const pattern = /^1DS\d{2}CD\d{3}$/;
    return pattern.test(usn);
  };

  const validateEmailDomain = (email: string) => {
    // basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return false;
    const domain = email.split("@")[1].toLowerCase();
    // Accept gmail.com, x.com, or any .edu domain
    if (domain === "gmail.com" || domain === "x.com" || domain.endsWith(".edu")) return true;
    return false;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Client-side validation before sending
    setErrorMsg("");
    setStatus("idle");

    if (!validateUSN(form.usn)) {
      setUsnError("USN must be in format 1DSXXCDXXX (all caps, X = digits)");
      setStatus("error");
      return;
    }

    if (!validateEmailDomain(form.email)) {
      setEmailError("Please provide a valid email (gmail.com, x.com or a .edu address)");
      setStatus("error");
      return;
    }

    // Post form to API
    (async () => {
      setStatus("loading");
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
          // Handle uniqueness conflict
          if (res.status === 409 && data?.field) {
            if (data.field === 'email') setEmailError('An application with this email already exists.');
            else if (data.field === 'usn') setUsnError('An application with this USN already exists.');
            else if (data.field === 'number') setNumberError('An application with this phone number already exists.');
            else setErrorMsg(data?.error || "Duplicate entry");
            setStatus('error');
          } else {
            setErrorMsg(data?.error || "Failed to submit. Please try again.");
            setStatus("error");
          }
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Network error. Please try again later.");
        setStatus("error");
      }
    })();
  };

  useEffect(() => {
    if (status === "success" || (status === "error" && !errorMsg)) {
      const timeout = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [status, errorMsg]);

  const buttonLabel = (() => {
    if (status === "loading") return "Submitting...";
    if (status === "success") return "Application sent";
    if (status === "error") return "Retry application";
    return "Submit application";
  })();

  return (
    <section id="apply" className="relative py-12 sm:py-20 text-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Prep Tips Popup */}
        {showTips && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowTips(false)}>
            <div className="relative max-w-lg w-full bg-gray-950/95 border border-[#3E47E0]/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_-12px_rgba(62,71,224,0.6)]" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowTips(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">Recruitment Process</h3>
                <p className="text-indigo-200/70 text-sm">Here's what to expect</p>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3E47E0]/20 flex items-center justify-center text-[#3E47E0] font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Basic Coding Test</h4>
                    <p className="text-indigo-200/70">Test your problem-solving and programming fundamentals. Focus on logic and clean code.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3E47E0]/20 flex items-center justify-center text-[#3E47E0] font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">General Interview</h4>
                    <p className="text-indigo-200/70">Discussion about your interests, projects, and why you want to join TechClan.</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-[#3E47E0]/10 border border-[#3E47E0]/30 rounded-xl">
                  <p className="text-indigo-200 text-sm">
                    <span className="font-semibold">📅 Dates:</span> Will be announced soon after applications close.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[#3E47E0]/20 bg-gray-950/80 p-6 sm:p-8 md:p-10 shadow-[0_0_60px_-12px_rgba(62,71,224,0.45)] backdrop-blur-xl md:max-w-3xl"
          data-aos="fade-up"
        >
          <div
            aria-hidden
            className="absolute -top-24 right-1/3 h-40 w-40 rounded-full bg-[#3E47E0]/20 blur-3xl sm:-top-32 sm:h-52 sm:w-52"
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#3E47E0]/0 via-[#3E47E0]/60 to-[#3E47E0]/0" aria-hidden />
          <div
            aria-hidden
            className="absolute -top-24 right-1/3 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl sm:-top-32 sm:h-52 sm:w-52"
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-400/50 to-indigo-500/0" aria-hidden />

          <div className="relative">
            <div className="mb-6 sm:mb-8 md:mb-10 text-center">
              <h2 className="bg-gradient-to-r from-indigo-200 via-white to-indigo-200 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl md:text-[2.75rem]">
                Join TechClan
              </h2>
              <p className="mt-3 text-sm sm:text-base text-indigo-100/70">
                Opportunity to collaborate with builders across TechClan.
              </p>
              
              {/* Prep Tips Button */}
              <button
                onClick={() => setShowTips(true)}
                className="mt-4 inline-flex items-center gap-2 text-sm text-[#3E47E0] hover:text-[#5E67F0] transition-colors underline underline-offset-4"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View recruitment process & tips
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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
                    aria-invalid={!!numberError}
                    aria-describedby={numberError ? 'number-error' : undefined}
                    className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${
                      numberError
                        ? 'border border-rose-400 bg-rose-950/5 text-rose-50 focus:border-rose-300 focus:ring-1 focus:ring-rose-300'
                        : 'border border-indigo-500/30 bg-gray-950/70 text-gray-100 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'
                    }`}
                    placeholder="Your phone number"
                  />
                  {numberError ? (
                    <p id="number-error" className="mt-1 text-xs text-amber-400">{numberError}</p>
                  ) : null}
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
                    aria-invalid={!!usnError}
                    aria-describedby={usnError ? 'usn-error' : undefined}
                    className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${
                      usnError
                        ? 'border border-rose-400 bg-rose-950/5 text-rose-50 focus:border-rose-300 focus:ring-1 focus:ring-rose-300'
                        : 'border border-indigo-500/30 bg-gray-950/70 text-gray-100 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'
                    }`}
                    placeholder="e.g. 1DS24CD000"
                  />
                  {usnError ? (
                    <p id="usn-error" className="mt-1 text-xs text-amber-400">
                      {usnError}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-indigo-200/70"></p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-indigo-100/80">
                  Email Address
                </label>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : 'email-help'}
                    className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition ${
                      emailError
                        ? 'border border-amber-400 bg-amber-950/5 text-amber-50 focus:border-amber-300 focus:ring-1 focus:ring-amber-300'
                        : 'border border-indigo-500/30 bg-gray-950/70 text-gray-100 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'
                    }`}
                    placeholder="Enter your email"
                  />
                  {emailError ? (
                    <p id="email-error" className="mt-1 text-xs text-amber-400">
                      {emailError}
                    </p>
                  ) : (
                    <p id="email-help" className="mt-1 text-xs text-indigo-200/70"></p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_10px_24px_-18px_rgba(99,102,241,0.9)] transition hover:from-indigo-500 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-950"
                  disabled={status === "loading"}
                  aria-live="polite"
                  aria-busy={status === "loading"}
                >
                  {buttonLabel}
                </button>
              </div>
              <div className="mt-3">
                {/* Success banner */}
                {status === "success" && (
                  <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-white shadow-md">
                    <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm">
                      <strong className="block">Application submitted</strong>
                      <span className="block text-indigo-100/90">Thanks — we received your application and will reach out soon.</span>
                    </div>
                  </div>
                )}

                {/* Global error banner */}
                {status === "error" && errorMsg && (
                  <div className="mt-2 flex items-start gap-3 rounded-md border border-amber-700 bg-amber-950/10 p-3 text-amber-200">
                    <svg className="h-5 w-5 flex-shrink-0 text-amber-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l5.58 9.92c.75 1.333-.213 2.981-1.742 2.981H4.42c-1.53 0-2.492-1.648-1.742-2.98l5.579-9.92zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm">{errorMsg}</div>
                  </div>
                )}

                {/* Field-level errors (they render under fields already) */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
