"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, Check, ExternalLink, Loader2, ScanQrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ScannerMode } from "./QRScannerPage";

type Props = {
  mode: ScannerMode;
};

type CameraStatus = "starting" | "active" | "error" | "idle";

function validateDecodedUrl(text: string): string | null {
  try {
    const url = new URL(text.trim());

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    if (url.username || url.password) {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}

const Scanner = ({ mode }: Props) => {
  const [cameraStatus, setCameraStatus] =
    useState<CameraStatus>("starting");
  const [error, setError] = useState("");
  const [scannedText, setScannedText] = useState("");
  const [decodedUrl, setDecodedUrl] = useState<string | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannedRef = useRef(false);
  const cleanupPromiseRef = useRef<Promise<void>>(Promise.resolve());

  const resetResults = useCallback(() => {
    setScannedText("");
    setDecodedUrl(null);
    setError("");
  }, []);

  const stopScanner = useCallback(async (scanner: Html5Qrcode) => {
    try {
      if (scanner.isScanning) {
        await scanner.stop();
      }
    } catch {
      // Continue cleanup.
    }

    try {
      scanner.clear();
    } catch {
      // Scanner may already be cleared.
    }

    if (scannerRef.current === scanner) {
      scannerRef.current = null;
    }
  }, []);

  const handleScan = useCallback((text: string) => {
    if (scannedRef.current) return;

    scannedRef.current = true;
    setScannedText(text);
    setError("");

    const url = validateDecodedUrl(text);

    if (!url) {
      setDecodedUrl(null);
      setError("This QR code does not contain a valid website URL.");
      return;
    }

    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === window.location.hostname) {
      window.location.assign(parsedUrl.href);
      return;
    }

    setDecodedUrl(parsedUrl.href);
  }, []);

  useEffect(() => {
    if (mode !== "scanner") {
      setCameraStatus("idle");
      return;
    }

    let cancelled = false;
    let scanner: Html5Qrcode | null = null;
    let startPromise: Promise<void> | null = null;

    const startCamera = async () => {
      setCameraStatus("starting");
      resetResults();
      scannedRef.current = false;

      try {
        await cleanupPromiseRef.current;

        if (cancelled) return;

        if (!document.getElementById("qr-reader")) {
          throw new Error("QR scanner element is unavailable.");
        }

        scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        startPromise = scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            aspectRatio: 1,
            qrbox: (width, height) => {
              const size = Math.floor(Math.min(width, height) * 0.7);
              return { width: size, height: size };
            },
          },
          handleScan,
          () => {
            // No QR code found in this frame.
          }
        );

        await startPromise;

        if (cancelled) {
          await stopScanner(scanner);
          return;
        }

        setCameraStatus("active");
      } catch {
        if (!cancelled) {
          setCameraStatus("error");
          setError(
            "Could not start the camera. Check permissions, use HTTPS, or try Gallery mode."
          );
        }

        if (scanner) {
          await stopScanner(scanner);
        }
      }
    };

    void startCamera();

    return () => {
      cancelled = true;

      cleanupPromiseRef.current = (async () => {
        if (startPromise) {
          try {
            await startPromise;
          } catch {
            // Startup may fail.
          }
        }

        if (scanner) {
          await stopScanner(scanner);
        }
      })();
    };
  }, [mode, handleScan, stopScanner, resetResults]);

  const resetScanner = () => {
    scannedRef.current = false;
    resetResults();
  };

  const openDecodedUrl = () => {
    if (!decodedUrl) return;

    const safeUrl = validateDecodedUrl(decodedUrl);

    if (!safeUrl) {
      setDecodedUrl(null);
      setError("This URL is not supported.");
      return;
    }

    window.location.assign(safeUrl);
  };

  return (
    <section aria-labelledby="scanner-title" className="overflow-hidden rounded-2xl border border-border/70 bg-background/80 shadow-xl shadow-black/[0.04] dark:shadow-black/20 sm:rounded-3xl">
      <div className="flex items-center gap-3 border-b border-border/60 px-4 py-4 sm:px-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/40">
          <Camera className="size-5"/>
        </div>

        <div className="min-w-0">
          <h2 id="scanner-title" className="text-sm font-semibold">
            Scan QR Code
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Point your camera at a QR code.
          </p>
        </div>
      </div>

      <div className="p-4 text-center sm:p-6">
        <p className="mb-4 text-sm text-muted-foreground">
          Keep the QR code inside the scanning area.
        </p>

        <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border/60 bg-black">
          <div id="qr-reader" className="qr-reader w-full" aria-label="Live QR code camera preview"/>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground" role="status" aria-live="polite">
          {cameraStatus === "starting" && (
            <Loader2 className="size-3.5 animate-spin"/>
          )}

          <span className={`size-2 rounded-full ${cameraStatus === "active" ? "bg-emerald-500" : cameraStatus === "error" ? "bg-destructive" : "bg-muted-foreground/50"}`}/>

          {cameraStatus === "active" ? "Camera active" : cameraStatus === "error" ? "Camera unavailable" : "Starting camera..."}
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {scannedText && (
          <div className="mt-5 rounded-xl border border-border/60 bg-muted/30 p-4 text-left">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Check className="size-4 text-emerald-500"/>
              QR code detected
            </p>

            <p className="mt-2 break-all text-sm text-muted-foreground">
              {scannedText}
            </p>

            {decodedUrl && (
              <Button type="button" className="mt-3 w-full" onClick={openDecodedUrl}>
                <ExternalLink className="mr-2 size-4"/>
                Open website
              </Button>
            )}

            <Button type="button" variant="outline" className="mt-3 w-full" onClick={resetScanner}>
              <ScanQrCode className="mr-2 size-4"/>
              Scan again
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Scanner;
