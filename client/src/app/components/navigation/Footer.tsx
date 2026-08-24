"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MoveUp } from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
}

interface SocialLink extends FooterLink {
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

const productLinks: FooterLink[] = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "About", href: "#about" },
];

const accountLinks: FooterLink[] = [
  { name: "Login", href: "/login" },
  { name: "Create Account", href: "/signup" },
];

const socialLinks: SocialLink[] = [
  {
    name: "Portfolio",
    href: "https://your-portfolio.com",
    icon: ArrowUpRight,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={props.strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
        style={{ width: props.size, height: props.size }}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={props.strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
        style={{ width: props.size, height: props.size }}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:your@email.com",
    icon: Mail,
  },
];

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-sm text-white/45 transition-colors hover:text-[#FFAA00]">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterBrand() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#2A2C32] transition duration-200 group-hover:border-[#FFAA00]/40">
        <Image src="/assets/logo.png" alt="DevPulse AI" width={40} height={40} className="h-9 w-9 object-contain"/>
      </div>
      <div>
        <div className="text-lg font-bold tracking-tight">
          DevPulse{" "}
          <span className="bg-gradient-to-r from-[#FF7700] to-[#FFDD00] bg-clip-text text-transparent">
            AI
          </span>
        </div>
        <p className="text-[10px] font-medium tracking-[0.18em] text-white/30">
          CODE • EXECUTE • LEARN
        </p>
      </div>
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#15171B] text-white">

      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#FF2200]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#FFAA00]/10 blur-[120px]" />

      <div className="relative mx-auto flex min-h-[30vh] max-w-7xl flex-col justify-between px-6 py-12 lg:px-8 lg:py-14">
        
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.2fr]">
          
          <div className="max-w-md">
            <FooterBrand />
            
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/45">
              An intelligent coding workspace built to help developers write, execute, understand, and improve their code.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const isMail = social.href.startsWith("mailto:");

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-white/50 transition duration-200 hover:border-[#FFAA00]/30 hover:bg-white/[0.06] hover:text-white">
                    <Icon size={15} strokeWidth={1.8} className="text-white/40 transition-colors group-hover:text-[#FFAA00]"/>
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Account" links={accountLinks} />

          <div>
            <h3 className="text-sm font-semibold text-white">Connect</h3>
            <div className="mt-5">
              <p className="max-w-xs text-sm leading-6 text-white/40">
                Have an idea, question, or want to collaborate?
              </p>
              <a href="mailto:your@email.com" className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white">
                <Mail size={16} className="text-[#FFAA00] transition-transform group-hover:scale-110"/>
                abadali1707gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.07] pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-white/50">
                © {currentYear} DevPulse AI. All rights reserved.
              </p>
              <p className="mt-1 text-[11px] text-white/50">
                Built with curiosity, code, and a little caffeine.
              </p>
            </div>

            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-white/45 transition duration-200 hover:border-[#FFAA00]/30 hover:bg-white/[0.06] hover:text-white">
              <MoveUp size={15} className="text-[#FFAA00] transition-transform group-hover:-translate-y-0.5"/>
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
