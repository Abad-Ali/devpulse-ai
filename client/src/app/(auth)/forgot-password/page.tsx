"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import axios from "axios";
import { Mail, ArrowLeft, ArrowRight, LoaderCircle, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";
import MountainBackground from "@/app/components/background/MountainBackground";
import AccountHelpAssistant from "@/app/components/auth/AccountHelpAssistant";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, { email: email.trim() }, {headers: { "Content-Type": "application/json" }});
      setSuccess(resp.data.message || "If an account exists with this email, a password reset link has been sent.");
      setEmail("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Unable to send password reset email. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#2A2C32] px-5 py-12 text-white">
      <MountainBackground />
      <div className="pointer-events-none absolute inset-0 bg-[#0f1013]/50" />
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
          <div className="mb-7 text-center">
            <div className="mb-5 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FFAA00]/20 bg-gradient-to-br from-[#FF7700]/10 to-[#FFDD00]/10">
                <KeyRound className="size-7 text-[#FFAA00]"/>
              </div>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight">
              Forgot your password?
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Don't worry, it happens. Enter the email address associated with your DevPulse AI account and we'll send you a link to reset your password.
            </p>
          </div>

          {success && (
            <div role="status" className="mb-5 flex gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-400"/>
              <div>
                <p className="text-sm font-medium text-green-400">
                  Request successful
                </p>

                <p className="mt-1 text-xs leading-5 text-green-400/70">
                  {success}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div role="alert" className="mb-5 flex gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400"/>

              <p className="text-xs leading-5 text-red-400">
                {error}
              </p>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-medium text-white/70">
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/35"/>
                  <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" autoComplete="email" required maxLength={254} disabled={loading} className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#FFAA00]/50 focus:ring-2 focus:ring-[#FFAA00]/10 disabled:opacity-50"/>
                </div>
              </div>

              <button type="submit" disabled={loading || !email.trim()} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF7700] to-[#FFAA00] text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                {loading ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin"/>
                    Sending reset link...
                  </>
                ) : (
                  <>
                    Send password reset link
                    <ArrowRight className="size-4"/>
                  </>
                )}
              </button>

            </form>
          )}

          {success && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-[#FFAA00]" />

                  <p className="text-xs leading-5 text-white/50">
                    If you don't see the email, check your spam or junk folder. The reset link expires after 5 minutes.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSuccess("");
                  setError("");
                }}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white/80 transition hover:bg-white/10 cursor-pointer">
                Try another email
              </button>

            </div>
          )}

          <div className="mt-7 border-t border-white/10 pt-5">
            <Link href="/login" className="flex items-center justify-center gap-2 text-xs font-medium text-white/45 transition hover:text-[#FFAA00]">
              <ArrowLeft className="size-4"/>
              Back to login
            </Link>
          </div>

        </div>

        <p className="mt-6 text-center text-[10px] text-white/25">
          Secure account recovery powered by DevPulse AI.
        </p>

      </div>

      <AccountHelpAssistant/>
    </main>
  );
}
