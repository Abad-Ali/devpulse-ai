import {
  ArrowUpRight,
  Bot,
  Code2,
  GitBranch,
  Play,
  Sparkles,
  Terminal,
} from "lucide-react";

export default function Features() {
  return (
    <section
      id="features"
      className="relative z-10 overflow-hidden bg-[#0f1013] rounded-t-2xl  px-6 pb-7 text-white pt-28"
    >
      {/* Background grid */}
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

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#FF7700]/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            One workspace.
            <br />

            <span className="bg-gradient-to-r from-[#FF2200] via-[#FF7700] via-[#FFAA00] to-[#FFDD00] bg-clip-text text-transparent">
              Infinite possibilities.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
            DevPulse AI brings your code, execution environment, AI
            assistance, and development workflow together in one intelligent
            workspace.
          </p>

        </div>

        {/* Features */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">

          {/* Code */}
          <article className="group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#FF7700]/30">

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#FF2200]/10 blur-3xl transition-all duration-500 group-hover:bg-[#FF2200]/20" />

            <div className="relative flex h-full flex-col">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FF7700]/20 bg-[#FF7700]/10 text-[#FFAA00]">
                  <Code2 size={22} strokeWidth={1.8} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FFAA00]"
                />

              </div>

              <div className="mt-auto pt-14">

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFAA00]/70">
                  Development
                </p>

                <h3 className="text-2xl font-semibold tracking-tight">
                  Code without limits.
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  Write, organize, save, and manage your programs inside a
                  workspace built around your development workflow.
                </p>

              </div>

            </div>
          </article>

          {/* Execution */}
          <article className="group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#FFAA00]/30">

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#FFAA00]/10 blur-3xl transition-all duration-500 group-hover:bg-[#FFAA00]/20" />

            <div className="relative flex h-full flex-col">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FFAA00]/20 bg-[#FFAA00]/10 text-[#FFDD00]">
                  <Play size={21} strokeWidth={1.8} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FFDD00]"
                />

              </div>

              <div className="mt-auto pt-14">

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDD00]/70">
                  Execution
                </p>

                <h3 className="text-2xl font-semibold tracking-tight">
                  Run your code.
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  Execute your programs and inspect their output without
                  leaving your coding workspace.
                </p>

              </div>

            </div>
          </article>

          {/* AI */}
          <article className="group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#FF2200]/30">

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#FF2200]/10 blur-3xl transition-all duration-500 group-hover:bg-[#FF2200]/20" />

            <div className="relative flex h-full flex-col">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FF2200]/20 bg-[#FF2200]/10 text-[#FF7700]">
                  <Bot size={22} strokeWidth={1.8} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FF7700]"
                />

              </div>

              <div className="mt-auto pt-14">

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7700]/70">
                  Intelligence
                </p>

                <h3 className="text-2xl font-semibold tracking-tight">
                  Understand your code.
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  Let AI explain, debug, improve, and help you learn from the
                  code you're actually working on.
                </p>

              </div>

            </div>
          </article>

          {/* GitHub */}
          <article className="group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 md:col-span-2">

            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl transition-all duration-500 group-hover:bg-[#FFAA00]/10" />

            <div className="relative flex h-full flex-col md:flex-row md:items-end md:justify-between">

              <div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
                  <GitBranch size={22} strokeWidth={1.8} />
                </div>

                <div className="mt-10">

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                    GitHub
                  </p>

                  <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Your code, connected.
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                    Connect your repositories and keep your development
                    workflow connected to the projects you already use.
                  </p>

                </div>

              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/40 transition-colors group-hover:text-white/70 md:mb-1">

                <GitBranch size={16} />

                Connect your workspace

                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />

              </div>

            </div>
          </article>

          {/* Developer insights */}
          <article className="group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#FF7700]/30">

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#FF7700]/10 blur-3xl transition-all duration-500 group-hover:bg-[#FF7700]/20" />

            <div className="relative flex h-full flex-col">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FF7700]/20 bg-[#FF7700]/10 text-[#FFAA00]">
                  <Terminal size={21} strokeWidth={1.8} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FFAA00]"
                />

              </div>

              <div className="mt-auto pt-14">

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFAA00]/70">
                  Insights
                </p>

                <h3 className="text-2xl font-semibold tracking-tight">
                  Track your progress.
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  See your coding activity, executions, progress, and
                  development patterns over time.
                </p>

              </div>

            </div>
          </article>

        </div>

        {/* Bottom statement */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 sm:flex-row">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFAA00]/10 text-[#FFAA00]">
              <Sparkles size={16} />
            </div>

            <p className="text-sm text-white/45">
              Everything you need to turn ideas into working code.
            </p>

          </div>

          <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/20">
            DevPulse AI
          </span>

        </div>

      </div>
    </section>
  );
}