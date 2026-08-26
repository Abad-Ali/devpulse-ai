import Link from "next/link";
import { ArrowRight, Code2, Sparkles, Terminal } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative z-10 overflow-hidden bg-[#0f1013] px-6 text-white py-36">

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7700]/[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FFAA00]/40 to-transparent" />

      <div className="relative mx-auto max-w-5xl text-center">
        <h2 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Your next idea
          <br />

          <span className="bg-gradient-to-r from-[#FF2200] via-[#FF7700] via-[#FFAA00] to-[#FFDD00] bg-clip-text text-transparent">
            starts with code.
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/40 sm:text-lg">
          Create a program, run it, understand what happened, and keep improving — all inside DevPulse AI.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/signup" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-7 text-sm font-bold text-[#17181C] transition duration-200 hover:brightness-110">
            Start Coding
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1"/>
          </Link>

          <Link href="/login" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] px-7 text-sm font-medium text-white/60 transition duration-200 hover:border-white/15 hover:bg-white/[0.05] hover:text-white">
            Sign in
          </Link>
        </div>

        <div className="mx-auto mt-16 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-white/[0.06] pt-7">
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Code2 size={15} className="text-[#FFAA00]/70"/>
            Write
          </div>

          <div className="h-1 w-1 rounded-full bg-white/10" />

          <div className="flex items-center gap-2 text-xs text-white/30">
            <Terminal size={15} className="text-[#FF7700]/70"/>
            Execute
          </div>

          <div className="h-1 w-1 rounded-full bg-white/10" />

          <div className="flex items-center gap-2 text-xs text-white/30">
            <Sparkles size={15} className="text-[#FFDD00]/70"/>
            Understand
          </div>

          <div className="h-1 w-1 rounded-full bg-white/10" />

          <div className="flex items-center gap-2 text-xs text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFAA00]" />
            Improve
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF7700]/20 to-transparent" />

    </section>
  );
}