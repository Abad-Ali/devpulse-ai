"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  LayoutDashboard,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  // Temporary authentication state.
  // Later replace this with Redux auth state.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-3 sm:px-5">
      <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between rounded-2xl border border-white/[0.08] bg-[#17191e]/20 px-3 backdrop-blur-xl sm:px-4">

        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="group flex items-center gap-3"
        >
          {/* Logo background */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#2A2C32] transition duration-200 group-hover:border-[#FFAA00]/40">
            <Image
              src="/assets/logo.png"
              alt="DevPulse AI"
              width={34}
              height={34}
              priority
              className="h-8 w-8 object-contain"
            />
          </div>

          {/* Brand */}
          <div className="">
            <div className="text-[15px] font-bold tracking-tight text-white">
              DevPulse
              <span className="ml-1 bg-gradient-to-r from-[#FF7700] to-[#FFDD00] bg-clip-text text-transparent">
                AI
              </span>
            </div>

            <div className="hidden sm:block text-[10px] font-medium tracking-wider text-white/35">
              CODE • EXECUTE • LEARN
            </div>
          </div>
        </Link>

        {/* ------------------------------------------------ */}
        {/* Desktop Navigation                               */}
        {/* ------------------------------------------------ */}

        <div className="hidden items-center gap-1 md:flex">

          <Link
            href="#features"
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
          >
            How It Works
          </Link>

          <Link
            href="#about"
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
          >
            About
          </Link>
        </div>

        {/* ------------------------------------------------ */}
        {/* Desktop Actions                                  */}
        {/* ------------------------------------------------ */}

        <div className="hidden items-center gap-2 md:flex">

          {isLoggedIn ? (
            <>
              {/* Dashboard */}
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:border-[#FFAA00]/30 hover:bg-white/[0.06] hover:text-white"
              >
                <LayoutDashboard
                  size={17}
                  className="text-[#FFAA00]"
                />

                <span>Dashboard</span>
              </Link>

              {/* User */}
              <Link
                href="/profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#2A2C32] text-sm font-bold text-white transition hover:border-[#FFAA00]/40"
              >
                U
              </Link>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/65 transition hover:bg-white/[0.05] hover:text-white"
              >
                <LogIn
                  size={17}
                  className="text-white/50 transition group-hover:text-[#FFAA00]"
                />

                <span>Login</span>
              </Link>

              {/* Get Started */}
              <Link
                href="/signup"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-4 py-2.5 text-sm font-bold text-[#2A2C32] transition duration-200 hover:brightness-110"
              >
                <span>Get Started</span>

                <ArrowRight
                  size={17}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </>
          )}
        </div>

        {/* ------------------------------------------------ */}
        {/* Mobile Button                                    */}
        {/* ------------------------------------------------ */}

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white transition hover:border-[#FFAA00]/30 md:hidden"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* -------------------------------------------------- */}
      {/* Mobile Navigation                                 */}
      {/* -------------------------------------------------- */}

      {isMenuOpen && (
        <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#17191e]/30 backdrop-blur-xl md:hidden">

          {/* Navigation links */}
          <div className="p-3">

            <Link
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-white/70 transition hover:bg-white/[0.05] hover:text-white"
            >
              <span>Features</span>
              <ChevronDown
                size={16}
                className="-rotate-90 text-white/30"
              />
            </Link>

            <Link
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-white/70 transition hover:bg-white/[0.05] hover:text-white"
            >
              <span>How It Works</span>
              <ChevronDown
                size={16}
                className="-rotate-90 text-white/30"
              />
            </Link>

            <Link
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-white/70 transition hover:bg-white/[0.05] hover:text-white"
            >
              <span>About</span>
              <ChevronDown
                size={16}
                className="-rotate-90 text-white/30"
              />
            </Link>
          </div>

          {/* Divider */}
          <div className="mx-4 h-px bg-white/[0.07]" />

          {/* Mobile actions */}
          <div className="p-4">

            {isLoggedIn ? (
              <div className="flex flex-col gap-2">

                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#FFAA00]/30"
                >
                  <LayoutDashboard
                    size={17}
                    className="text-[#FFAA00]"
                  />

                  Go to Dashboard
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Profile
                </Link>

              </div>
            ) : (
              <div className="flex flex-col gap-2">

                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:text-white"
                >
                  <LogIn size={17} />

                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-5 py-3 text-sm font-bold text-[#2A2C32] transition hover:brightness-110"
                >
                  <Code2 size={17} />

                  Start Building

                  <ArrowRight size={16} />
                </Link>

              </div>
            )}
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* Temporary Auth Toggle                              */}
      {/* -------------------------------------------------- */}

      <button
        type="button"
        onClick={() => setIsLoggedIn((previous) => !previous)}
        className="absolute right-4 top-24 hidden text-[10px] text-white/20 hover:text-white/50 lg:block"
      >
        {isLoggedIn ? "test: logout" : "test: login"}
      </button>
    </header>
  );
}