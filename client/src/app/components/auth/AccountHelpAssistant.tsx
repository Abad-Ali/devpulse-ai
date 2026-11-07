"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock3, KeyRound, RotateCcw, Send, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUICK_ACTIONS, getAssistantReply, type ChatbotAction } from "./chatbot-data";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
  actions?: ChatbotAction[];
  timestamp: Date;
};

const WELCOME_MESSAGE: Message = {
  id: 1,
  role: "assistant",
  content: `Hello!
Welcome to DevPulse support.
I'm your account assistant. I can help with registration, login issues, email verification, password recovery, and account security.

How can I help you today?`,
  actions: QUICK_ACTIONS,
  timestamp: new Date(),
};

const getTime = (date: Date) => new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(date);

const getActionIcon = (icon: ChatbotAction["icon"]) => {
  switch (icon) {
    case "password":
      return KeyRound;
    case "verification":
      return ShieldCheck;
    case "login":
      return ArrowRight;
  }
};

const AccountHelpAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([ WELCOME_MESSAGE ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const timeout = setTimeout(
      () => inputRef.current?.focus(),
      200
    );

    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const addMessage = useCallback( ( role: Message["role"], content: string, actions?: ChatbotAction[] ) => {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + Math.random(),
          role,
          content,
          actions,
          timestamp: new Date(),
        },
      ]);
    },
    []
  );

  const generateResponse = useCallback(
    (message: string) => {
      const reply = getAssistantReply(message);

      addMessage(
        "assistant",
        reply.response,
        reply.suggestedLinks
      );

      setIsTyping(false);
      typingTimeoutRef.current = null;
    },
    [addMessage]
  );

  const handleSend = () => {
    const text = input.trim();

    if (!text || isTyping) return;

    addMessage("user", text);
    setInput("");
    setIsTyping(true);

    typingTimeoutRef.current = setTimeout(
      () => generateResponse(text),
      650
    );
  };

  const handleQuickAction = (action: ChatbotAction) => {
    if (isTyping) return;

    addMessage("user", action.label);
    setIsTyping(true);

    typingTimeoutRef.current = setTimeout(
      () => generateResponse(action.label),
      450
    );
  };

  const handleNewConversation = () => {
    if (isTyping) return;

    setMessages([
      {
        ...WELCOME_MESSAGE,
        id: Date.now(),
        timestamp: new Date(),
      },
    ]);

    setInput("");
    inputRef.current?.focus();
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-2 sm:bottom-4 right-5 z-[100] flex flex-col items-end gap-1">
          <div className="relative rounded-lg border border-white/[0.12] bg-[#0c0c0c]/95 px-4 py-2.5 shadow-xl backdrop-blur-md">
            <p className="whitespace-nowrap text-xs font-medium text-white/80" aria-live="polite">
              Need help? Chat with us!
            </p>

            <div className="absolute -bottom-1 right-5 size-2 rotate-45 border-b border-r border-white/[0.12] bg-[#0c0c0c]"/>
          </div>

          <button type="button" aria-label="Open assistant" onClick={() => setIsOpen(true)} className="size-[60px] transition-transform duration-200 hover:scale-105 cursor-pointer">
            <Image src="/AI.svg" alt="DevPulse Assistant" width={60} height={60} priority className="size-full object-contain"/>
          </button>
        </div>
      )}

      <section aria-label="DevPulse support assistant" aria-hidden={!isOpen} className={`fixed sm:bottom-5 right-4 z-[99] w-[calc(100vw-2rem)] origin-bottom-right transition-all duration-300 sm:right-5 sm:w-[400px] ${ isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-5 scale-95 opacity-0" }`}>
        <div className="relative flex h-[min(650px,calc(100dvh-3rem))] min-h-[400px] flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[#080808] text-white shadow-2xl">

          <header className="flex shrink-0 items-center gap-3 border-b border-white/[0.09] bg-[#0c0c0c] px-4 py-4">
            <div className="relative size-10 shrink-0">
              <Image src="/AI.svg" alt="Assistant" fill className="object-contain"/>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-white">
                DevPulse AI Support
              </h2>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green-500"/>
                <p className="text-[10px] text-white/45">
                  Online
                </p>
              </div>
            </div>

            <Button type="button" variant="ghost" size="icon" aria-label="New conversation" title="New conversation" disabled={isTyping} onClick={handleNewConversation} className="size-9 rounded-lg text-white/50 hover:bg-white/10 hover:text-white cursor-pointer">
              <RotateCcw className="size-4"/>
            </Button>

            <Button type="button" variant="ghost" size="icon" aria-label="Close assistant" onClick={() => setIsOpen(false)} className="size-9 rounded-lg text-white/50 hover:bg-white/10 hover:text-white cursor-pointer">
              <X className="size-4"/>
            </Button>
          </header>

          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
            <span className="text-[10px] text-white/40">
              Account assistance
            </span>

            <span className="text-[10px] text-white/40">
              Here to help
            </span>
          </div>

          <div role="log" aria-live="polite" aria-label="Chat messages" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.15)_transparent]">
            <div className="space-y-5">
              {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <div key={message.id} className={`flex items-start gap-2.5 ${ isUser ? "flex-row-reverse" : "" }`}>
                    <div className="relative size-8 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#111]">
                      <Image src={ isUser ? "/defaultPic.svg" : "/AI.svg" } alt={isUser ? "User" : "Assistant"} fill className="object-contain p-1"/>
                    </div>

                    <div className={`min-w-0 max-w-[85%] space-y-2 ${ isUser ? "items-end" : "" }`}>
                      <div className={`whitespace-pre-wrap break-words rounded-xl border px-3.5 py-3 text-xs leading-[1.8] ${ isUser ? "rounded-tr-sm border-white/10 bg-[#202020] text-white" : "rounded-tl-sm border-white/[0.08] bg-[#111] text-white/75" }`}>
                        {message.content}
                      </div>

                      <div className={`flex items-center gap-1 px-1 ${isUser ? "justify-end" : ""}`}>
                        <Clock3 className="size-2.5 text-white/25"/>

                        <span className="text-[9px] text-white/30">
                          {getTime(message.timestamp)}
                        </span>

                        {isUser && (
                          <Check className="size-3 text-white/40"/>
                        )}
                      </div>

                      {!isUser &&
                        message.actions &&
                        message.actions.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {message.actions.map((action) => {
                              const Icon = getActionIcon(
                                action.icon
                              );

                              return (
                                <Link
                                  key={
                                    action.href + action.label
                                  }
                                  href={action.href} onClick={() => setIsOpen(false)} className="group flex min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-[#111] p-2.5 transition-colors hover:border-white/30 hover:bg-[#1a1a1a]">
                                  <Icon className="size-3.5 shrink-0 text-white/60"/>

                                  <span className="min-w-0 flex-1 text-[10px] font-medium text-white/75">
                                    {action.label}
                                  </span>

                                  <ArrowUpRight className="size-3 shrink-0 text-white/30"/>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="relative size-8 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#111]">
                    <Image src="/AI.svg" alt="Assistant" fill className="object-contain p-1"/>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-xl rounded-tl-sm border border-white/10 bg-[#111] px-4 py-3.5">
                    <span className="size-1.5 animate-bounce rounded-full bg-white/60"/>
                    <span className="size-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:150ms]"/>
                    <span className="size-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:300ms]"/>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef}/>
            </div>
          </div>

         {messages.length === 1 && !isTyping && (
            <div className="shrink-0 border-t border-white/[0.08] px-3 py-2.5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[9px] font-semibold tracking-wider text-white/40">
                  QUICK HELP
                </p>
                <span className="text-[9px] text-white/25">
                  Select an option
                </span>
              </div>
          
              <div className="grid grid-cols-3 gap-2">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = getActionIcon(action.icon);
          
                  return (
                    <button key={action.label} type="button" disabled={isTyping} onClick={() => handleQuickAction(action)} className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-white/[0.09] bg-[#111] px-2 py-2 text-[10px] font-medium text-white/65 transition-all duration-200 hover:border-white/25 hover:bg-[#1b1b1b] hover:text-white disabled:opacity-40 cursor-pointer">
                      <Icon className="size-3 shrink-0 text-white/50"/>
                      <span className="truncate">
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <footer className="shrink-0 border-t border-white/[0.09] bg-[#080808] p-3">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 rounded-xl border border-white/[0.12] bg-[#111] p-1.5 pl-3 transition-colors focus-within:border-white/30">
              <Input ref={inputRef} value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder="Type your message..." aria-label="Message the assistant" autoComplete="off" maxLength={1000} disabled={isTyping} className="h-10 min-w-0 flex-1 border-0 bg-transparent px-0 text-xs text-white shadow-none placeholder:text-white/30 focus-visible:ring-0"/>

              <Button type="submit" size="icon" aria-label="Send message" disabled={!input.trim() || isTyping} className="size-9 shrink-0 rounded-lg bg-white text-black transition-colors hover:bg-white/80 disabled:opacity-30 cursor-pointer">
                <Send className="size-4"/>
              </Button>
            </form>

            <div className="mt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck className="size-3 text-white/30"/>

              <p className="text-center text-[9px] text-white/30">
                Never share your password or verification tokens.
              </p>
            </div>

            <p className="mt-1 text-center text-[9px] text-white/20">
              Powered by DevPulse AI
            </p>
          </footer>
        </div>
      </section>
    </>
  );
};

export default AccountHelpAssistant;
