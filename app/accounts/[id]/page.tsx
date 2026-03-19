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
    strong: "text-emerald-600 bg-emerald-50 border-emerald-200",
    developing: "text-amber-600 bg-amber-50 border-amber-200",
    gap: "text-red-600 bg-red-50 border-red-200",
    unknown: "text-gray-500 bg-gray-50 border-gray-200",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-tungsten-navy">{account.name}</h1>
            <RagBadge rag={account.rag} />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><MapPin size={13} />{account.region}</span>
            <span>{account.industry}</span>
            <span className="flex items-center gap-1"><Calendar size={13} />Renewal: {formatDate(account.renewalDate)} ({days} days)</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-tungsten-navy">{formatARR(account.arrTotal)}</div>
          <div className="text-xs text-gray-400">Total ARR</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-5">
          {/* Revenue */}
          <div className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-tungsten-border bg-tungsten-surface flex items-center gap-2">
              <TrendingUp size={14} className="text-tungsten-gold" />
              <h2 className="text-sm font-semibold text-tungsten-navy">Revenue by Product</h2>
            </div>
            <div className="divide-y divide-tungsten-border/60">
              {account.revenue.map((r, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-900 font-medium">{r.product}</div>
                    <div className="text-xs text-gray-400">{r.pillar} · {r.contractType}</div>
                    {r.contractEndDate && (
                      <div className="text-xs text-gray-400">Ends {formatDate(r.contractEndDate)}</div>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-tungsten-navy">{formatARR(r.arrCurrent)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Intelligence */}
          <div className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-tungsten-border bg-tungsten-surface flex items-center justify-between">
              <h2 className="text-sm font-semibold text-tungsten-navy">Account Intelligence</h2>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${account.intelligence.completenessScore >= 80 ? "bg-emerald-500" : account.intelligence.completenessScore >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${account.intelligence.completenessScore}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{account.intelligence.completenessScore}% complete</span>
              </div>
            </div>
            <div className="px-5 py-4 space-y-4 text-sm">
              <div>
                <div className="text-xs text-gray-400 font-medium mb-1">Key Problems</div>
                <p className="text-gray-700 leading-relaxed">{account.intelligence.keyProblems}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400 font-medium mb-1">Usage Rate</div>
                  <div className="text-gray-900 font-semibold">{account.intelligence.usageRate ?? "—"}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium mb-1">Satisfaction</div>
                  <div className="text-gray-900 font-semibold">{account.intelligence.satisfactionRating ?? "—"}/5</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium mb-1">Strategy Plays</div>
                <div className="flex flex-wrap gap-1.5">
                  {account.intelligence.strategyPlays.map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded-full bg-tungsten-navy/5 border border-tungsten-navy/20 text-xs text-tungsten-navy font-medium">
                      {p.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium mb-1">Help Needed</div>
                <p className="text-gray-700 leading-relaxed">{account.intelligence.helpNeeded}</p>
              </div>
            </div>
          </div>

          {/* Relationships */}
          <div className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-tungsten-border bg-tungsten-surface flex items-center gap-2">
              <Users size={14} className="text-tungsten-gold" />
              <h2 className="text-sm font-semibold text-tungsten-navy">Relationship Map</h2>
            </div>
            <div className="divide-y divide-tungsten-border/60">
              {account.intelligence.relationships.map((r, i) => (
                <div key={i} className="px-5 py-3 flex items-start gap-3">
                  <span className={`mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${relationshipColors[r.status]}`}>
                    {r.status}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400">{r.type}</div>
                    <div className="text-sm text-gray-900 font-medium">{r.contact}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{r.notes}</div>
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
            <div className="bg-white border border-amber-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-3 border-b border-amber-100 bg-amber-50 flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-500" />
                <h2 className="text-sm font-semibold text-amber-700">Active Signals</h2>
              </div>
              <div className="px-5 py-4 space-y-2">
                {account.signals.map((s, i) => (
                  <div key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
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
