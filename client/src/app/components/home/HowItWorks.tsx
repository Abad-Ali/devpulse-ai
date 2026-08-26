import {
  ArrowDown,
  ArrowRight,
  Bot,
  Code2,
  Play,
  Sparkles,
  Terminal,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 overflow-hidden bg-[#0f1013] px-6 pb-7 text-white pt-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7700]/[0.035] blur-[140px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            From idea to
            <br />

            <span className="bg-gradient-to-r from-[#FF2200] via-[#FF7700] via-[#FFAA00] to-[#FFDD00] bg-clip-text text-transparent">
              working code.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
            DevPulse keeps your entire development loop connected, so you can
            move from writing code to understanding it without constantly
            switching tools.
          </p>

        </div>

        {/* Workflow */}
        <div className="mt-16">

          {/* Desktop workflow */}
          <div className="hidden md:block">

            <div className="relative">

              {/* Connection line */}
              <div className="absolute left-[12%] right-[12%] top-[68px] h-px bg-gradient-to-r from-[#FF2200]/10 via-[#FFAA00]/60 to-[#FFDD00]/10" />

              <div className="grid grid-cols-4 gap-6">

                {/* Step 1 */}
                <div className="group relative text-center">

                  <div className="relative mx-auto flex h-[136px] w-[136px] items-center justify-center rounded-[2rem] border border-[#FF7700]/20 bg-[#15171B] shadow-[0_0_50px_rgba(255,119,0,0.08)] transition duration-500 group-hover:-translate-y-2 group-hover:border-[#FF7700]/40">

                    <div className="absolute inset-3 rounded-[1.5rem] border border-white/[0.05]" />

                    <Code2
                      size={34}
                      strokeWidth={1.5}
                      className="relative text-[#FFAA00]"
                    />

                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#FFAA00]/30 bg-[#1b1d22] text-[11px] font-bold text-[#FFAA00]">
                      01
                    </span>

                  </div>

                  <div className="mt-7">

                    <h3 className="text-lg font-semibold">
                      Create
                    </h3>

                    <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-white/35">
                      Start a project and bring your idea into the workspace.
                    </p>

                  </div>

                </div>

                {/* Step 2 */}
                <div className="group relative text-center">

                  <div className="relative mx-auto flex h-[136px] w-[136px] items-center justify-center rounded-[2rem] border border-[#FFAA00]/20 bg-[#15171B] transition duration-500 group-hover:-translate-y-2 group-hover:border-[#FFAA00]/40">

                    <div className="absolute inset-3 rounded-[1.5rem] border border-white/[0.05]" />

                    <Play
                      size={34}
                      strokeWidth={1.5}
                      className="relative text-[#FFDD00]"
                    />

                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#FFDD00]/30 bg-[#1b1d22] text-[11px] font-bold text-[#FFDD00]">
                      02
                    </span>

                  </div>

                  <div className="mt-7">

                    <h3 className="text-lg font-semibold">
                      Run
                    </h3>

                    <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-white/35">
                      Execute your code and instantly see what it produces.
                    </p>

                  </div>

                </div>

                {/* Step 3 */}
                <div className="group relative text-center">

                  <div className="relative mx-auto flex h-[136px] w-[136px] items-center justify-center rounded-[2rem] border border-[#FF7700]/20 bg-[#15171B] transition duration-500 group-hover:-translate-y-2 group-hover:border-[#FF7700]/40">

                    <div className="absolute inset-3 rounded-[1.5rem] border border-white/[0.05]" />

                    <Bot
                      size={34}
                      strokeWidth={1.5}
                      className="relative text-[#FF7700]"
                    />

                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#FF7700]/30 bg-[#1b1d22] text-[11px] font-bold text-[#FF7700]">
                      03
                    </span>

                  </div>

                  <div className="mt-7">

                    <h3 className="text-lg font-semibold">
                      Understand
                    </h3>

                    <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-white/35">
                      Ask AI to explain errors, logic, and unfamiliar code.
                    </p>

                  </div>

                </div>

                {/* Step 4 */}
                <div className="group relative text-center">

                  <div className="relative mx-auto flex h-[136px] w-[136px] items-center justify-center rounded-[2rem] border border-[#FF2200]/20 bg-[#15171B] transition duration-500 group-hover:-translate-y-2 group-hover:border-[#FF2200]/40">

                    <div className="absolute inset-3 rounded-[1.5rem] border border-white/[0.05]" />

                    <Sparkles
                      size={34}
                      strokeWidth={1.5}
                      className="relative text-[#FFAA00]"
                    />

                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#FFAA00]/30 bg-[#1b1d22] text-[11px] font-bold text-[#FFAA00]">
                      04
                    </span>

                  </div>

                  <div className="mt-7">

                    <h3 className="text-lg font-semibold">
                      Improve
                    </h3>

                    <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-white/35">
                      Refine your code and keep improving with every iteration.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Mobile workflow */}
          <div className="mx-auto max-w-md md:hidden">

            {/* Step 1 */}
            <div className="relative flex gap-5">

              <div className="flex flex-col items-center">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#FF7700]/20 bg-[#15171B] text-[#FFAA00]">
                  <Code2 size={22} />
                </div>

                <div className="mt-3 h-12 w-px bg-gradient-to-b from-[#FF7700]/40 to-transparent" />

              </div>

              <div className="pb-10 pt-1">

                <span className="text-[10px] font-bold tracking-[0.2em] text-[#FFAA00]/60">
                  01
                </span>

                <h3 className="mt-1 text-lg font-semibold">
                  Create
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/35">
                  Start a project and bring your idea into the workspace.
                </p>

              </div>

            </div>

            {/* Step 2 */}
            <div className="relative flex gap-5">

              <div className="flex flex-col items-center">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#FFAA00]/20 bg-[#15171B] text-[#FFDD00]">
                  <Play size={21} />
                </div>

                <div className="mt-3 h-12 w-px bg-gradient-to-b from-[#FFAA00]/40 to-transparent" />

              </div>

              <div className="pb-10 pt-1">

                <span className="text-[10px] font-bold tracking-[0.2em] text-[#FFDD00]/60">
                  02
                </span>

                <h3 className="mt-1 text-lg font-semibold">
                  Run
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/35">
                  Execute your code and instantly see what it produces.
                </p>

              </div>

            </div>

            {/* Step 3 */}
            <div className="relative flex gap-5">

              <div className="flex flex-col items-center">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#FF7700]/20 bg-[#15171B] text-[#FF7700]">
                  <Bot size={22} />
                </div>

                <div className="mt-3 h-12 w-px bg-gradient-to-b from-[#FF7700]/40 to-transparent" />

              </div>

              <div className="pb-10 pt-1">

                <span className="text-[10px] font-bold tracking-[0.2em] text-[#FF7700]/60">
                  03
                </span>

                <h3 className="mt-1 text-lg font-semibold">
                  Understand
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/35">
                  Ask AI to explain errors, logic, and unfamiliar code.
                </p>

              </div>

            </div>

            {/* Step 4 */}
            <div className="flex gap-5">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#FFAA00]/20 bg-[#15171B] text-[#FFAA00]">
                <Sparkles size={22} />
              </div>

              <div className="pt-1">

                <span className="text-[10px] font-bold tracking-[0.2em] text-[#FFAA00]/60">
                  04
                </span>

                <h3 className="mt-1 text-lg font-semibold">
                  Improve
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/35">
                  Refine your code and keep improving with every iteration.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom workspace preview */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#15171B]">

          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF4B3E]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFAA00]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#55C76A]/70" />
              </div>

              <span className="ml-2 text-xs text-white/25">
                DevPulse Workspace
              </span>

            </div>

            <div className="hidden items-center gap-2 text-xs text-white/20 sm:flex">
              <Terminal size={13} />
              Ready
            </div>

          </div>

          <div className="grid min-h-[220px] md:grid-cols-[1.2fr_0.8fr]">

            {/* Code preview */}
            <div className="border-b border-white/[0.07] p-6 md:border-b-0 md:border-r">

              <div className="mb-5 flex items-center justify-between">

                <span className="text-xs font-medium text-white/40">
                  main.js
                </span>

                <span className="rounded-md bg-[#FFAA00]/10 px-2 py-1 text-[10px] text-[#FFAA00]/70">
                  JavaScript
                </span>

              </div>

              <div className="space-y-2 font-mono text-xs leading-6">

                <p>
                  <span className="text-[#FF7700]">const</span>{" "}
                  <span className="text-[#FFDD00]">greeting</span>{" "}
                  <span className="text-white/30">=</span>{" "}
                  <span className="text-[#8ED6FF]">
                    "Hello DevPulse"
                  </span>
                </p>

                <p>
                  <span className="text-[#FF7700]">console</span>
                  <span className="text-white/30">.</span>
                  <span className="text-[#FFAA00]">log</span>
                  <span className="text-white/30">(</span>
                  <span className="text-[#FFDD00]">greeting</span>
                  <span className="text-white/30">)</span>
                </p>

                <p className="pt-2 text-white/20">
                  // Run your code. Learn from the result.
                </p>

              </div>

            </div>

            {/* Output preview */}
            <div className="p-6">

              <div className="mb-5 flex items-center gap-2">

                <Play size={13} className="text-[#FFAA00]" />

                <span className="text-xs font-medium text-white/40">
                  Output
                </span>

              </div>

              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4 font-mono text-xs">

                <p className="text-[#55C76A]/80">
                  $ node main.js
                </p>

                <p className="mt-2 text-white/60">
                  Hello DevPulse
                </p>

                <div className="mt-4 flex items-center gap-2 text-[#55C76A]/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#55C76A]" />
                  Execution completed
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}