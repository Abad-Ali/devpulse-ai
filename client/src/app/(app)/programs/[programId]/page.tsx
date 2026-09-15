"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { ArrowUpRight, Check, Copy, Download, Edit3, FileCode2, Link2, Loader2, Play,  QrCode, Share2,  Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMyProgram, getProgramById,  type Program } from "@/lib/api/program.api";
import EditProgramDialog from "@/app/components/programs/EditProgramDialog";
import DeleteProgramDialog from "@/app/components/programs/DeleteProgramDialog";
import axios from "axios";
import { toast } from "sonner";

const getLanguageLabel = (language: Program["language"]) => {
  switch (language) {
    case "javascript":
      return "JavaScript";
    case "python":
      return "Python";
    case "cpp":
      return "C++";
    case "c":
      return "C";
    default:
      return language;
  }
};

const getFileExtension = (language: Program["language"]) => {
  switch (language) {
    case "javascript":
      return "js";
    case "python":
      return "py";
    case "cpp":
      return "cpp";
    case "c":
      return "c";
    default:
      return "txt";
  }
};

const formatDateTime = (value: string | null) => {
  if (!value) {
    return "Never";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

type ActionTileProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  danger?: boolean;
};

function ActionTile({
  icon,
  label,
  description,
  onClick,
  danger = false,
}: ActionTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group flex min-h-[104px] cursor-pointer flex-col justify-between rounded-[22px]",
        "border p-4 text-left transition-all duration-200",
        danger
          ? [
              "border-red-500/10 bg-red-500/[0.035]",
              "hover:border-red-500/20 hover:bg-red-500/[0.06]",
            ].join(" ")
          : [
              "border-black/[0.07] bg-black/[0.018]",
              "hover:border-[#FF7700]/25 hover:bg-[#FF7700]/[0.035]",
              "dark:border-white/[0.07] dark:bg-white/[0.025]",
              "dark:hover:border-[#FF7700]/25 dark:hover:bg-[#FF7700]/[0.05]",
            ].join(" "),
      ].join(" ")}
    >
      <div
        className={[
          "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
          danger
            ? "bg-red-500/10 text-red-500"
            : [
                "bg-black/[0.04] text-black/55",
                "group-hover:bg-[#FF7700]/10 group-hover:text-[#FF7700]",
                "dark:bg-white/[0.05] dark:text-white/50",
                "dark:group-hover:bg-[#FF7700]/10 dark:group-hover:text-[#FF7700]",
              ].join(" "),
        ].join(" ")}
      >
        {icon}
      </div>

      <div className="mt-3">
        <div
          className={[
            "text-[13px] font-semibold",
            danger
              ? "text-red-500"
              : "text-black/75 dark:text-white/75",
          ].join(" ")}
        >
          {label}
        </div>

        <div className="mt-0.5 text-[11px] leading-4 text-black/35 dark:text-white/30">
          {description}
        </div>
      </div>
    </button>
  );
}

type MetaItemProps = {
  label: string;
  value: string;
};

function MetaItem({ label, value }: MetaItemProps) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-black/30 dark:text-white/25">
        {label}
      </div>

      <div className="mt-1 truncate text-[13px] font-medium text-black/70 dark:text-white/70">
        {value}
      </div>
    </div>
  );
}

const ProgramDetailsPage= () => {
  const params = useParams();
  const router = useRouter();

  const programId = Array.isArray(params.programId)
    ? params.programId[0]
    : params.programId;

  const [program, setProgram] = useState<Program | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);

  useEffect(() => {
    if (!programId) {
      return;
    }

    const loadProgram = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProgramById(programId);
        setProgram(response.data);

        try {
          await getMyProgram(programId);
          setIsOwner(true);
        } catch {
          setIsOwner(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "Failed to update program.";
          toast.error(message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }

        setProgram(null);
        setIsOwner(false);
        setError("Program not found or you do not have permission to view it.");
      } finally {
        setLoading(false);
      }
    };

    loadProgram();
  }, [programId]);

  const publicUrl = useMemo(() => {
    if (!program) {
      return "";
    }

    if (typeof window === "undefined") {
      return `/programs/${program.id}`;
    }

    return `${window.location.origin}/programs/${program.id}`;
  }, [program]);

  const languageLabel = program ? getLanguageLabel(program.language as Program["language"]) : "";

  const fileExtension = program ? getFileExtension(program.language as Program["language"]) : "txt";

  const safeTitle = program?.title ?.trim() .replace(/[^a-zA-Z0-9-_ ]/g, "") .replace(/\s+/g, "-") || "program";

  const fileName = `${safeTitle}.${fileExtension}`;

  const lineCount = program?.code ? program.code.split("\n").length : 0;

  const handleCopyCode = async () => {
    if (!program?.code) {
      return;
    }

    await navigator.clipboard.writeText(program.code);
    setCopiedCode(true);

    setTimeout(() => {
      setCopiedCode(false);
    }, 1800);
  };

  const handleDownload = () => {
    if (!program?.code) {
      return;
    }

    const blob = new Blob([program.code], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  const handleCopyLink = async () => {
    if (!publicUrl) {
      return;
    }

    await navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);

    setTimeout(() => {
      setCopiedLink(false);
    }, 1800);
  };

  const handleShare = async () => {
    if (!program || !publicUrl) {
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: program.title,
        text: program.description,
        url: publicUrl,
      });

      return;
    }

    await handleCopyLink();
  };

  const handleRun = () => {
    if (!program) {
      return;
    }

    router.push(`/programs/editor/${program.id}`);
  };

  const handleOpenEditor = () => {
    if (!program) {
      return;
    }

    router.push(`/programs/editor/${program.id}`);
  };

  const handleEdit = () => {
    if (!program) {
      return;
    }

    setSelectedProgram(program);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    if (!program) {
      return;
    }

    setProgramToDelete(program);
    setDeleteDialogOpen(true);
  };

  const handleOpenPublicPage = () => {
    if (!program) {
      return;
    }

    router.push(`/programs/${program.id}`);
  };

  const handleShareQrImage = async () => {
    if (!program || !publicUrl) {
      return;
    }

    const qrSvg = document.querySelector(
      "#devpulse-program-qr svg",
    ) as SVGSVGElement | null;

    if (!qrSvg) {
      return;
    }

    const svgData = new XMLSerializer().serializeToString(qrSvg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });

    const svgUrl = URL.createObjectURL(svgBlob);

    const qrImage = new Image();
    const logoImage = new Image();

    const cleanup = () => {
      URL.revokeObjectURL(svgUrl);
    };

    qrImage.onload = () => {
      logoImage.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          cleanup();
          return;
        }

        const W = 900;
        const H = 1120;

        canvas.width = W;
        canvas.height = H;

        const roundRect = (
          x: number,
          y: number,
          width: number,
          height: number,
          radius: number,
        ) => {
          ctx.beginPath();
          ctx.roundRect(x, y, width, height, radius);
        };

        const drawGlass = (
          x: number,
          y: number,
          width: number,
          height: number,
          radius = 28,
        ) => {
          roundRect(x, y, width, height, radius);

          ctx.fillStyle = "rgba(255,255,255,0.035)";
          ctx.fill();

          ctx.strokeStyle = "rgba(255,255,255,0.12)";
          ctx.lineWidth = 1;
          ctx.stroke();
        };

        const centerText = (
          text: string,
          x: number,
          y: number,
          font: string,
          color: string,
        ) => {
          ctx.font = font;
          ctx.fillStyle = color;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(text, x, y);
        };

        ctx.fillStyle = "#08090B";
        ctx.fillRect(0, 0, W, H);

        const glow = ctx.createRadialGradient(
          W / 2,
          0,
          20,
          W / 2,
          0,
          360,
        );

        glow.addColorStop(0, "rgba(255,119,0,0.08)");
        glow.addColorStop(1, "rgba(255,119,0,0)");

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, 360);

        roundRect(45, 45, W - 90, H - 90, 38);

        ctx.fillStyle = "rgba(12,13,15,0.96)";
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const logoBoxX = 80;
        const logoBoxY = 82;
        const logoBoxSize = 72;

        ctx.beginPath();
        ctx.arc(
          logoBoxX + logoBoxSize / 2,
          logoBoxY + logoBoxSize / 2,
          logoBoxSize / 2,
          0,
          Math.PI * 2,
        );

        ctx.fillStyle = "#08090B";
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,0.20)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();

        ctx.beginPath();
        ctx.arc(
          logoBoxX + logoBoxSize / 2,
          logoBoxY + logoBoxSize / 2,
          24,
          0,
          Math.PI * 2,
        );

        ctx.clip();

        ctx.drawImage(logoImage, logoBoxX + 12, logoBoxY + 12, 48, 48);

        ctx.restore();

        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        ctx.font = "600 28px Inter, Arial, sans-serif";
        ctx.fillStyle = "#F5F5F5";
        ctx.fillText("DevPulse", 170, 108);

        ctx.font = "600 20px Inter, Arial, sans-serif";
        ctx.fillStyle = "#FF7700";
        ctx.fillText("AI", 170, 137);

        const badgeX = 650;
        const badgeY = 88;
        const badgeW = 165;
        const badgeH = 42;

        roundRect(badgeX, badgeY, badgeW, badgeH, badgeH / 2);

        ctx.fillStyle = "rgba(255,255,255,0.025)";
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          badgeX + 22,
          badgeY + badgeH / 2,
          5,
          0,
          Math.PI * 2,
        );

        ctx.fillStyle = "#FF7700";
        ctx.fill();

        ctx.textAlign = "left";
        ctx.font = "600 13px Inter, Arial, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.72)";
        ctx.fillText("PUBLIC PROGRAM", badgeX + 36, badgeY + 22);

        ctx.textAlign = "left";
        ctx.font = "700 52px Inter, Arial, sans-serif";
        ctx.fillStyle = "#FFFFFF";

        let title = program.title || "Untitled Program";

        if (title.length > 24) {
          title = title.slice(0, 23) + "…";
        }

        ctx.fillText(title, 80, 220);

        const description =
          program.description?.trim() || "A public DevPulse program";

        ctx.font = "400 20px Inter, Arial, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.52)";

        let descriptionText = description;

        if (descriptionText.length > 52) {
          descriptionText = descriptionText.slice(0, 51) + "…";
        }

        ctx.fillText(descriptionText, 80, 258);

        const qrCardX = 145;
        const qrCardY = 300;
        const qrCardSize = 610;

        drawGlass(qrCardX, qrCardY, qrCardSize, qrCardSize, 34);

        const qrPadding = 42;
        const qrX = qrCardX + qrPadding;
        const qrY = qrCardY + qrPadding;
        const qrSize = qrCardSize - qrPadding * 2;

        roundRect(qrX, qrY, qrSize, qrSize, 24);

        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        ctx.drawImage(
          qrImage,
          qrX + 4,
          qrY + 4,
          qrSize - 8,
          qrSize - 8,
        );

        const centerSize = 92;
        const centerX = W / 2 - centerSize / 2;
        const centerY = qrY + qrSize / 2 - centerSize / 2;

        ctx.beginPath();
        ctx.arc(
          W / 2,
          qrY + qrSize / 2,
          (centerSize + 14) / 2,
          0,
          Math.PI * 2,
        );

        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          W / 2,
          qrY + qrSize / 2,
          centerSize / 2,
          0,
          Math.PI * 2,
        );

        ctx.fillStyle = "#08090B";
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,0.20)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();

        ctx.beginPath();
        ctx.arc(
          W / 2,
          qrY + qrSize / 2,
          29,
          0,
          Math.PI * 2,
        );

        ctx.clip();

        ctx.drawImage(
          logoImage,
          centerX + 17,
          centerY + 17,
          58,
          58,
        );

        ctx.restore();

        centerText(
          "Scan to open this program",
          W / 2,
          950,
          "500 20px Inter, Arial, sans-serif",
          "rgba(255,255,255,0.58)",
        );

        roundRect(W / 2 - 35, 978, 70, 4, 2);

        ctx.fillStyle = "#FF7700";
        ctx.fill();

        drawGlass(110, 1010, 680, 70, 22);

        centerText(
          "Shared publicly with DevPulse AI",
          W / 2,
          1045,
          "500 15px Inter, Arial, sans-serif",
          "rgba(255,255,255,0.45)",
        );

        canvas.toBlob(async (blob) => {
          cleanup();

          if (!blob) {
            return;
          }

          const file = new File(
            [blob],
            `${safeTitle || "program"}-devpulse.png`,
            {
              type: "image/png",
            },
          );

          try {
            if (
              navigator.share &&
              navigator.canShare &&
              navigator.canShare({
                files: [file],
              })
            ) {
              await navigator.share({
                title: program.title,
                text: "Public program shared from DevPulse AI",
                files: [file],
              });

              return;
            }

            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = `${safeTitle || "program"}-devpulse.png`;

            document.body.appendChild(link);
            link.click();

            link.remove();
            URL.revokeObjectURL(downloadUrl);
          } catch {
            // User cancelled native share.
          }
        }, "image/png");
      };

      logoImage.onerror = () => {
        cleanup();
      };

      logoImage.src = "/assets/logo.png";
    };

    qrImage.onerror = () => {
      cleanup();
    };

    qrImage.src = svgUrl;
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center text-black dark:text-white">
        <div className="flex items-center gap-3 text-sm text-black/40 dark:text-white/40">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading Program...
        </div>
      </main>
    );
  }

  if (error || !program) {
    return (
      <main className="min-h-screen px-4 py-6 text-black dark:text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-[1500px] items-center justify-center">
          <div className="w-full max-w-md rounded-[28px] border border-black/[0.07] bg-white/5 p-7 text-center backdrop-blur-sm dark:border-white/[0.07] dark:bg-[#15171B]/5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <FileCode2 className="h-5 w-5" />
            </div>

            <h1 className="mt-4 text-lg font-semibold text-black/80 dark:text-white/80">
              Program unavailable
            </h1>

            <p className="mt-2 text-sm leading-6 text-black/40 dark:text-white/30">
              {error || "This program could not be loaded."}
            </p>

            <Button type="button" onClick={() => router.back()} className="mt-5 h-10 cursor-pointer rounded-xl bg-black dark:bg-white dark:text-black px-5 text-sm font-semibold text-white hover:bg-[#E96D00]">
              Go Back
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-6 text-black dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="relative overflow-hidden rounded-[30px] border border-black/[0.07] bg-white/5 p-6 backdrop-blur-sm dark:border-white/[0.07] dark:bg-[#15171B]/5 sm:p-7">
          <div className="relative">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={[ "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold", program.visibility === "public" ? "border-emerald-500/15 bg-emerald-500/[0.07] text-emerald-600 dark:text-emerald-400" : "border-[#FF7700]/15 bg-[#FF7700]/[0.07] text-[#FF7700]", ].join(" ")}>
                    <span className={[ "h-1.5 w-1.5 rounded-full", program.visibility === "public" ? "bg-emerald-500" : "bg-[#FF7700]", ].join(" ")}/>

                    {program.visibility === "public" ? "Public" : "Private"}
                  </span>

                  <span className="rounded-full border border-black/[0.06] bg-black/[0.025] px-2.5 py-1 text-[11px] font-medium text-black/45 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white/40">
                    {languageLabel}
                  </span>

                  <span className="rounded-full border border-black/[0.06] bg-black/[0.025] px-2.5 py-1 text-[11px] font-medium text-black/35 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white/30">
                    {lineCount} lines
                  </span>
                </div>

                <div className="mt-4 flex items-start gap-4">
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF7700]/10 text-[#FF7700] sm:flex">
                    <FileCode2 className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h1 className="truncate text-2xl font-bold tracking-tight text-black/85 dark:text-white/90 sm:text-3xl">
                      {program.title}
                    </h1>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-black/45 dark:text-white/35">
                      {program.description || "No description provided."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {isOwner && (
                  <Button type="button" onClick={handleOpenEditor} className="h-10 cursor-pointer rounded-xl bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-4 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(255,119,0,0.18)] hover:bg-[#E96D00]">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Open Editor
                  </Button>
                )}

                {program.visibility === "public" && (
                  <Button type="button" variant="outline" onClick={handleShare} className="h-10 cursor-pointer rounded-xl border-black/[0.08] bg-white/50 px-4 text-sm font-medium hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                )}

              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-black/[0.06] pt-5 dark:border-white/[0.06] sm:grid-cols-4">
              <MetaItem label="Program ID" value={program.id} />
              <MetaItem label="Language" value={languageLabel} />
              <MetaItem label="Visibility" value={program.visibility === "public" ? "Public" : "Private"}/>
              <MetaItem label="Lines" value={`${lineCount}`} />
            </div>
          </div>
        </header>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section className="min-w-0 space-y-6">
            <section className="overflow-hidden rounded-[28px] border border-black/[0.07] bg-white/5 backdrop-blur-sm dark:border-white/[0.07] dark:bg-[#15171B]/5">
              <div className="flex flex-col gap-4 border-b border-black/[0.06] px-5 py-5 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <FileCode2 className="h-4 w-4 text-[#FF7700]" />
                    <h2 className="text-sm font-semibold text-black/80 dark:text-white/80">
                      Source Code
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-black/35 dark:text-white/30">
                    Read-only source for this program.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={handleCopyCode} disabled={!program.code} className="h-9 cursor-pointer rounded-xl border-black/[0.08] bg-white/50 px-3 text-xs font-medium hover:bg-black/[0.03] disabled:cursor-not-allowed dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                    {copiedCode ? (
                      <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="mr-1.5 h-3.5 w-3.5" />
                    )}

                    {copiedCode ? "Copied" : "Copy"}
                  </Button>

                  <Button type="button" variant="outline" onClick={handleDownload} disabled={!program.code} className="h-9 cursor-pointer rounded-xl border-black/[0.08] bg-white/50 px-3 text-xs font-medium hover:bg-black/[0.03] disabled:cursor-not-allowed dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="bg-white/20 dark:bg-[#15171B]/20">
                {program.code ? (
                  <div className="max-h-[650px] min-h-[280px] overflow-auto">
                    <div className="min-w-max p-5">
                      <pre className="font-mono text-[13px] leading-6 text-black/75 dark:text-white/70">
                        {program.code.split("\n").map((line, index) => (
                          <div key={`${index}-${line}`} className="flex">
                            <span className="mr-6 inline-block w-8 select-none text-right text-black/20 dark:text-white/15">
                              {index + 1}
                            </span>

                            <code>{line || " "}</code>
                          </div>
                        ))}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[280px] items-center justify-center px-6 text-center">
                    <div>
                      <FileCode2 className="mx-auto h-8 w-8 text-black/15 dark:text-white/15" />

                      <p className="mt-3 text-sm font-medium text-black/50 dark:text-white/40">
                        No source code
                      </p>

                      <p className="mt-1 text-xs text-black/30 dark:text-white/25">
                        This program does not contain any code yet.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] px-5 py-3.5 dark:border-white/[0.06]">
                <span className="text-[11px] text-black/30 dark:text-white/25">
                  {fileName}
                </span>

                <span className="text-[11px] text-black/30 dark:text-white/25">
                  {lineCount} lines
                </span>
              </div>
            </section>

            {isOwner && (
              <section className="rounded-[28px] border border-black/[0.07] bg-white/5 p-5 backdrop-blur-sm dark:border-white/[0.07] dark:bg-[#15171B]/5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FF7700]">
                      Workspace
                    </div>

                    <h2 className="mt-1 text-base font-semibold text-black/80 dark:text-white/80">
                      Program Actions
                    </h2>
                  </div>

                  <span className="text-[10px] text-black/30 dark:text-white/25">
                    Owner only
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <ActionTile
                    icon={<Edit3 className="h-4 w-4" />}
                    label="Open Editor"
                    description="Edit source code"
                    onClick={handleOpenEditor}
                  />

                  <ActionTile
                    icon={<Play className="h-4 w-4" />}
                    label="Run"
                    description="Execute program"
                    onClick={handleRun}
                  />

                  <ActionTile
                    icon={<Edit3 className="h-4 w-4" />}
                    label="Edit"
                    description="Update details"
                    onClick={handleEdit}
                  />

                  <ActionTile
                    icon={<Trash2 className="h-4 w-4" />}
                    label="Delete"
                    description="Remove program"
                    onClick={handleDeleteClick}
                    danger
                  />
                </div>
              </section>
            )}

            <section className="rounded-[28px] border border-black/[0.07] bg-white/5 p-5 backdrop-blur-sm dark:border-white/[0.07] dark:bg-[#15171B]/5">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-[#FF7700]" />

                <h2 className="text-sm font-semibold text-black/80 dark:text-white/80">
                  Program Details
                </h2>
              </div>

              <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                <MetaItem label="Program ID" value={program.id} />
                <MetaItem label="Owner ID" value={program.userId} />
                <MetaItem label="File Name" value={fileName} />
                <MetaItem label="Language" value={languageLabel} />
                <MetaItem label="Visibility" value={program.visibility} />
                <MetaItem label="Code Size" value={`${program.code.length} characters`}/>
              </div>
            </section>
          </section>

          <aside className="sticky top-3 min-w-0 space-y-6">
            {program.visibility === "public" && (
              <section className="overflow-hidden rounded-[28px] border border-black/[0.07] bg-white/10 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#15171B]/10">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <QrCode className="h-4 w-4 text-[#FF7700]" />

                        <h2 className="text-sm font-semibold text-black/80 dark:text-white/80">
                          Share Program
                        </h2>
                      </div>

                      <p className="mt-1 text-xs leading-5 text-black/35 dark:text-white/30">
                        Scan the QR code to open this public program.
                      </p>
                    </div>

                    <span className="rounded-lg bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      PUBLIC
                    </span>
                  </div>

                  <div id="devpulse-program-qr" className="mt-5 flex justify-center">
                    <div className="relative flex h-[238px] w-[238px] items-center justify-center rounded-[26px] border border-black/[0.06] bg-white p-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:border-black/[0.08]">
                      <QRCodeSVG
                        value={publicUrl}
                        size={198}
                        level="H"
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        includeMargin={false}
                        imageSettings={{
                          src: "/assets/logo.png",
                          height: 42,
                          width: 42,
                          excavate: true,
                        }}
                      />

                      <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-0.5">
                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-black p-1.5">
                          <img src="/assets/logo.png" alt="DevPulse AI" className="h-full w-full rounded-full object-contain"/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Button type="button" variant="outline" onClick={handleCopyLink} className="h-10 cursor-pointer rounded-xl border-black/[0.08] bg-white/70 px-3 text-xs font-medium hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                      {copiedLink ? (
                        <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="mr-1.5 h-3.5 w-3.5" />
                      )}

                      {copiedLink ? "Copied" : "Copy Link"}
                    </Button>

                    <Button type="button" variant="outline" onClick={handleShareQrImage} className="h-10 cursor-pointer rounded-xl border-black/[0.08] bg-white/70 px-3 text-xs font-medium hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                      <Share2 className="mr-1.5 h-3.5 w-3.5" />
                      Share QR
                    </Button>
                  </div>

                  <Button type="button" variant="ghost" onClick={handleOpenPublicPage} className="mt-2 h-9 w-full cursor-pointer rounded-xl text-xs font-medium text-black/50 hover:bg-black/[0.03] hover:text-black/75 dark:text-white/40 dark:hover:bg-white/[0.05] dark:hover:text-white/70">
                    Open Public Page
                    <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </section>
            )}

            <section className="rounded-[28px] border border-black/[0.07] bg-white/5 p-5 backdrop-blur-sm dark:border-white/[0.07] dark:bg-[#15171B]/5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-black/75 dark:text-white/75">
                  Activity
                </h2>

                <span className="text-[10px] text-black/25 dark:text-white/20">
                  Timeline
                </span>
              </div>

              <div className="mt-4 divide-y divide-black/[0.05] dark:divide-white/[0.05]">
                <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
                  <span className="text-xs text-black/40 dark:text-white/30">
                    Created
                  </span>

                  <span className="text-right text-xs font-medium text-black/65 dark:text-white/60">
                    {formatDateTime(program.createdAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-xs text-black/40 dark:text-white/30">
                    Updated
                  </span>

                  <span className="text-right text-xs font-medium text-black/65 dark:text-white/60">
                    {formatDateTime(program.updatedAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
                  <span className="text-xs text-black/40 dark:text-white/30">
                    Last Run
                  </span>

                  <span className="text-right text-xs font-medium text-black/65 dark:text-white/60">
                    {formatDateTime(program.lastRunAt)}
                  </span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <EditProgramDialog program={selectedProgram} open={editDialogOpen} onOpenChange={setEditDialogOpen}/>
      <DeleteProgramDialog program={programToDelete} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}/>
    </main>
  );
}

export default ProgramDetailsPage;