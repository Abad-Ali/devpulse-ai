import { BrainCircuit, Code2, Gauge, GitBranch, ShieldCheck, Sparkles } from "lucide-react";
import LaptopModel from "../3d/LaptopModel";

export default function About() {
  return (
    <section id="about" className="relative z-10 overflow-hidden bg-[#0f1013] px-6 text-white py-28">
      
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[#FF2200]/[0.05] blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#FFAA00]/[0.05] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-1 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Built for developers
              <br />
              <span className="bg-gradient-to-r from-[#FF2200] via-[#FF7700] via-[#FFAA00] to-[#FFDD00] bg-clip-text text-transparent">
                who want to get better.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
              Writing code is only one part of becoming a better developer. DevPulse AI brings coding, execution, AI assistance, and progress tracking into one focused environment.
            </p>
          </div>

          <div className="relative hidden lg:block cursor-pointer">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7700]/10 blur-[100px]" />
            <LaptopModel />
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF7700]/[0.08] blur-[100px]" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FFAA00]/20 bg-[#FFAA00]/10 text-[#FFAA00]">
                <BrainCircuit size={25} strokeWidth={1.6} />
              </div>

              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFAA00]/70">
                The idea
              </p>

              <h3 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Don't just write code.
                <br />
                Understand it.
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
                DevPulse is designed around the idea that developers improve faster when they can immediately see what their code does, understand why it behaves that way, and iterate on it.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-white/40">
                  Write
                </span>

                <span className="text-white/15">→</span>

                <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-white/40">
                  Run
                </span>

                <span className="text-white/15">→</span>

                <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-white/40">
                  Understand
                </span>

                <span className="text-white/15">→</span>

                <span className="rounded-full border border-[#FFAA00]/15 bg-[#FFAA00]/[0.05] px-3 py-1.5 text-xs text-[#FFAA00]/70">
                  Improve
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="group rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 transition duration-300 hover:border-[#FF7700]/25">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FF7700]/15 bg-[#FF7700]/10 text-[#FFAA00]">
                  <Code2 size={21} strokeWidth={1.7} />
                </div>

                <span className="text-xs text-white/15">01</span>
              </div>

              <h3 className="mt-7 text-xl font-semibold">Stay focused</h3>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Keep your code, execution results, and development tools together instead of constantly switching between platforms.
              </p>
            </div>

            <div className="group rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 transition duration-300 hover:border-[#FFAA00]/25">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FFAA00]/15 bg-[#FFAA00]/10 text-[#FFDD00]">
                  <Gauge size={21} strokeWidth={1.7} />
                </div>

                <span className="text-xs text-white/15">02</span>
              </div>

              <h3 className="mt-7 text-xl font-semibold">See your progress</h3>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Turn your coding activity into useful signals that help you understand your development habits over time.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <ShieldCheck size={20} className="text-[#FFAA00]" strokeWidth={1.7}/>

            <h3 className="mt-5 text-base font-semibold">Your workspace</h3>

            <p className="mt-2 text-sm leading-6 text-white/35">
              Your programs and development history stay organized around your
              account.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <GitBranch size={20} className="text-[#FF7700]" strokeWidth={1.7} />

            <h3 className="mt-5 text-base font-semibold">Your workflow</h3>

            <p className="mt-2 text-sm leading-6 text-white/35">
              Connect the tools and services you already use as DevPulse grows.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <Sparkles size={20} className="text-[#FFDD00]" strokeWidth={1.7} />

            <h3 className="mt-5 text-base font-semibold">Keep improving</h3>

            <p className="mt-2 text-sm leading-6 text-white/35">
              Use execution, AI feedback, and your coding activity to improve
              with every iteration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
