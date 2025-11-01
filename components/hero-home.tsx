"use client";

import ModalGallery from "@/components/modal-gallery";

export default function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-20">
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
                    className="btn group mb-4 w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
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
            thumb="/images/IMG_1613.JPG"
            thumbWidth={1080}
            thumbHeight={720}
            thumbAlt="TechClan highlight"
            images={["/images/IMG_1613.JPG", "/images/IMG_1613.JPG"]}
            imageWidth={1920}
            imageHeight={1280}
          />
        </div>
      </div>
    </section>
  );
}
