"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Code2, Globe2, Info, Loader2, Lock, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createProgram } from "@/lib/api/program.api";
import { toast } from "sonner";
import axios from "axios";
import { addProgram } from "@/lib/redux/features/programs/programsSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";

type Visibility = "public" | "private";

const languages = ["javascript", "typescript", "python", "java", "cpp", "c", "go", "rust"];

const languageLabels: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
  c: "C",
  go: "Go",
  rust: "Rust",
};

const NewProgramForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [visibility, setVisibility] = useState<Visibility>("private");
  const [isLoading, setIsLoading] = useState(false)

  const isValid = title.trim().length > 0;

  const previewTitle = useMemo(() => title.trim() || "Untitled Program", [title]);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;

    const data = {
      title: title.trim(),
      description: description.trim(),
      language,
      visibility,
    };

    
        try {
          setIsLoading(true);
    
          const res = await createProgram(data);
    
          if (res.success) {
            toast.success(res.message);
            dispatch(addProgram(res.data));
            setTitle("");
            setDescription("");
            setLanguage("javascript");
            setVisibility("private");
            router.push(`/programs/program/${res.data.id}`);
            return;
          }
    
          toast.error(res.message || "Failed to create program.");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Failed to create program.";
            toast.error(message);
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        } finally {
          setIsLoading(false);
        }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mb-7 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-xl text-black/40 hover:bg-black/[0.035] hover:text-black dark:text-white/30 dark:hover:bg-white/[0.05] dark:hover:text-white">
            <Link href="/programs" aria-label="Back to programs">
              <ArrowLeft size={15} strokeWidth={1.8} />
            </Link>
          </Button>

          <div className="flex min-w-0 items-center gap-2 text-xs">
            <Link href="/programs" className="text-black/40 transition-colors hover:text-black dark:text-white/30 dark:hover:text-white">
              Programs
            </Link>
            <span className="text-black/20 dark:text-white/15">/</span>
            <span className="truncate font-medium text-black/70 dark:text-white/65">New Program</span>
          </div>
        </div>

        <div className="hidden items-center gap-2 text-[10px] font-medium text-black/30 dark:text-white/25 sm:flex">
          <Code2 size={13} />
          <span>Workspace</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#FFAA00]/10 bg-[#FFAA00]/10">
            <Sparkles size={18} strokeWidth={1.8} className="text-[#FFAA00]" />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white sm:text-3xl">Create a new program</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45 dark:text-white/30">
              Set up the basics for your program. Once created, you&apos;ll be taken to the code editor where you can write, run, save, get AI assistance, and push your work to GitHub.
            </p>
          </div>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/5 shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/5">
          <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[#FFAA00]/[0.045] blur-[100px]" />

          <form onSubmit={handleSubmit} className="relative">
            <div className="border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06] sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.035] dark:bg-white/[0.045]">
                  <Code2 size={16} strokeWidth={1.8} className="text-black/45 dark:text-white/35" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-black dark:text-white">Program Details</h2>
                  <p className="mt-0.5 text-[10px] text-black/35 dark:text-white/25">A few details before you start coding.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 px-6 py-7 sm:px-7">
              <div className="w-full space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="program-title" className="text-xs font-semibold text-black/70 dark:text-white/65">Program title</Label>
                  <span className={`text-[10px] ${title.length > 90 ? "text-[#FFAA00]" : "text-black/30 dark:text-white/25"}`}>{title.length}/100</span>
                </div>

                <Input id="program-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Expense Tracker" maxLength={100} required autoComplete="off" className="h-11 w-full rounded-xl border-black/[0.08] bg-black/[0.02] px-3.5 text-sm text-black shadow-none transition placeholder:text-black/25 focus-visible:border-[#FFAA00]/40 focus-visible:ring-2 focus-visible:ring-[#FFAA00]/10 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/25 dark:focus-visible:border-[#FFAA00]/30 dark:focus-visible:ring-[#FFAA00]/10" />

                <p className="text-[10px] text-black/30 dark:text-white/20">Choose a clear name that helps you identify the project later.</p>
              </div>

              <div className="w-full space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="program-description" className="text-xs font-semibold text-black/70 dark:text-white/65">Description</Label>
                  <span className={`text-[10px] ${description.length > 450 ? "text-[#FFAA00]" : "text-black/30 dark:text-white/25"}`}>{description.length}/500</span>
                </div>

                <Textarea id="program-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What does this program do?" maxLength={500} className="min-h-[140px] w-full resize-none rounded-xl border-black/[0.08] bg-black/[0.02] px-3.5 py-3 text-sm leading-6 text-black shadow-none transition placeholder:text-black/25 focus-visible:border-[#FFAA00]/40 focus-visible:ring-2 focus-visible:ring-[#FFAA00]/10 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/25 dark:focus-visible:border-[#FFAA00]/30 dark:focus-visible:ring-[#FFAA00]/10" />

                <p className="text-[10px] text-black/30 dark:text-white/20">Briefly explain what this program is intended to do.</p>
              </div>

              <div className="w-full space-y-2.5">
                <div>
                  <Label htmlFor="program-language" className="text-xs font-semibold text-black/70 dark:text-white/65">Programming language</Label>
                  <p className="mt-1 text-[10px] text-black/35 dark:text-white/25">This determines the language used by the code editor and execution environment.</p>
                </div>

                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="program-language" className="h-11 py-5 w-full rounded-xl border-black/[0.08] bg-black/[0.02] px-3.5 text-sm text-black shadow-none focus:ring-2 focus:ring-[#FFAA00]/10 focus:ring-offset-0 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white cursor-pointer">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl border-black/[0.08] bg-white dark:border-white/[0.08] dark:bg-[#15171B]">
                    {languages.map((item) => (
                      <SelectItem key={item} value={item} className="cursor-pointer rounded-lg text-sm focus:bg-[#FFAA00]/10 focus:text-black dark:focus:bg-[#FFAA00]/10 dark:focus:text-white">
                        {languageLabels[item]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full space-y-3">
                <div>
                  <p className="text-xs font-semibold text-black/70 dark:text-white/65">Visibility</p>
                  <p className="mt-1 text-[10px] text-black/35 dark:text-white/25">Decide who can access your program.</p>
                </div>

                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                  <Button type="button" variant="outline" onClick={() => setVisibility("private")} aria-pressed={visibility === "private"} className={`group relative min-h-[92px] w-full justify-start overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 hover:text-inherit cursor-pointer ${visibility === "private" ? "border-[#FFAA00]/30 bg-[#FFAA00]/[0.055] shadow-[0_8px_30px_rgba(255,170,0,0.04)] hover:bg-[#FFAA00]/[0.055]" : "border-black/[0.07] bg-black/[0.015] hover:border-black/[0.12] hover:bg-black/[0.025] dark:border-white/[0.06] dark:bg-white/[0.015] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.025]"}`}>
                    {visibility === "private" && <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#FFAA00]/10 blur-2xl" />}

                    <div className="relative flex w-full items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${visibility === "private" ? "bg-[#FFAA00]/10 text-[#FFAA00]" : "bg-black/[0.03] text-black/35 dark:bg-white/[0.04] dark:text-white/30"}`}>
                          <Lock size={16} strokeWidth={1.8} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-black/80 dark:text-white/75">Private</p>
                          <p className="mt-1 text-[10px] leading-4 text-black/40 dark:text-white/25">Only you can access it.</p>
                        </div>
                      </div>

                    </div>
                  </Button>

                  <Button type="button" variant="outline" onClick={() => setVisibility("public")} aria-pressed={visibility === "public"} className={`group relative min-h-[92px] w-full justify-start overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 hover:text-inherit cursor-pointer ${visibility === "public" ? "border-emerald-500/25 bg-emerald-500/[0.045] shadow-[0_8px_30px_rgba(16,185,129,0.04)] hover:bg-emerald-500/[0.045]" : "border-black/[0.07] bg-black/[0.015] hover:border-black/[0.12] hover:bg-black/[0.025] dark:border-white/[0.06] dark:bg-white/[0.015] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.025]"}`}>
                    {visibility === "public" && <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl" />}

                    <div className="relative flex w-full items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${visibility === "public" ? "bg-emerald-500/10 text-emerald-500" : "bg-black/[0.03] text-black/35 dark:bg-white/[0.04] dark:text-white/30"}`}>
                          <Globe2 size={16} strokeWidth={1.8} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-black/80 dark:text-white/75">Public</p>
                          <p className="mt-1 text-[10px] leading-4 text-black/40 dark:text-white/25">Others can view it.</p>
                        </div>
                      </div>

                    </div>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-black/[0.06] bg-black/[0.015] px-6 py-4 dark:border-white/[0.06] dark:bg-white/[0.015] sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <Button type="button" variant="ghost" className="h-10 rounded-xl px-4 text-sm font-medium text-black/45 hover:bg-black/[0.04] hover:text-black dark:text-white/40 dark:hover:bg-white/[0.05] dark:hover:text-white">
                <Link href="/programs">Cancel</Link>
              </Button>

              <Button type="submit" disabled={!isValid || isLoading} className="h-10 cursor-pointer rounded-xl bg-[#FFAA00] px-5 text-sm font-semibold text-white shadow-none transition-all hover:bg-[#FFAA00]/90 disabled:cursor-not-allowed disabled:opacity-40">
                {isLoading ? (
                  <>
                    <Loader2 size={15} strokeWidth={2} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={15} strokeWidth={2} />
                    Create Program
                    <ArrowRight size={14} strokeWidth={2} />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
          <div className="relative overflow-hidden rounded-[24px] border border-black/[0.08] bg-white/5 p-5 shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/5">
            <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#FFAA00]/[0.05] blur-3xl" />

            <div className="relative">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/35 dark:text-white/25">Live Preview</p>
                  <p className="mt-1 text-[10px] text-black/25 dark:text-white/20">Updates as you type</p>
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/[0.03] dark:bg-white/[0.04]">
                  <Code2 size={13} className="text-black/30 dark:text-white/25" />
                </div>
              </div>

              <div className="rounded-2xl border border-black/[0.06] bg-black/[0.02] p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFAA00]/10">
                    <Code2 size={16} className="text-[#FFAA00]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-black/80 dark:text-white/75">{previewTitle}</p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-[10px] text-black/35 dark:text-white/25">{languageLabels[language]}</span>
                      <span className="text-black/15 dark:text-white/10">•</span>

                      <span className={`flex items-center gap-1 text-[10px] ${visibility === "public" ? "text-emerald-500" : "text-[#FFAA00]"}`}>
                        {visibility === "public" ? <Globe2 size={10} /> : <Lock size={10} />}
                        {visibility === "public" ? "Public" : "Private"}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 line-clamp-3 text-[11px] leading-5 text-black/40 dark:text-white/25">{description.trim() || "Your program description will appear here."}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-black/[0.08] bg-white/5 p-5 shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFAA00]/10">
                <Sparkles size={14} className="text-[#FFAA00]" />
              </div>

              <div>
                <p className="text-xs font-semibold text-black/75 dark:text-white/70">What happens next?</p>
                <p className="mt-0.5 text-[10px] text-black/35 dark:text-white/25">Your workspace after creation</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {["Program is created", "Code editor opens", "Write and run your code", "Use AI coding assistance", "Save and push to GitHub"].map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                    {index !== 4 && <div className="absolute left-1/2 top-5 h-[calc(100%+16px)] w-px -translate-x-1/2 bg-black/[0.06] dark:bg-white/[0.06]" />}

                    <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border border-black/[0.06] bg-black/[0.035] dark:border-white/[0.06] dark:bg-white/[0.04]">
                      <span className="text-[8px] font-semibold text-black/40 dark:text-white/30">{index + 1}</span>
                    </div>
                  </div>

                  <p className="pt-0.5 text-[11px] leading-4 text-black/45 dark:text-white/30">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-black/[0.06] bg-black/[0.015] px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.015]">
            <Info size={14} className="mt-0.5 shrink-0 text-black/30 dark:text-white/20" />
            <p className="text-[10px] leading-4 text-black/40 dark:text-white/25">You can change the title, description, and visibility later from the program details page.</p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default NewProgramForm;
