"use client";

import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Bot, User } from "lucide-react";

const SUGGESTED_PROMPTS = [
  "What accounts are most at risk this week?",
  "Prepare me for a meeting with BNY Mellon",
  "Which accounts have no AI Lab or Infosec contact?",
  "Summarize the Term Realignment opportunity across the portfolio",
  "Draft a Move Up outreach email for FujiFilm",
  "What are the top 3 expansion opportunities right now?",
];

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const submitPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as React.ChangeEvent<HTMLTextAreaElement>);
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      form?.requestSubmit();
    }, 50);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto pt-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-tungsten-gold/20 border border-tungsten-gold/30 flex items-center justify-center">
                <Bot size={20} className="text-tungsten-gold" />
              </div>
              <div>
                <div className="font-semibold text-white">Tungsten AI OS</div>
                <div className="text-xs text-slate-400">Strategic Intelligence Assistant</div>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-8 leading-relaxed">
              I have context on all your strategic accounts — ARR, relationships, risks, renewal dates, and active signals.
              Ask me anything or use a suggested prompt below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => submitPrompt(p)}
                  className="text-left px-4 py-3 rounded-xl bg-tungsten-surface border border-tungsten-border text-sm text-slate-300 hover:border-tungsten-gold/40 hover:text-white transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 max-w-3xl ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
              m.role === "user"
                ? "bg-tungsten-blue text-white"
                : "bg-tungsten-gold/20 border border-tungsten-gold/30"
            }`}>
              {m.role === "user"
                ? <User size={14} className="text-white" />
                : <Bot size={14} className="text-tungsten-gold" />
              }
            </div>
            <div className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] ${
              m.role === "user"
                ? "bg-tungsten-blue text-white rounded-tr-sm"
                : "bg-tungsten-surface border border-tungsten-border text-slate-200 rounded-tl-sm"
            }`}>
              {m.role === "user" ? (
                <p>{m.content}</p>
              ) : (
                <div className="prose-chat">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 max-w-3xl">
            <div className="w-8 h-8 rounded-full flex-shrink-0 bg-tungsten-gold/20 border border-tungsten-gold/30 flex items-center justify-center">
              <Bot size={14} className="text-tungsten-gold" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-tungsten-surface border border-tungsten-border">
              <div className="flex gap-1 items-center h-5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-tungsten-border px-4 py-4">
        <form id="chat-form" onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end bg-tungsten-surface border border-tungsten-border rounded-2xl px-4 py-3 focus-within:border-tungsten-gold/50 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about accounts, generate briefings, draft communications..."
              rows={1}
              className="flex-1 bg-transparent resize-none text-sm text-white placeholder-slate-500 outline-none max-h-32 leading-relaxed"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-8 h-8 rounded-xl bg-tungsten-gold flex items-center justify-center flex-shrink-0 disabled:opacity-30 hover:bg-amber-400 transition-colors"
            >
              <Send size={14} className="text-tungsten-dark" />
            </button>
          </div>
          <p className="text-center text-xs text-slate-600 mt-2">Shift+Enter for new line · Enter to send</p>
        </form>
      </div>
    </div>
  );
}
