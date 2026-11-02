"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { Mail, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import MountainBackground from "@/app/components/background/MountainBackground";
import AccountHelpAssistant from "@/app/components/auth/AccountHelpAssistant";

export default function ResendVerificationPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleResend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification`, { email: email.trim() }, { headers: { "Content-Type": "application/json",} });
      setSuccess(resp.data.message);
      setEmail("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Unable to resend verification email. Please try again.");
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
            <h2 className="text-2xl font-semibold tracking-tight">
              Resend verification email
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Enter the email address associated with your DevPulse AI
              account. We'll send you a new verification link.
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
            <form onSubmit={handleResend} className="space-y-5">

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
                    <RefreshCw className="size-4 animate-spin"/>
                    Sending verification email...
                  </>
                ) : (
                  <>
                    Resend verification email
                    <RefreshCw className="size-4"/>
                  </>
                )}
              </button>

            </form>
          )}

          {success && (
            <button type="button"
              onClick={() => {
                setSuccess("");
                setError("");
              }}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white/80 transition hover:bg-white/10 cursor-pointer">
              <RefreshCw className="size-4"/>
              Try another email
            </button>
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

      <AccountHelpAssistant />

    </main>
  );
}
