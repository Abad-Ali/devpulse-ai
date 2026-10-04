"use client";
import Image from "next/image";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { connectGitHub } from "@/lib/api/github.api";

const GitHubConnect = () => {
  const [loading, setLoading] = useState(false);

  const connectHandler = async () => {
    setLoading(true);
    try {
      await connectGitHub();
    } catch (error) {
      toast.error("Integrating github failed.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="group flex items-center justify-center">
        <div className="flex items-center gap-5">
          <div className="flex size-16 items-center justify-center scale-150 group-hover:scale-125 duration-300">
            <Image src="/assets/github.svg" alt="GitHub" width={48} height={48} className="invert dark:invert-0" priority/>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-border" />
            <ArrowRight className="size-4 text-muted-foreground" />
            <span className="h-px w-8 bg-border" />
          </div>

          <div className="flex size-16 items-center justify-center scale-150 group-hover:scale-125 duration-300">
            <Image src="/assets/logo.png" alt="DevPulse AI" width={50} height={50} className="size-13 object-contain bg-black p-1.5 rounded-2xl border" priority/>
          </div>
        </div>
      </div>

      <div className="mt-7 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          GitHub Integration
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Bring GitHub into your workspace
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
          Connect your GitHub account to seamlessly work with repositories
          and publish your DevPulse programs.
        </p>
      </div>

      <div className="mx-auto mt-9 grid max-w-xl grid-cols-3 border-y border-border/60">
        <div className="px-4 py-5 text-center">
          <div className="mx-auto flex size-7 items-center justify-center rounded-full bg-foreground/10">
            <Check className="size-3.5"/>
          </div>

          <p className="mt-3 text-sm font-medium">
            Create
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Create repositories for your programs.
          </p>
        </div>

        <div className="border-x border-border/60 px-4 py-5 text-center">
          <div className="mx-auto flex size-7 items-center justify-center rounded-full bg-foreground/10">
            <Check className="size-3.5"/>
          </div>

          <p className="mt-3 text-sm font-medium">
            Push
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Push your code directly to GitHub.
          </p>
        </div>

        <div className="px-4 py-5 text-center">
          <div className="mx-auto flex size-7 items-center justify-center rounded-full bg-foreground/10">
            <Check className="size-3.5"/>
          </div>

          <p className="mt-3 text-sm font-medium">
            Manage
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Manage connected repositories.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <Button type="button" size="lg" onClick={connectHandler} disabled={loading} className="h-11 min-w-52 cursor-pointer rounded-xl">
          {loading ? (
              <>
                <Loader2 className="size-[18px] animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Image src="/assets/github.svg" alt="GitHub" width={18} height={18} className="size-[18px] dark:invert"/>
                Integration GitHub
              </>
            )
          }
        </Button>
      
        <p className="mt-3 text-xs text-muted-foreground">
          You'll be redirected to GitHub to authorize DevPulse AI.
        </p>
      </div>
    </div>
  );
};

export default GitHubConnect;