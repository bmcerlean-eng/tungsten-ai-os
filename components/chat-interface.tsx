"use client";

import { useChat } from "ai/react";
import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Send, Bot, User, Trash2, Copy, Check, ChevronDown,
  AlertTriangle, TrendingUp, FileText, Zap, RefreshCw,
  AlertCircle, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ACCOUNTS } from "@/lib/seed-data";
import { formatARR, daysUntil } from "@/lib/utils";

// ── Suggested prompts ───────────────────────────────────────────────
const PROMPT_CATEGORIES = [
  {
    label: "Portfolio Health",
    icon: AlertTriangle,
    color: "text-amber-500",
    prompts: [
      "What accounts are most at risk this week?",
      "Which accounts have no AI Lab or Infosec contact?",
      "Show me all renewals in the next 90 days",
    ],
  },
  {
    label: "Meeting Prep",
    icon: FileText,
    color: "text-tungsten-navy",
    prompts: [
      "Prepare me for a meeting with BNY Mellon",
      "What should I know before talking to TD Bank?",
      "Summarise the FujiFilm situation for a call today",
    ],
  },
  {
    label: "Generate Content",
    icon: Zap,
    color: "text-tungsten-gold",
    prompts: [
      "Draft a Move Up outreach email for FujiFilm",
      "Write a CEO summary of portfolio health for this week",
      "Draft talking points for the JPMorgan expansion conversation",
    ],
  },
  {
    label: "Strategic Analysis",
    icon: TrendingUp,
    color: "text-emerald-500",
    prompts: [
      "What are the top 3 expansion opportunities right now?",
      "Summarise the Term Realignment opportunity across the portfolio",
      "Which accounts need an executive top-to-top most urgently?",
    ],
  },
];

// ── At-risk quick chips ──────────────────────────────────────────────
const atRisk = ACCOUNTS
  .filter((a) => a.rag === "red" || (a.rag === "amber" && daysUntil(a.renewalDate) <= 90))
  .sort((a, b) => daysUntil(a.renewalDate) - daysUntil(b.renewalDate))
  .slice(0, 5);

// ── Helper: copy text to clipboard ──────────────────────────────────
function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    });
  };
  return { copied, copy };
}

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages } = useChat({
    api: "/api/chat",
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { copied, copy } = useCopy();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const submitPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as React.ChangeEvent<HTMLTextAreaElement>);
    setActiveCategory(null);
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      form?.requestSubmit();
    }, 50);
  };

  const clearChat = () => {
    if (messages.length > 0 && confirm("Clear this conversation?")) setMessages([]);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full bg-white">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-tungsten-border bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-tungsten-gold/10 border border-tungsten-gold/30 flex items-center justify-center">
            <Bot size={14} className="text-tungsten-gold" />
          </div>
          <div>
            <div className="text-sm font-semibold text-tungsten-navy leading-none">Tungsten AI OS</div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              {isLoading ? (
                <span className="text-tungsten-gold animate-pulse">Thinking…</span>
              ) : error ? (
                <span className="text-red-500">API error — check billing</span>
              ) : (
                <span className="text-emerald-500">Ready · {ACCOUNTS.length} accounts loaded</span>
              )}
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
          >
            <Trash2 size={12} />
            Clear
          </button>
        )}
      </div>

      {/* ── Messages / Empty state ──────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">

        {/* API error banner */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-red-700">Claude API error</div>
                <div className="text-xs text-red-600 mt-1">
                  {error.message?.includes("credit") || error.message?.includes("billing")
                    ? "Your Anthropic account has no credits. Go to "
                    : "Connection failed. "}
                  <a
                    href="https://console.anthropic.com/settings/billing"
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-medium inline-flex items-center gap-0.5"
                  >
                    console.anthropic.com/settings/billing <ExternalLink size={10} />
                  </a>
                  {" "}to top up.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {isEmpty && !error && (
          <div className="max-w-2xl mx-auto pt-6">
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Ask anything about your portfolio — account health, renewal risk, meeting prep,
              draft communications, or strategic analysis. I have full context on all {ACCOUNTS.length} accounts.
            </p>

            {/* At-risk chips */}
            {atRisk.length > 0 && (
              <div className="mb-6">
                <div className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-2">
                  Quick — At Risk / Renewing Soon
                </div>
                <div className="flex flex-wrap gap-2">
                  {atRisk.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => submitPrompt(`Brief me on ${a.name} — what's the situation and what should I do next?`)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                        a.rag === "red"
                          ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                          : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                      )}
                    >
                      <span className={cn("w-1.5 h-1.5 rounded-full", a.rag === "red" ? "bg-red-500" : "bg-amber-500")} />
                      {a.name}
                      <span className="opacity-60 font-normal">{daysUntil(a.renewalDate)}d</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt categories */}
            <div className="space-y-3">
              {PROMPT_CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                const open = activeCategory === i;
                return (
                  <div key={cat.label} className="border border-tungsten-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setActiveCategory(open ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-tungsten-surface transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={14} className={cat.color} />
                        <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                      </div>
                      <ChevronDown
                        size={14}
                        className={cn("text-gray-400 transition-transform", open && "rotate-180")}
                      />
                    </button>
                    {open && (
                      <div className="border-t border-tungsten-border divide-y divide-tungsten-border/60">
                        {cat.prompts.map((p) => (
                          <button
                            key={p}
                            onClick={() => submitPrompt(p)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-tungsten-surface hover:text-tungsten-navy transition-colors"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex gap-3 group",
              m.role === "user" ? "flex-row-reverse max-w-2xl ml-auto" : "max-w-3xl mr-auto"
            )}
          >
            {/* Avatar */}
            <div className={cn(
              "w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5",
              m.role === "user"
                ? "bg-tungsten-navy text-white"
                : "bg-tungsten-gold/10 border border-tungsten-gold/30"
            )}>
              {m.role === "user"
                ? <User size={13} className="text-white" />
                : <Bot size={13} className="text-tungsten-gold" />
              }
            </div>

            {/* Bubble + copy button */}
            <div className="flex flex-col gap-1 min-w-0">
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-tungsten-navy text-white rounded-tr-sm"
                  : "bg-white border border-tungsten-border text-gray-700 rounded-tl-sm shadow-sm"
              )}>
                {m.role === "user" ? (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                ) : (
                  <div className="prose-chat">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Copy + account link actions (AI messages only) */}
              {m.role === "assistant" && (
                <div className="flex items-center gap-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copy(m.id, m.content)}
                    className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {copied === m.id
                      ? <><Check size={10} className="text-emerald-500" /><span className="text-emerald-500">Copied</span></>
                      : <><Copy size={10} /><span>Copy</span></>
                    }
                  </button>
                  {/* If message mentions a known account, link to it */}
                  {ACCOUNTS.filter(a =>
                    m.content.toLowerCase().includes(a.name.toLowerCase().split(" ")[0])
                  ).slice(0, 2).map(a => (
                    <Link
                      key={a.id}
                      href={`/accounts/${a.id}`}
                      className="flex items-center gap-1 text-[10px] text-tungsten-navy hover:text-tungsten-blue transition-colors"
                    >
                      <ExternalLink size={10} />
                      {a.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-3xl">
            <div className="w-7 h-7 rounded-full flex-shrink-0 bg-tungsten-gold/10 border border-tungsten-gold/30 flex items-center justify-center">
              <Bot size={13} className="text-tungsten-gold" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-tungsten-border shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 rounded-full bg-tungsten-gold/60 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-tungsten-gold/60 animate-bounce [animation-delay:120ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-tungsten-gold/60 animate-bounce [animation-delay:240ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ──────────────────────────────────────────────── */}
      <div className="border-t border-tungsten-border px-4 py-3 bg-white">
        <form id="chat-form" onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className={cn(
            "flex gap-3 items-end rounded-2xl px-4 py-3 transition-all shadow-sm",
            "bg-tungsten-surface border border-tungsten-border",
            "focus-within:border-tungsten-navy/30 focus-within:bg-white focus-within:shadow-md"
          )}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about accounts, risks, renewals, or ask Claude to draft something…"
              rows={1}
              className="flex-1 bg-transparent resize-none text-sm text-gray-800 placeholder-gray-400 outline-none max-h-32 leading-relaxed"
              style={{ height: "auto" }}
            />
            <div className="flex items-center gap-2 flex-shrink-0">
              {input.trim() && (
                <span className="text-[10px] text-gray-400">{input.length}</span>
              )}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-tungsten-navy flex items-center justify-center disabled:opacity-30 hover:bg-tungsten-blue transition-colors"
              >
                {isLoading
                  ? <RefreshCw size={13} className="text-white animate-spin" />
                  : <Send size={13} className="text-white" />
                }
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1.5 px-1">
            <p className="text-[10px] text-gray-400">Shift+Enter for new line · Enter to send</p>
            {messages.length > 0 && (
              <p className="text-[10px] text-gray-400">{messages.length} message{messages.length !== 1 ? "s" : ""}</p>
            )}
          </div>
        </form>
      </div>

    </div>
  );
}
