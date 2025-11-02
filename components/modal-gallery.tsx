"use client";

import { useEffect, useState } from "react";
import type { StaticImageData } from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";

type Img = StaticImageData | string;

interface ModalGalleryProps {
  thumb: Img;
  thumbWidth: number;
  thumbHeight: number;
  thumbAlt: string;
  images: Img[];
  imageWidth: number;
  imageHeight: number;
  onHoverChange?: (isPaused: boolean) => void;
}

export default function ModalGallery({
  thumb,
  thumbWidth,
  thumbHeight,
  thumbAlt,
  images,
  imageWidth,
  imageHeight,
  onHoverChange,
}: ModalGalleryProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const total = images.length;

  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, total]);

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={() => onHoverChange?.(true)}
      onBlur={() => onHoverChange?.(false)}
    >
      {/* Thumbnail button */}
      <button
        onClick={() => {
          setIdx(0);
          setOpen(true);
        }}
        aria-label="Open gallery"
        className="group relative inline-block rounded-2xl focus:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200"
        data-aos="fade-up"
        data-aos-delay={200}
      >
        <figure className="relative inline-block w-full max-w-[420px] overflow-hidden rounded-2xl shadow-lg sm:max-w-[480px] lg:max-w-[540px]">
          <Image
            src={thumb}
            width={thumbWidth}
            height={thumbHeight}
            alt={thumbAlt}
            priority
            className="block h-auto w-full rounded-2xl object-cover transition-opacity duration-700"
          />
          {/* 🔵 Bluish tint overlay - lighter for better visibility */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-indigo-500/20 to-indigo-900/40 mix-blend-overlay pointer-events-none" />
        </figure>
      </button>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 z-50 bg-black/70 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
          <DialogPanel
            transition
            className="relative w-auto max-w-[92vw] overflow-hidden rounded-2xl bg-black shadow-2xl duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div className="relative flex items-center justify-center bg-black">
              <Image
                src={images[idx]}
                width={imageWidth}
                height={imageHeight}
                alt={`Slide ${idx + 1}`}
                className="h-auto max-h-[90vh] w-auto object-contain rounded-2xl"
                priority
              />
              {/* 🔵 Bluish tint overlay inside modal */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-900/60 via-indigo-500/25 to-indigo-900/60 mix-blend-overlay pointer-events-none" />
              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/20"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/20"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setIdx(i)}
                        className={`h-2.5 w-2.5 rounded-full ${
                          i === idx ? "bg-indigo-400" : "bg-white/30"
                        } hover:bg-white/60`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
