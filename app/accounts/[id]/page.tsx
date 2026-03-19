import { getAccount } from "@/lib/seed-data";
import { formatARR, formatDate, daysUntil } from "@/lib/utils";
import RagBadge from "@/components/rag-badge";
import BriefingPanel from "@/components/briefing-panel";
import { notFound } from "next/navigation";
import { MapPin, Calendar, TrendingUp, Users, AlertTriangle } from "lucide-react";

export default async function AccountPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const account = getAccount(id);
  if (!account) notFound();

  const days = daysUntil(account.renewalDate);

  const relationshipColors: Record<string, string> = {
    strong: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    developing: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    gap: "text-red-400 bg-red-400/10 border-red-400/20",
    unknown: "text-slate-400 bg-slate-400/10 border-slate-400/20",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-white">{account.name}</h1>
            <RagBadge rag={account.rag} />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1"><MapPin size={13} />{account.region}</span>
            <span>{account.industry}</span>
            <span className="flex items-center gap-1"><Calendar size={13} />Renewal: {formatDate(account.renewalDate)} ({days} days)</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-tungsten-gold">{formatARR(account.arrTotal)}</div>
          <div className="text-xs text-slate-400">Total ARR</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-5">
          {/* Revenue */}
          <div className="bg-tungsten-surface border border-tungsten-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-tungsten-border flex items-center gap-2">
              <TrendingUp size={14} className="text-tungsten-gold" />
              <h2 className="text-sm font-semibold text-white">Revenue by Product</h2>
            </div>
            <div className="divide-y divide-tungsten-border/50">
              {account.revenue.map((r, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white font-medium">{r.product}</div>
                    <div className="text-xs text-slate-500">{r.pillar} · {r.contractType}</div>
                    {r.contractEndDate && (
                      <div className="text-xs text-slate-500">Ends {formatDate(r.contractEndDate)}</div>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-tungsten-gold">{formatARR(r.arrCurrent)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Intelligence */}
          <div className="bg-tungsten-surface border border-tungsten-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-tungsten-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Account Intelligence</h2>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full bg-tungsten-border overflow-hidden">
                  <div
                    className={`h-full rounded-full ${account.intelligence.completenessScore >= 80 ? "bg-emerald-500" : account.intelligence.completenessScore >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${account.intelligence.completenessScore}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400">{account.intelligence.completenessScore}% complete</span>
              </div>
            </div>
            <div className="px-5 py-4 space-y-4 text-sm">
              <div>
                <div className="text-xs text-slate-500 mb-1">Key Problems</div>
                <p className="text-slate-300 leading-relaxed">{account.intelligence.keyProblems}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Usage Rate</div>
                  <div className="text-white font-medium">{account.intelligence.usageRate ?? "—"}%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Satisfaction</div>
                  <div className="text-white font-medium">{account.intelligence.satisfactionRating ?? "—"}/5</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Strategy Plays</div>
                <div className="flex flex-wrap gap-1.5">
                  {account.intelligence.strategyPlays.map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded-full bg-tungsten-blue/30 border border-tungsten-blue text-xs text-blue-300">
                      {p.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Help Needed</div>
                <p className="text-slate-300 leading-relaxed">{account.intelligence.helpNeeded}</p>
              </div>
            </div>
          </div>

          {/* Relationships */}
          <div className="bg-tungsten-surface border border-tungsten-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-tungsten-border flex items-center gap-2">
              <Users size={14} className="text-tungsten-gold" />
              <h2 className="text-sm font-semibold text-white">Relationship Map</h2>
            </div>
            <div className="divide-y divide-tungsten-border/50">
              {account.intelligence.relationships.map((r, i) => (
                <div key={i} className="px-5 py-3 flex items-start gap-3">
                  <span className={`mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${relationshipColors[r.status]}`}>
                    {r.status}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400">{r.type}</div>
                    <div className="text-sm text-white font-medium">{r.contact}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{r.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — Briefing */}
        <div className="space-y-5">
          {/* Signals */}
          {account.signals.length > 0 && (
            <div className="bg-tungsten-surface border border-red-500/20 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-tungsten-border/50 flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-400" />
                <h2 className="text-sm font-semibold text-white">Active Signals</h2>
              </div>
              <div className="px-5 py-4 space-y-2">
                {account.signals.map((s, i) => (
                  <div key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Briefing generator */}
          <BriefingPanel accountId={account.id} accountName={account.name} />
        </div>
      </div>
    </div>
  );
}
