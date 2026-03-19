"use client";

import { useState } from "react";
import { Presentation, Loader2, Download, CheckCircle } from "lucide-react";

const ACCOUNTS = [
  { id: "bny", name: "BNY Mellon" },
  { id: "jpmorgan", name: "JPMorgan Chase" },
  { id: "fujifilm", name: "FujiFilm" },
  { id: "usbank", name: "US Bancorp" },
  { id: "tdbank", name: "TD Bank" },
  { id: "citi", name: "Citibank" },
  { id: "nhs-wales", name: "NHS Wales" },
  { id: "maritz", name: "Maritz" },
  { id: "apple", name: "Apple" },
  { id: "sps", name: "SPS Commerce" },
];

export default function DeckGeneratorForm() {
  const [accountId, setAccountId] = useState("bny");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setDone(false);
    setError(null);

    const accountName = ACCOUNTS.find((a) => a.id === accountId)?.name ?? accountId;

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
        <h3 className="text-sm font-semibold text-tungsten-navy">Account Briefing Deck</h3>
      </div>
      <div className="px-5 py-5">
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          Select an account to generate an 8-slide Tungsten-branded PowerPoint briefing — status snapshot, relationship map, risks, strategic opportunity, recommended actions, and revenue breakdown.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">Account</label>
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full border border-tungsten-border rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-tungsten-navy/40 focus:ring-1 focus:ring-tungsten-navy/20"
            >
              {ACCOUNTS.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">Deck Type</label>
            <select
              disabled
              className="w-full border border-tungsten-border rounded-lg px-3 py-2 text-sm text-gray-400 bg-tungsten-surface cursor-not-allowed"
            >
              <option>Account Briefing (8 slides)</option>
            </select>
            <p className="text-[10px] text-gray-400 mt-1">More deck types coming in Phase 2</p>
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 mb-3 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">{error}</p>
        )}

        <button
          onClick={generate}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-tungsten-gold text-white font-semibold text-sm hover:bg-amber-500 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <><Loader2 size={14} className="animate-spin" />Building deck…</>
          ) : done ? (
            <><CheckCircle size={14} />Downloaded!</>
          ) : (
            <><Download size={14} />Generate & Download .pptx</>
          )}
        </button>

        <div className="mt-4 grid grid-cols-4 gap-3 text-center">
          {[
            { n: "8", label: "Slides" },
            { n: "Tungsten", label: "Brand colors" },
            { n: "Live", label: "Account data" },
            { n: ".pptx", label: "Format" },
          ].map(({ n, label }) => (
            <div key={label} className="bg-tungsten-surface rounded-lg p-2.5 border border-tungsten-border">
              <div className="text-sm font-bold text-tungsten-navy">{n}</div>
              <div className="text-[10px] text-gray-400">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
