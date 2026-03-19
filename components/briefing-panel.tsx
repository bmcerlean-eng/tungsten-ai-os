"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, Loader2, Download } from "lucide-react";

export default function BriefingPanel({ accountId, accountName }: { accountId: string; accountName: string }) {
  const [briefing, setBriefing] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = async () => {
    setLoading(true);
    setBriefing("");
    setGenerated(false);

    const res = await fetch(`/api/briefing/${accountId}`);
    if (!res.body) { setLoading(false); return; }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let text = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      // Parse Vercel AI data stream format
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("0:")) {
          try {
            const content = JSON.parse(line.slice(2));
            text += content;
            setBriefing(text);
          } catch {}
        }
      }
    }

    setLoading(false);
    setGenerated(true);
  };

  const download = () => {
    const blob = new Blob([briefing], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Briefing - ${accountName} - ${new Date().toISOString().split("T")[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-tungsten-surface border border-tungsten-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-tungsten-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-tungsten-gold" />
          <h2 className="text-sm font-semibold text-white">Account Briefing</h2>
        </div>
        {generated && (
          <button
            onClick={download}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <Download size={12} />
            Download
          </button>
        )}
      </div>

      <div className="px-5 py-4">
        {!briefing && !loading && (
          <div className="text-center py-8">
            <div className="text-slate-400 text-sm mb-4">
              Generate a pre-meeting briefing with account status, relationship map, risks, and recommended actions.
            </div>
            <button
              onClick={generate}
              className="px-5 py-2.5 rounded-xl bg-tungsten-gold text-tungsten-dark font-semibold text-sm hover:bg-amber-400 transition-colors"
            >
              Generate Briefing
            </button>
          </div>
        )}

        {loading && !briefing && (
          <div className="flex items-center justify-center gap-2 py-8 text-slate-400 text-sm">
            <Loader2 size={16} className="animate-spin text-tungsten-gold" />
            Generating briefing...
          </div>
        )}

        {briefing && (
          <div className="prose-chat text-sm">
            <ReactMarkdown>{briefing}</ReactMarkdown>
            {!loading && (
              <button
                onClick={generate}
                className="mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
