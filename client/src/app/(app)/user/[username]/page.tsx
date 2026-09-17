"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowUpRight, CalendarDays, CheckCircle2, Code2, ExternalLink, GitBranch, Loader2, Mail, Terminal, Zap } from "lucide-react";
import { getProfile } from "@/lib/api/user.api";
import axios from "axios";
import { toast } from "sonner";

const userProfilepage = () => {
  const params = useParams();
  const username = typeof params.username === "string" ? params.username : Array.isArray(params.username) ? params.username[0] : "";

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) {
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getProfile(username);
        setUser(response.user);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "Failed to update program.";
          toast.error(message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
        setError( "Unable to load this developer profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  const programs = user?.programs || [];

  const languageStats = useMemo(() => {
    const counts: Record<string, number> = {};

    programs.forEach((program: any) => {
      const language =program.language || "other";

      counts[language] =
        (counts[language] || 0) + 1;
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [programs]);

  const getLanguageLabel = ( language: string ) => {
    const labels: Record<string, string> = {
      javascript: "JavaScript",
      python: "Python",
      c: "C",
      cpp: "C++",
    };

    return (
      labels[language?.toLowerCase()] ||
      language
    );
  };

  const getLanguageShort = ( language: string ) => {
    const labels: Record<string, string> = {
      javascript: "JS",
      python: "PY",
      c: "C",
      cpp: "C++",
    };

    return (
      labels[language?.toLowerCase()] ||
      "CODE"
    );
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center text-black dark:text-white">
        <div className="flex items-center gap-3 text-sm text-black/40 dark:text-white/40">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading developer...
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-black/[0.08] bg-white/5 backdrop-blur-sm dark:border-white/[0.07] dark:bg-[#15171B]/5">
            <Terminal className="h-5 w-5 text-black/35 dark:text-white/35" />
          </div>

          <h1 className="mt-5 text-xl font-semibold text-black/80 dark:text-white/80">
            Developer not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-black/45 dark:text-white/40">
            {error || "This profile is unavailable."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-black dark:text-white">
      <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-7 lg:px-10 lg:py-12">

        <section className="py-10 lg:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 gap-5 sm:gap-6">
              <div className="flex h-25 w-25 shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/[0.08] bg-white/5 backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/5">
                <img src={user.avatar || "/defaultPic.svg"} alt={user.name} className="h-full w-full object-cover"/>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-semibold tracking-tight text-black/80 sm:text-4xl lg:text-5xl dark:text-white/80">
                    {user.name}
                  </h1>

                  <span className="rounded-full border border-black/[0.08] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-black/40 dark:border-white/[0.08] dark:text-white/30">
                    Developer
                  </span>
                </div>

                <p className="mt-1 font-mono text-sm text-black/40 dark:text-white/35">
                  @{user.username}
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-black/50 dark:text-white/35">
                  {user.bio || "Building and sharing software through DevPulse."}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-5">
                  {user.github?.username && (
                    <a href={ user.github.profileUrl || `https://github.com/${user.github.username}`} target="_blank" rel="noreferrer" className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-black/60 transition hover:text-black dark:text-white/55 dark:hover:text-white">
                      <img src="/github.svg" alt="GitHub" className="h-4 w-4 dark:invert"/>
                      {user.github.username}
                      <ArrowUpRight className="h-3.5 w-3.5 text-black/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-white/25" />
                    </a>
                  )}

                  {user.email && (
                    <a href={`mailto:${user.email}`} className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-black/55 transition hover:text-black dark:text-white/50 dark:hover:text-white">
                      <Mail className="h-4 w-4" />
                      Contact
                    </a>
                  )}
                </div>
              </div>
            </div>

            {user.createdAt && (
              <div className="flex items-center gap-2 text-xs text-black/35 dark:text-white/30">
                <CalendarDays className="h-4 w-4" />
                Joined{" "}
                {new Date( user.createdAt ).toLocaleDateString( "en-US", { month: "short", year: "numeric" })}
              </div>
            )}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="group relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/5 p-5 backdrop-blur-sm transition duration-200 hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15">
            <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-black/[0.04] blur-2xl opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-white/[0.05]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/40 dark:text-white/35">
                  Execution activity
                </span>
                <Zap className="h-4 w-4 text-black/30 transition group-hover:text-[#FF7700] dark:text-white/25 dark:group-hover:text-[#FFAA00]" />
              </div>

              <p className="mt-5 text-2xl font-semibold tracking-tight text-black/80 transition group-hover:text-black dark:text-white/80 dark:group-hover:text-white">
                {user.stats?.executions ?? 0}
              </p>
              <p className="mt-1 text-xs text-black/35 transition group-hover:text-black/60 dark:text-white/30 dark:group-hover:text-white/50">
                total runs
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/5 p-5 backdrop-blur-sm transition duration-200 hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15">
            <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-black/[0.04] blur-2xl opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-white/[0.05]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/40 dark:text-white/35">
                  Contributions
                </span>
                <GitBranch className="h-4 w-4 text-black/30 transition group-hover:text-[#FF7700] dark:text-white/25 dark:group-hover:text-[#FFAA00]" />
              </div>

              <p className="mt-5 text-2xl font-semibold tracking-tight text-black/80 transition group-hover:text-black dark:text-white/80 dark:group-hover:text-white">
                {user.stats?.contributions ?? 0}
              </p>
              <p className="mt-1 text-xs text-black/35 transition group-hover:text-black/60 dark:text-white/30 dark:group-hover:text-white/50">
                recorded contributions
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/5 p-5 backdrop-blur-sm transition duration-200 hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15">
            <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-black/[0.04] blur-2xl opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-white/[0.05]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/40 dark:text-white/35">
                  Primary language
                </span>
                <Code2 className="h-4 w-4 text-black/30 transition group-hover:text-[#FF7700] dark:text-white/25 dark:group-hover:text-[#FFAA00]" />
              </div>

              <p className="mt-5 text-xl font-semibold tracking-tight text-black/80 transition group-hover:text-black dark:text-white/80 dark:group-hover:text-white">
                {languageStats.length ? getLanguageLabel( languageStats[0][0] ) : "—"}
              </p>
              <p className="mt-1 text-xs text-black/35 transition group-hover:text-black/60 dark:text-white/30 dark:group-hover:text-white/50">
                most used in public work
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/5 p-5 backdrop-blur-sm transition duration-200 hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15">
            <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-black/[0.04] blur-2xl opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-white/[0.05]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/40 dark:text-white/35">
                  Visibility
                </span>
                <CheckCircle2 className="h-4 w-4 text-black/30 transition group-hover:text-[#FF7700] dark:text-white/25 dark:group-hover:text-[#FFAA00]" />
              </div>
              <p className="mt-5 text-xl font-semibold tracking-tight text-black/80 transition group-hover:text-black dark:text-white/80 dark:group-hover:text-white">
                Public
              </p>
              <p className="mt-1 text-xs text-black/35 transition group-hover:text-black/60 dark:text-white/30 dark:group-hover:text-white/50">
                selected work is discoverable
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

          <div>
            <div className="flex items-end justify-between border-b border-black/[0.08] pb-5 dark:border-white/[0.08]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
                  Developer work
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black/80 dark:text-white/80">
                  Public programs
                </h2>
              </div>

              <span className="font-mono text-xs text-black/30 dark:text-white/25">
                {programs.length .toString() .padStart(2, "0")}{" "}projects
              </span>
            </div>

            {programs.length === 0 ? (
              <div className="mt-6 flex min-h-[260px] flex-col items-center justify-center rounded-[28px] border border-dashed border-black/[0.08] bg-white/5 backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/5">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-black/40 dark:bg-white/[0.04] dark:text-white/25">
                  <Code2 size={18} strokeWidth={1.8}/>
                </div>
                <p className="mt-4 text-sm font-medium text-black/60 dark:text-white/50">
                  No public programs
                </p>
                <p className="mt-1 text-sm text-black/40 dark:text-white/30">
                  Shared work will appear here.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                {programs.map(
                  ( program: any, index: number ) => { 
                    const programId = program.id || program._id;
                    return (
                      <a key={ programId || `${program.title}-${index}`} href={`/programs/${programId}`} className="group relative flex min-h-[235px] cursor-pointer flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/5 p-5 backdrop-blur-sm transition duration-200 hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15">
                        <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-black/[0.04] blur-2xl opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-white/[0.05]" />

                        <div className="relative flex h-full flex-col">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-black/40 transition-all duration-200 group-hover:scale-105 group-hover:bg-white group-hover:text-[#FF7700] dark:bg-white/[0.05] dark:text-white/45 dark:group-hover:bg-[#181A1F] dark:group-hover:text-[#FFAA00]">
                              <Code2 className="h-4 w-4" strokeWidth={1.8}/>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-black/25 transition group-hover:bg-black/[0.04] group-hover:text-[#FF7700] dark:text-white/25 dark:group-hover:bg-white/[0.05] dark:group-hover:text-[#FFAA00]">
                              <ExternalLink className="h-4 w-4" />
                            </div>
                          </div>

                          <div className="mt-6 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-black/30 dark:text-white/25">
                                {getLanguageShort(program.language)}
                              </span>

                              <span className="h-1 w-1 rounded-full bg-black/20 dark:bg-white/20" />
                              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                                Public
                              </span>
                            </div>

                            <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-6 tracking-tight text-black/80 transition group-hover:text-black dark:text-white/80 dark:group-hover:text-white">
                              {program.title}
                            </h3>

                            <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-black/45 transition group-hover:text-black/60 dark:text-white/35 dark:group-hover:text-white/50">
                              {program.description || "No description provided."}
                            </p>
                          </div>

                          <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4 dark:border-white/[0.06]">
                            <span className="text-[11px] text-black/30 dark:text-white/25">
                              {program.updatedAt ? `Updated ${new Date( program.updatedAt ).toLocaleDateString( "en-US", {month: "short", day: "numeric" } )}` : "Recently updated"}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-black/30 transition group-hover:text-[#FF7700] dark:text-white/20 dark:group-hover:text-[#FFAA00]">
                              View
                              <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"/>
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  },
                )}
              </div>
            )}
          </div>

          <aside className="sticky top-6 h-fit self-start rounded-[28px] border border-black/[0.08] bg-white/5 p-6 backdrop-blur-sm transition duration-200 hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15">
            <div className="pointer-events-none absolute" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/35 dark:text-white/30">
                    Technology
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-black/80 dark:text-white/80">
                    Working stack
                  </h2>
                </div>
                <Code2 className="h-4 w-4 text-black/30 transition group-hover:text-[#FF7700] dark:text-white/25 dark:group-hover:text-[#FFAA00]" />
              </div>

              {languageStats.length > 0 ? (
                <div className="mt-7 space-y-5">
                  {languageStats.map(
                    ([language, count]) => {
                      const percentage = Math.round((Number(count) / programs.length) *  100);

                      return (
                        <div key={language}>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-medium text-black/70 dark:text-white/65">
                              {getLanguageLabel(language)}
                            </span>

                            <span className="font-mono text-[10px] text-black/35 dark:text-white/30">
                             {count}{" "} {Number(count) === 1 ? "project" : "projects"}
                            </span>
                          </div>

                          <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.07]">
                            <div className="h-full rounded-full bg-black/60 dark:bg-white/60" style={{ width: `${Math.max( percentage, 8 )}%`}}/>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              ) : (
                <div className="mt-7 rounded-xl border border-dashed border-black/[0.08] p-5 text-center dark:border-white/[0.08]">
                  <p className="text-xs text-black/35 dark:text-white/30">
                    No language data available.
                  </p>
                </div>
              )}
              <div className="mt-8 border-t border-black/[0.08] pt-5 dark:border-white/[0.08]">
                <p className="text-xs leading-6 text-black/40 dark:text-white/35">
                  Languages are inferred from public programs shared by this developer.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="group relative mt-12 overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/5 p-6 backdrop-blur-sm transition duration-200 hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15 sm:p-7">
          <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-black/[0.04] blur-2xl opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-white/[0.05]" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
                Developer identity
              </p>
              <p className="mt-2 text-sm text-black/50 transition group-hover:text-black/60 dark:text-white/35 dark:group-hover:text-white/50">
                @{user.username}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {user.gender && (
                <span className="rounded-lg border border-black/[0.08] px-3 py-2 text-xs text-black/45 dark:border-white/[0.08] dark:text-white/40">
                  {user.gender}
                </span>
              )}
              {user.github?.username && (
                <a href={user.github.profileUrl || `https://github.com/${user.github.username}`} target="_blank" rel="noreferrer" className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-black/[0.08] px-3 py-2 text-xs font-medium text-black/60 transition hover:bg-black/[0.04] hover:text-black dark:border-white/[0.08] dark:text-white/55 dark:hover:bg-white/[0.04] dark:hover:text-white">
                  <img src="/github.svg" alt="GitHub" className="h-3.5 w-3.5 dark:invert"/>
                  GitHub
                </a>
              )}
              {user.email && (
                <a href={`mailto:${user.email}`} className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-black/[0.08] px-3 py-2 text-xs font-medium text-black/60 transition hover:bg-black/[0.04] hover:text-black dark:border-white/[0.08] dark:text-white/55 dark:hover:bg-white/[0.04] dark:hover:text-white">
                  <Mail className="h-3.5 w-3.5" />
                  Contact
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default userProfilepage;