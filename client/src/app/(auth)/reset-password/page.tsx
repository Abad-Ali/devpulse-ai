"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { LockKeyhole, Eye, EyeOff, ArrowLeft, ArrowRight, LoaderCircle, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";
import MountainBackground from "@/app/components/background/MountainBackground";
import AccountHelpAssistant from "@/app/components/auth/AccountHelpAssistant";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Password reset token is missing. Please request a new reset link.");
      return;
    }
    if (!password || !confirmPassword) {
      setError("Please complete both password fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, { token, password }, { headers: { "Content-Type": "application/json" } });
      if (resp.data.success) {
        setSuccess(true);
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(resp.data.message || "Unable to reset your password.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Your reset link is invalid or has expired. Please request a new one.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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

          {success ? (
            <>
              <div className="mb-7 text-center">

                <div className="mb-5 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10">
                    <CheckCircle2 className="size-8 text-green-400"/>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                  Password reset successful!
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  Your password has been updated successfully. You can now sign in using your new password.
                </p>
              </div>

              <div role="status" className="mb-5 flex gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-400"/>

                <p className="text-xs leading-5 text-green-400/70">
                  Your account password has been changed successfully.
                </p>
              </div>

              <Link href="/login" className="block">
                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF7700] to-[#FFAA00] text-sm font-semibold text-black transition hover:brightness-110 cursor-pointer">
                  Continue to login
                  <ArrowRight className="size-4"/>
                </button>
              </Link>
            </>
          ) : !token ? (
            <>
              <div className="mb-7 text-center">

                <div className="mb-5 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                    <AlertCircle className="size-8 text-red-400"/>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                  Invalid reset link
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  The password reset token is missing. Please request a new password reset link to continue.
                </p>
              </div>

              <Link href="/forgot-password" className="block">
                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF7700] to-[#FFAA00] text-sm font-semibold text-black transition hover:brightness-110 cursor-pointer">
                  Request a new reset link
                  <ArrowRight className="size-4"/>
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="mb-7 text-center">

                <div className="mb-5 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FFAA00]/20 bg-gradient-to-br from-[#FF7700]/10 to-[#FFDD00]/10">
                    <KeyRound className="size-7 text-[#FFAA00]"/>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                  Create a new password
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  Choose a strong password for your DevPulse AI account. Make sure it's something you haven't used before.
                </p>
              </div>

              {error && (
                <div role="alert" className="mb-5 flex gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                  <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400"/>

                  <p className="text-xs leading-5 text-red-400">
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label htmlFor="password" className="mb-2 block text-xs font-medium text-white/70">
                    New password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/35"/>

                    <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" autoComplete="new-password" required minLength={8} disabled={loading} className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#FFAA00]/50 focus:ring-2 focus:ring-[#FFAA00]/10 disabled:opacity-50"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white/80 cursor-pointer" aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? (
                        <EyeOff className="size-4"/>
                      ) : (
                        <Eye className="size-4"/>
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-[11px] text-white/30">
                    Password must contain at least 8 characters.
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-xs font-medium text-white/70">
                    Confirm new password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/35"/>

                    <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" autoComplete="new-password" required disabled={loading} className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#FFAA00]/50 focus:ring-2 focus:ring-[#FFAA00]/10 disabled:opacity-50"/>

                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white/80 cursor-pointer" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                      {showConfirmPassword ? (
                        <EyeOff className="size-4"/>
                      ) : (
                        <Eye className="size-4"/>
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading || !password || !confirmPassword} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF7700] to-[#FFAA00] text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                  {loading ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin"/>
                      Resetting password...
                    </>
                  ) : (
                    <>
                      Reset password
                      <ArrowRight className="size-4"/>
                    </>
                  )}
                </button>

              </form>
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
          Secure account recovery powered by DevPulse AI.
        </p>

      </div>

      <AccountHelpAssistant/>

    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#2A2C32] text-white">
          <LoaderCircle className="size-7 animate-spin text-[#FFAA00]"/>
        </main>
      }
    >
      <ResetPasswordContent/>
    </Suspense>
  );
}
