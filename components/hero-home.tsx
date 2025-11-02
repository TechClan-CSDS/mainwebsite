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
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-6 font-nacelle text-5xl font-semibold text-transparent md:text-9xl lg:text-[10rem] drop-shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              TechClan
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-10 text-lg leading-relaxed text-indigo-200/75 md:text-xl" data-aos="fade-up" data-aos-delay={200}>
                A student club from the Data Science department, open to everyone passionate about tech. We build projects, compete in hackathons, and shape the future of innovation. Join us if you're ready to lead, create, and take this forward.
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                                <div data-aos="fade-up" data-aos-delay={350}>
                  <a
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#3E47E0]/40 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-indigo-200 backdrop-blur-sm transition-all duration-300 hover:border-[#3E47E0] hover:bg-[#3E47E0]/10 hover:text-white w-full sm:w-auto"
                    href="/contact"
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
