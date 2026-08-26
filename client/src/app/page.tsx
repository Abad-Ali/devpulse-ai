"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Code2, LayoutDashboard, LogIn, UserPlus } from "lucide-react";
import MountainBackground from "./components/background/MountainBackground";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import Features from "./components/home/Features";
import HowItWorks from "./components/home/HowItWorks";
import About from "./components/home/About";
import FinalCTA from "./components/home/FinalCTA";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#2A2C32] text-white">
      <MountainBackground />

      <Navbar/>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-27">
        <div className="mx-auto w-full max-w-5xl text-center">

          <div className="mb-8 flex justify-center">
            <Image src="/assets/logo.png" alt="DevPulse AI" width={110} height={110} priority className="h-auto w-20 sm:w-24 md:w-28"/>
          </div>

          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FF7700]" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFAA00] sm:text-sm">
              Code. Execute. Understand.
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#FF7700]" />
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Build, Run &{" "}
            <span className="bg-gradient-to-r from-[#FF2200] via-[#FF7700] via-[#FFAA00] to-[#FFDD00] bg-clip-text text-transparent">
              Learn
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg md:text-xl">
            DevPulse AI is your intelligent coding workspace for writing, running, understanding, and improving your code — all in one place.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {isLoggedIn ? (
              <>
                <button type="button" className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-7 py-3.5 font-bold text-[#2A2C32] transition duration-200 hover:brightness-110 sm:w-auto">
                  <Code2 size={20} strokeWidth={2.5}/>
                  <span>Start Coding</span>
                  <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5"/>
                </button>

                <button type="button" className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-[#2A2C32]/50 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition duration-200 hover:border-[#FFAA00]/60 hover:bg-[#2A2C32]/70 sm:w-auto">
                  <LayoutDashboard size={19} className="text-[#FFAA00]"/>
                  <span>Go to Dashboard</span>
                </button>
              </>
            ) : (
              <>
                <button type="button" className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-7 py-3.5 font-bold text-[#2A2C32] transition duration-200 hover:brightness-110 sm:w-auto">
                  <UserPlus size={20} strokeWidth={2.5}/>
                  <span>Create Your Account</span>
                  <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5"/>
                </button>

                <button type="button" className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-[#2A2C32]/50 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition duration-200 hover:border-[#FFAA00]/60 hover:bg-[#2A2C32]/70 sm:w-auto">
                  <LogIn size={19} className="text-[#FFAA00]"/>
                  <span>Login</span>
                </button>
              </>
            )}
          </div>

          <p className="mt-10 text-sm text-white/45">
            Your code. Your progress. Your pulse.
          </p>
        </div>
      </section>
      <Features/>
      <HowItWorks/>
      <About/>
      <FinalCTA/>
      <Footer/>
    </main>
  );
}