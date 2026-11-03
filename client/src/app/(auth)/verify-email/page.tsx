"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight, Mail, MailCheck, LoaderCircle, CheckCircle2, AlertCircle } from "lucide-react";
import MountainBackground from "@/app/components/background/MountainBackground";
import AccountHelpAssistant from "@/app/components/auth/AccountHelpAssistant";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#2A2C32] text-white">
          <LoaderCircle className="size-7 animate-spin text-[#FFAA00]"/>
        </main>
      }>
      <VerifyEmailContent/>
    </Suspense>
  );
}

function VerifyEmailContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const verifyEmail = async () => {
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing. Please open the verification link from your email.");
        return;
      }

      try {
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {params: { token }, headers: {"Content-Type": "application/json"}});
        if (cancelled) return;
        setStatus("success");
        setMessage(resp.data.message || "Your email has been verified successfully.");
      } catch (err) {
        if (cancelled) return;
        setStatus("error");

        if (axios.isAxiosError(err)) {
          setMessage(err.response?.data?.message || "Your verification link is invalid or has expired.");
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      }
    };

    verifyEmail();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#2A2C32] px-5 py-12 text-white">
      <MountainBackground/>
      <div className="pointer-events-none absolute inset-0 bg-[#0f1013]/50"/>
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" aria-label="DevPulse AI home" className="group inline-flex gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#15171B]/75 backdrop-blur-xl transition duration-200 group-hover:border-[#FFAA00]/40">
              <Image src="/assets/logo.png" alt="DevPulse AI" width={52} height={52} priority className="h-12 w-12 object-contain"/>
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight">
              DevPulse{" "}
              <span className="bg-gradient-to-r from-[#FF7700] to-[#FFDD00] bg-clip-text text-transparent">
                AI
              </span>
            </h1>
          </Link>

          <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-white/35">
            Code. Execute. Understand.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#15171B]/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">

          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#FFAA00]/20 bg-gradient-to-br from-[#FF7700]/10 to-[#FFDD00]/10">

              {status === "loading" ? (
                <LoaderCircle className="size-8 animate-spin text-[#FFAA00]"/>
              ) : status === "success" ? (
                <MailCheck className="size-8 text-green-400"/>
              ) : (
                <Mail className="size-8 text-[#FFAA00]"/>
              )}

            </div>
          </div>

          <div className="mb-7 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              {status === "loading" ? "Verifying your email" : status === "success" ? "Email verified!" : "Verification failed"}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/45">
              {status === "loading" ? "Please wait while we securely verify your email address." : status === "success" ? "Your email address has been successfully verified. You're now ready to explore DevPulse AI." : "We couldn't verify your email address. Your verification link may be invalid, expired, or missing."}
            </p>
          </div>

          {status === "loading" && (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
              <LoaderCircle className="size-5 animate-spin text-[#FFAA00]"/>
              <p className="text-sm text-white/60">
                Checking your verification link...
              </p>
            </div>
          )}

          {status === "success" && (
            <>
              <div role="status" className="mb-5 flex gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-400" />

                <div>
                  <p className="text-sm font-medium text-green-400">
                    Verification successful
                  </p>
                  <p className="mt-1 text-xs leading-5 text-green-400/70">
                    {message}
                  </p>
                </div>
              </div>

              <Link href="/login" className="block">
                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF7700] to-[#FFAA00] text-sm font-semibold text-black transition hover:brightness-110 cursor-pointer">
                  Continue to login
                  <ArrowRight className="size-4"/>
                </button>
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div role="alert" className="mb-5 flex gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400"/>

                <div>
                  <p className="text-sm font-medium text-red-400">
                    Unable to verify email
                  </p>
                  <p className="mt-1 text-xs leading-5 text-red-400/70">
                    {message}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-center">
                <p className="text-xs leading-5 text-white/40">
                  Didn't receive the verification email?
                </p>

                <Link href="/resend-verification" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFAA00] transition hover:text-[#FFDD00]">
                  Resend verification email
                  <ArrowRight className="size-4"/>
                </Link>
              </div>
            </>
          )}

          <div className="mt-7 border-t border-white/10 pt-5">
            <Link href="/login" className="flex items-center justify-center gap-2 text-xs font-medium text-white/45 transition hover:text-[#FFAA00]">
              <ArrowLeft className="size-4"/>
              Back to login
            </Link>
          </div>

        </div>

        <p className="mt-6 text-center text-[10px] text-white/25">
          Secure account verification powered by DevPulse AI.
        </p>

      </div>

      <AccountHelpAssistant/>

    </main>
  );
}
