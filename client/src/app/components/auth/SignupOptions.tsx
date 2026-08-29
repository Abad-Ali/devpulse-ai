"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { oauthLogin } from "@/lib/api/auth.api";

interface SignupOptionsProps {
  onEmailSignup: () => void;
}

const SignupOptions = ({ onEmailSignup }: SignupOptionsProps) => {
  return (
    <Card className="border-white/[0.1] bg-[#15171B]/80 text-white shadow-2xl backdrop-blur-2xl">
      <CardHeader className="space-y-2 pb-5 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Create your account
        </h2>

        <p className="mx-auto max-w-md text-sm leading-6 text-white/50">
          Build, run, and understand your code with DevPulse AI.
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <Button type="button" onClick={() => oauthLogin("google")} className="h-11 w-full border border-white/[0.1] bg-white text-[#2A2C32] shadow-none transition duration-200 hover:bg-white/90 cursor-pointer">
            <img src="/assets/google.svg" alt="google" className="h-5 w-5 object-contain"/>
            Continue with Google
          </Button>

          <Button type="button" onClick={() => oauthLogin("github")} className="h-11 w-full border border-white/[0.1] bg-white/[0.04] text-white shadow-none transition duration-200 hover:border-white/[0.18] hover:bg-white/[0.07] cursor-pointer">
            <img src="/assets/github.svg" alt="github" className="h-5 w-5 object-contain"/>
            Continue with GitHub
          </Button>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-black/40 backdrop-blur-xl border border-white/10 p-2.5 rounded-full text-[11px] font-medium uppercase tracking-[0.15em] text-white/50">
                Or
              </span>
            </div>
          </div>

          <Button type="button" onClick={onEmailSignup} className="group h-11 w-full border-0 bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] font-semibold text-[#2A2C32] transition duration-200 hover:brightness-110 cursor-pointer">
            <Mail size={20} strokeWidth={2.7}/>
            Continue with email
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1"/>
          </Button>
        </div>

        <p className="mt-5 text-center text-sm text-white/40">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-[#FFAA00] transition-colors hover:text-[#FFDD00] cursor-pointer">
            Sign in
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignupOptions;