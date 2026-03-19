"use client";

import { useState } from "react";
import { Presentation, Loader2, Download, CheckCircle } from "lucide-react";

export default function DeckGenerator({ accountId, accountName }: { accountId: string; accountName: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setDone(false);
    setError(null);

    try {
      const res = await fetch("/api/generate-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(err.error || "Failed to generate deck");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Briefing - ${accountName} - ${new Date().toISOString().split("T")[0]}.pptx`;
      a.click();
      URL.revokeObjectURL(url);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate deck");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-3 border-b border-tungsten-border bg-tungsten-surface flex items-center gap-2">
        <Presentation size={14} className="text-tungsten-gold" />
        <h2 className="text-sm font-semibold text-tungsten-navy">Generate PowerPoint Deck</h2>
      </div>
      <div className="px-5 py-6 text-center">
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          Download a formatted account briefing deck — status snapshot, relationship map, risks, strategic plays, and recommended actions.
        </p>
        {error && (
          <p className="text-xs text-red-500 mb-3">{error}</p>
        )}
        <button
          onClick={generate}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-tungsten-gold text-white font-semibold text-sm hover:bg-amber-500 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <><Loader2 size={14} className="animate-spin" />Building deck…</>
          ) : done ? (
            <><CheckCircle size={14} />Downloaded!</>
          ) : (
            <><Download size={14} />Download .pptx</>
          )}
        </button>
        <p className="text-[10px] text-gray-400 mt-2">8-slide Tungsten-branded presentation</p>
      </div>
    </div>
  );
}
