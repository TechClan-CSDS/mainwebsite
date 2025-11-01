"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Apply", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    const base =
      "group relative inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 before:absolute before:inset-0 before:-z-10 before:rounded-full before:transition before:duration-300 before:ease-out after:pointer-events-none after:absolute after:inset-0 after:-z-20 after:rounded-full after:blur-2xl after:transition after:duration-500";
    if (isActive) {
      return `${base} text-white before:bg-white/10 after:bg-indigo-500/25 shadow-[0_18px_40px_-25px_rgba(99,102,241,0.95)]`;
    }
    return `${base} text-gray-300 hover:text-white before:bg-white/0 hover:before:bg-white/8 after:bg-indigo-500/0 group-hover:after:bg-indigo-500/12`;
  };

  return (
    <header className="z-30 w-full px-4 pt-2 sm:px-6 md:pt-5">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <div className="flex items-center gap-4 rounded-3xl border border-white/8 bg-gray-950/85 px-5 py-3 shadow-[0_35px_80px_-60px_rgba(99,102,241,0.9)] backdrop-blur">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 text-gray-300 transition hover:border-indigo-400/40 hover:text-white md:hidden"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-controls="primary-navigation"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="relative block h-4 w-5">
                  <span
                    className={`absolute left-0 top-0 block h-0.5 w-full rounded-full bg-current transition duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] block h-0.5 w-full rounded-full bg-current transition duration-300 ${open ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`absolute left-0 bottom-0 block h-0.5 w-full rounded-full bg-current transition duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
                  />
                </span>
              </button>

              <Logo />
            </div>

            <nav className="hidden flex-1 items-center justify-center gap-1 md:flex" aria-label="Primary">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto hidden shrink-0 md:inline-flex" />
          </div>

          <nav
            id="primary-navigation"
            aria-label="Mobile"
            className={`md:hidden ${open ? "mt-3 grid gap-3 rounded-2xl border border-white/10 bg-gray-950/90 p-4 shadow-[0_28px_70px_-55px_rgba(99,102,241,0.9)] backdrop-blur" : "hidden"}`}
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${linkClass(item.href)} justify-start`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
