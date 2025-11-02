"use client";

import { useEffect, useState } from "react";
import ModalGallery from "@/components/modal-gallery";

const slides = ["/images/pic1.jpg", "/images/pic2.jpg", "/images/pic3.jpg"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Honor prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (isPaused) return;

    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <section className="min-h-screen flex items-center">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-16">
          <div className="pb-8 text-center md:pb-12">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-9xl"
              data-aos="fade-up"
            >
              TechClan
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 text-xl text-indigo-200/65" data-aos="fade-up" data-aos-delay={200}>
                Learn. Build. Collaborate. A modern community for Data Science enthusiasts—projects, workshops, and real impact.
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <div data-aos="fade-up" data-aos-delay={400}>
                  <a
                    className="btn group mb-4 w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-20px_rgba(99,102,241,0.95)] transition hover:from-indigo-500 hover:to-indigo-400 sm:mb-0 sm:w-auto"
                    href="/apply"
                  >
                    <span className="relative inline-flex items-center">
                      Apply Now
                      <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">-&gt;</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ModalGallery
            thumb={slides[index]}
            thumbWidth={1080}
            thumbHeight={720}
            thumbAlt="TechClan highlight"
            images={slides}
            imageWidth={1920}
            imageHeight={1280}
            onHoverChange={setIsPaused}
          />
        </div>
      </div>
    </section>
  );
}
