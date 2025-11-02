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
  const [usnError, setUsnError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
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
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_-20px_rgba(99,102,241,0.95)] transition hover:from-indigo-500 hover:to-indigo-400"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Submit Application"}
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
