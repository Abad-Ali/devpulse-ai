"use client";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Check, ExternalLink, FileImage, Loader2, ScanQrCode, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ScannerMode } from "./QRScanner";

type Props = {
  mode: ScannerMode;
};

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
]);

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

const Gallery = ({ mode }: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState("");
  const [scannedText, setScannedText] = useState("");
  const [decodedUrl, setDecodedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<string | null>(null);
  const imageScanIdRef = useRef(0);
  const modeRef = useRef(mode);

  modeRef.current = mode;

  const resetResults = () => {
    setScannedText("");
    setDecodedUrl(null);
    setError("");
  };

  const revokePreviewUrl = () => {
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
      imageUrlRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      imageScanIdRef.current += 1;
      revokePreviewUrl();
    };
  }, []);

  const handleFile = (file?: File) => {
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      setError("Choose a JPEG, PNG, WebP, GIF, or BMP image.");
      return;
    }

    if (file.size === 0) {
      setError("The selected image is empty.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image must be 10 MB or smaller.");
      return;
    }

    imageScanIdRef.current += 1;
    revokePreviewUrl();

    const url = URL.createObjectURL(file);
    imageUrlRef.current = url;

    setSelectedImage(file);
    setPreviewUrl(url);
    setIsDragging(false);
    resetResults();
  };

  const removeImage = () => {
    imageScanIdRef.current += 1;
    revokePreviewUrl();

    setSelectedImage(null);
    setPreviewUrl(null);
    setIsDragging(false);
    resetResults();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const scanImage = async () => {
    if (!selectedImage || isDecoding) return;

    const file = selectedImage;
    const scanId = ++imageScanIdRef.current;

    setIsDecoding(true);
    resetResults();

    let imageScanner: Html5Qrcode | null = null;

    try {
      imageScanner = new Html5Qrcode("qr-image-reader");

      const result = await imageScanner.scanFile(file, false);

      if (scanId !== imageScanIdRef.current || modeRef.current !== "gallery") {
        return;
      }

      setScannedText(result);

      const url = validateDecodedUrl(result);

      if (!url) {
        setDecodedUrl(null);
        setError("This QR code does not contain a valid website URL.");
        return;
      }

      const parsedUrl = new URL(url);

      if (parsedUrl.hostname === window.location.hostname) {
        window.location.assign(parsedUrl.href);
      } else {
        setDecodedUrl(parsedUrl.href);
      }
    } catch {
      if (scanId === imageScanIdRef.current && modeRef.current === "gallery") {
        setError("Could not decode a QR code. Try a clearer image with the full QR code visible.");
      }
    } finally {
      try {
        imageScanner?.clear();
      } catch {
        // Ignore cleanup errors.
      }

      setIsDecoding(false);
    }
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
    <section aria-labelledby="gallery-title" className="overflow-hidden rounded-2xl border border-border/70 bg-background/80 shadow-xl shadow-black/[0.04] dark:shadow-black/20 sm:rounded-3xl">
      <div className="flex items-center gap-3 border-b border-border/60 px-4 py-4 sm:px-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/40">
          <FileImage className="size-5"/>
        </div>

        <div className="min-w-0">
          <h2 id="gallery-title" className="text-sm font-semibold">
            Scan from Gallery
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Choose an image containing a QR code.
          </p>
        </div>
      </div>

      <div className="p-4 text-center sm:p-6">
        <h3 className="text-base font-semibold">
          Choose a QR code image
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Browse your files or drop an image below. Maximum size: 10 MB.
        </p>

        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" className="sr-only" aria-label="Choose a QR code image"
          onChange={(event) => {
            handleFile(event.target.files?.[0]);
            event.target.value = "";
          }}/>

        <div role="button" tabIndex={0} aria-label="Choose or drop a QR code image" aria-disabled={isDecoding}
          onClick={() => {
            if (!isDecoding) fileInputRef.current?.click();
          }}
          onKeyDown={(event) => {
            if (!isDecoding && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
            if (!isDecoding) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);

            if (!isDecoding) {
              handleFile(event.dataTransfer.files?.[0]);
            }
          }}
          className={`mt-5 flex min-h-60 w-full flex-col items-center justify-center rounded-2xl border border-dashed p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-72 ${isDecoding ? "cursor-not-allowed opacity-60" : "cursor-pointer"} ${isDragging ? "border-foreground bg-muted/60" : "border-border/80 bg-muted/20 hover:bg-muted/40"}`}>
          {previewUrl ? (
            <>
              <img src={previewUrl} alt="Selected QR code image" className="max-h-64 max-w-full rounded-xl object-contain"/>

              <p className="mt-3 max-w-full truncate text-sm font-medium">
                {selectedImage?.name}
              </p>

              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Check className="size-3"/>
                Image selected
              </p>
            </>
          ) : (
            <>
              <Upload className="mb-4 size-7"/>
              <p className="text-sm font-medium">
                Drop your image here
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Or click to browse files
              </p>
            </>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {previewUrl && (
          <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
            <Button type="button" disabled={isDecoding} onClick={() => void scanImage()}>
              {isDecoding ? (
                <Loader2 className="mr-2 size-4 animate-spin"/>
              ) : (
                <ScanQrCode className="mr-2 size-4"/>
              )}

              {isDecoding ? "Decoding..." : "Decode QR Code"}
            </Button>

            <Button type="button" variant="outline" onClick={removeImage} disabled={isDecoding}>
              <X className="mr-2 size-4"/>
              Remove image
            </Button>
          </div>
        )}

        {scannedText && (
          <div className="mt-5 break-all rounded-xl border border-border/60 bg-muted/30 p-4 text-left">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Check className="size-4 text-emerald-500"/>
              QR code detected
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              {scannedText}
            </p>

            {decodedUrl && (
              <Button type="button" className="mt-3 w-full" onClick={openDecodedUrl}>
                <ExternalLink className="mr-2 size-4"/>
                Open website
              </Button>
            )}
          </div>
        )}

        <div id="qr-image-reader" className="sr-only" aria-hidden="true"/>
      </div>
    </section>
  );
};

export default Gallery;
