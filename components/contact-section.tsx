"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSubmitted(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 text-gray-100 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-indigo-300/70">
            Contact
          </p>
          <h1 className="bg-gradient-to-r from-indigo-300 via-indigo-200 to-indigo-400 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            Let&rsquo;s build something together
          </h1>
          <p className="mt-4 text-sm text-indigo-100/70 sm:text-base">
            We love hearing from collaborators, potential partners, and future
            clan members. Drop a note and we&rsquo;ll reply within a day.
          </p>
        </div>

        <div
          className="relative mt-12 grid gap-8 md:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)]"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gray-950/70 p-8 shadow-[0_0_45px_-18px_rgba(99,102,241,0.65)] backdrop-blur sm:p-10">
            <div
              aria-hidden
              className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-indigo-500/15 blur-3xl"
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-400/50 to-indigo-500/0" aria-hidden />

            <div className="relative space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Get in touch</h2>
                <p className="mt-3 text-sm text-indigo-100/70 leading-relaxed">
                  Drop us a message and we'll get back to you within a day.
                </p>
              </div>
              <dl className="space-y-5 text-sm text-indigo-100/80">
                <div>
                  <dt className="font-semibold text-white">Email</dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:kushu123456789@gmail.com"
                      className="inline-flex items-center gap-1 text-indigo-300 transition hover:text-white"
                    >
                      kushu123456789@gmail.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gray-950/70 p-8 shadow-[0_0_45px_-18px_rgba(99,102,241,0.65)] backdrop-blur sm:p-10"
          >
            <div
              aria-hidden
              className="absolute -right-20 top-12 h-40 w-40 rounded-full bg-indigo-500/15 blur-3xl"
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-400/50 to-indigo-500/0" aria-hidden />

            <div className="relative grid gap-5 sm:gap-6">
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-indigo-100/80">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-500/30 bg-gray-950/70 px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-indigo-100/80">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-500/30 bg-gray-950/70 px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-indigo-100/80">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-indigo-500/30 bg-gray-950/70 px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-indigo-100/80">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="h-40 w-full resize-none rounded-xl border border-indigo-500/30 bg-gray-950/70 px-3 py-2.5 text-sm text-gray-100 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  placeholder="Share a bit more about how we can help"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_-20px_rgba(99,102,241,0.95)] transition hover:from-indigo-500 hover:to-indigo-400"
                >
                  Send message
                </button>
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-xs text-indigo-200/80 transition ${submitted ? "opacity-100" : "opacity-0"}`}
                >
                  Thanks for reaching out! We&rsquo;ll get back to you soon.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
