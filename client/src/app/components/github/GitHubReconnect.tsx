"use client";
import Image from "next/image";
import { AlertCircle, ArrowRight, Check, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { connectGitHub, reconnectGitHub } from "@/lib/api/github.api";
import axios from "axios";

const GitHubReconnect = () => {
    const [loading, setLoading] = useState(false);

    const reconnectHandler = async () => {
       setLoading(true);
   
       try {
          const resp = await reconnectGitHub();
    
          if (resp?.success) {
            toast.success(resp.message || "GitHub account reconnected successfully.");
          }
       } catch (error) {
           if (axios.isAxiosError(error)) {
              const message = error.response?.data?.message || "Unable to reconnect GitHub.";
              toast.error(message);
            } else {
              toast.error("Something went wrong. Please try again.");
            }
       } finally {
         setLoading(false);
       }
    };

   const connectHandler = async () => {
       setLoading(true);
       try {
           await connectGitHub();
        } catch (error) {
           toast.error("Integrating github failed.");
        } finally {
           setLoading(false);
        }
    };  

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
          Reconnect your GitHub account
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
          Your GitHub account is already connected to DevPulse AI. Reconnect it
          to restore access to your repositories.
        </p>
      </div>

      <div className="mx-auto mt-9 max-w-xl border-y border-border/60">
        <div className="grid grid-cols-2">
          <div className="px-5 py-5 text-center">
            <div className="mx-auto flex size-8 items-center justify-center rounded-full bg-emerald-500/10">
              <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
            </div>

            <p className="mt-3 text-sm font-medium">Existing connection</p>

            <p className="mx-auto mt-1.5 max-w-[190px] text-xs leading-5 text-muted-foreground">
              Your GitHub connection is saved and can be restored.
            </p>
          </div>

          <div className="border-l border-border/60 px-5 py-5 text-center">
            <div className="mx-auto flex size-8 items-center justify-center rounded-full bg-amber-500/10">
              <AlertCircle className="size-4 text-amber-600 dark:text-amber-400" />
            </div>

            <p className="mt-3 text-sm font-medium">Refresh token expired?</p>

            <p className="mx-auto mt-1.5 max-w-[190px] text-xs leading-5 text-muted-foreground">
              If expired or revoked, GitHub must be integrated again.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <Button type="button" size="lg" onClick={reconnectHandler} disabled={loading} className="h-11 flex-1 cursor-pointer rounded-xl">
            {loading ? 
                (
                  <>
                    <Loader2 className="size-[18px] animate-spin" />
                    Reconnecting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-[18px]" />
                    Reconnect GitHub
                  </>
                )
            }
          </Button>

          <Button type="button" size="lg" variant="outline" onClick={connectHandler} disabled={loading} className="h-11 flex-1 cursor-pointer rounded-xl">
            <Image src="/assets/github.svg" alt="GitHub" width={17} height={17} className="size-[17px] invert dark:invert-0"/>
            Integrate Again
          </Button>
        </div>

        <p className="mt-5 text-center text-[11px] text-muted-foreground">
          Try reconnecting first. A new GitHub authorization is only needed if your refresh token has expired or been revoked.
        </p>
      </div>
    </div>
  );
};

export default GitHubReconnect;
