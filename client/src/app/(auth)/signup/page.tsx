'use client';
import Image from "next/image";
import Link from "next/link";
import MountainBackground from "@/app/components/background/MountainBackground";
import EmailSignup from "@/app/components/auth/EmailSignup";
import SignupOptions from "@/app/components/auth/SignupOptions";
import { useState } from "react";

export default function SignupPage() {
  const [showEmailSignup, setShowEmailSignup] = useState(false);
  
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#2A2C32] px-5 py-8 text-white sm:py-10">
      <MountainBackground />

      <div className="pointer-events-none absolute inset-0 bg-[#0f1013]/50" />
      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-6 text-center">
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
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
            Code. Execute. Understand.
          </p>
        </div>

        {showEmailSignup ? (
            <EmailSignup onBack={() => setShowEmailSignup(false)}/>
          ) : (
            <SignupOptions onEmailSignup={() => setShowEmailSignup(true)}/>
          )
        }
      </div>
    </main>
  );
}
