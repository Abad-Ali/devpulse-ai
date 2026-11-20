"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftRight, Camera, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Features from "./Features";
import Scanner from "./Scanner";
import Gallery from "./Gallery";

export type ScannerMode = "scanner" | "gallery";

const QRScannerPage = () => {
  const [mode, setMode] = useState<ScannerMode>("scanner");

  const switchMode = (nextMode: ScannerMode) => {
    setMode(nextMode);
  };

  return (
    <main className="w-full min-w-0 px-3 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Main mode buttons */}
        <div className="mb-5 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/50 p-1">
            <button type="button" onClick={() => switchMode("scanner")} aria-pressed={mode === "scanner"} className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${mode === "scanner" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              <Camera className="size-4"/>
              Scanner
            </button>

            <button type="button" onClick={() => switchMode("gallery")} aria-pressed={mode === "gallery"} className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${mode === "gallery" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              <ImageIcon className="size-4"/>
              Gallery
            </button>
          </div>
        </div>

        {/* Child component changes according to mode */}
        <div className="mx-auto w-full max-w-xl [perspective:1200px]">
          <AnimatePresence mode="wait" initial={false}>
            {mode === "scanner" ? (
              <motion.div key="scanner" initial={{ opacity: 0, rotateY: -60, scale: 0.98 }} animate={{ opacity: 1, rotateY: 0, scale: 1 }} exit={{ opacity: 0, rotateY: 60, scale: 0.98 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
                <Scanner mode={mode}/>
              </motion.div>
            ) : (
              <motion.div key="gallery" initial={{ opacity: 0, rotateY: 60, scale: 0.98 }} animate={{ opacity: 1, rotateY: 0, scale: 1 }} exit={{ opacity: 0, rotateY: -60, scale: 0.98 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
                <Gallery mode={mode}/>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secondary switch button */}
          <div className="mt-4 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                switchMode(
                  mode === "scanner" ? "gallery" : "scanner"
                )
              }
              className="h-11 rounded-full px-5">
              {mode === "scanner" ? (
                <>
                  <ImageIcon className="mr-2 size-4"/>
                  Switch to Gallery
                </>
              ) : (
                <>
                  <Camera className="mr-2 size-4"/>
                  Switch to Scanner
                </>
              )}

              <ArrowLeftRight className="ml-3 size-4 text-muted-foreground"/>
            </Button>
          </div>
        </div>

        <Features/>
      </div>

      {/* Shared live-camera styles */}
      <style jsx global>{`
        #qr-reader {
          width: 100%;
          border: 0 !important;
        }

        #qr-reader video {
          display: block;
          width: 100% !important;
          height: auto !important;
          object-fit: cover;
        }

        #qr-reader__scan_region {
          min-height: 0 !important;
        }

        #qr-reader__scan_region img {
          display: none !important;
        }

        #qr-reader__dashboard {
          padding: 8px;
          color: white;
        }

        #qr-reader__dashboard button {
          margin: 4px;
          border-radius: 8px;
          padding: 6px 10px;
        }

        #qr-reader__status_span {
          color: white;
        }
      `}</style>
    </main>
  );
};

export default QRScannerPage;