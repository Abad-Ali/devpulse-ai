"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HelpCircle,
  ShieldCheck,
  FileText,
} from "lucide-react";

const AppFooter = () => {
  return (
    <footer className="relative z-50 border-t border-slate-200 bg-slate-50/80 backdrop-blur-sm transition-colors duration-200 dark:border-white/[0.06] dark:bg-[#0f1013]/90">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">

        {/* Main footer row */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 shadow-sm dark:border-white/[0.08] bg-[#181A1F] dark:shadow-none">
              <Image
                src="/assets/logo.png"
                alt="DevPulse AI"
                width={26}
                height={26}
                className="h-6 w-6 object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-700 dark:text-white/75">
                DevPulse
                <span className="ml-1 bg-gradient-to-r from-[#FF7700] to-[#FFDD00] bg-clip-text text-transparent">
                  AI
                </span>
              </p>

              <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-white/25">
                Code. Execute. Understand
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-1">

            <Link
              href="/help"
              className="group flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-medium text-slate-500 transition hover:bg-slate-200/50 hover:text-slate-800 dark:text-white/35 dark:hover:bg-white/[0.04] dark:hover:text-white/75"
            >
              <HelpCircle
                size={14}
                strokeWidth={1.8}
                className="text-slate-400 transition group-hover:text-[#FF7700] dark:text-white/25 dark:group-hover:text-[#FFAA00]"
              />
              Help
            </Link>

            <Link
              href="/privacy"
              className="group flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-medium text-slate-500 transition hover:bg-slate-200/50 hover:text-slate-800 dark:text-white/35 dark:hover:bg-white/[0.04] dark:hover:text-white/75"
            >
              <ShieldCheck
                size={14}
                strokeWidth={1.8}
                className="text-slate-400 transition group-hover:text-[#FF7700] dark:text-white/25 dark:group-hover:text-[#FFAA00]"
              />
              Privacy
            </Link>

            <Link
              href="/terms"
              className="group flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-medium text-slate-500 transition hover:bg-slate-200/50 hover:text-slate-800 dark:text-white/35 dark:hover:bg-white/[0.04] dark:hover:text-white/75"
            >
              <FileText
                size={14}
                strokeWidth={1.8}
                className="text-slate-400 transition group-hover:text-[#FF7700] dark:text-white/25 dark:group-hover:text-[#FFAA00]"
              />
              Terms
            </Link>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DevPulse AI GitHub"
              className="group ml-1 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#111216]/90 dark:bg-[#111216]"
            >
              <Image
                src="/assets/github.svg"
                alt="GitHub"
                width={15}
                height={15}
                className="h-[15px] w-[15px]"
              />
            </a>

          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.05]">

          <p className="text-[10px] text-slate-400 dark:text-white/20">
            © {new Date().getFullYear()} DevPulse AI
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-white/20">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] dark:bg-emerald-400 dark:shadow-[0_0_8px_rgba(52,211,153,0.5)]" />

            <span>
              All systems operational
            </span>

            <span className="mx-1 text-slate-300 dark:text-white/10">
              •
            </span>

            <span className="flex items-center gap-1">
              Built by Abad Ali
            </span>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default AppFooter;
