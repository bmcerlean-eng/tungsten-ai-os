import { ACCOUNTS } from "@/lib/seed-data";
import { formatARR, formatDate, daysUntil } from "@/lib/utils";
import RagBadge from "@/components/rag-badge";
import Link from "next/link";
import { AlertTriangle, TrendingUp, RefreshCw, DollarSign } from "lucide-react";

function SignalIcon({ type }: { type: string }) {
  if (type === "renewal_approaching") return <AlertTriangle size={12} className="text-amber-400" />;
  if (type === "expansion_ready") return <TrendingUp size={12} className="text-emerald-400" />;
  if (type === "contact_gap") return <AlertTriangle size={12} className="text-red-400" />;
  return <RefreshCw size={12} className="text-blue-400" />;
}

export default function Dashboard() {
  const totalARR = ACCOUNTS.reduce((s, a) => s + a.arrTotal, 0);
  const atRisk = ACCOUNTS.filter((a) => a.rag === "red");
  const needsAttention = ACCOUNTS.filter((a) => a.rag === "amber");
  const renewingSoon = ACCOUNTS.filter((a) => daysUntil(a.renewalDate) <= 120);
  const allSignals = ACCOUNTS.flatMap((a) => a.signals.map((s) => ({ ...s, accountName: a.name, accountId: a.id })));

  const kpis = [
    { label: "Portfolio ARR", value: formatARR(totalARR), icon: DollarSign, color: "text-tungsten-gold" },
    { label: "At Risk", value: atRisk.length, icon: AlertTriangle, color: "text-red-400" },
    { label: "Needs Attention", value: needsAttention.length, icon: AlertTriangle, color: "text-amber-400" },
    { label: "Renewing ≤120 Days", value: renewingSoon.length, icon: RefreshCw, color: "text-blue-400" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Portfolio Command Center</h1>
        <p className="text-sm text-slate-400 mt-1">Strategic accounts — {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-tungsten-surface border border-tungsten-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">{label}</span>
              <Icon size={16} className={color} />
            </div>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Account table */}
        <div className="xl:col-span-2 bg-tungsten-surface border border-tungsten-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-tungsten-border">
            <h2 className="text-sm font-semibold text-white">Account Portfolio</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-tungsten-border">
                  {["Account", "ARR", "Status", "Renewal", "Intelligence", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACCOUNTS.sort((a, b) => {
                  const ragOrder = { red: 0, amber: 1, green: 2 };
                  return ragOrder[a.rag] - ragOrder[b.rag] || daysUntil(a.renewalDate) - daysUntil(b.renewalDate);
                }).map((account) => {
                  const days = daysUntil(account.renewalDate);
                  return (
                    <tr key={account.id} className="border-b border-tungsten-border/50 hover:bg-tungsten-border/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{account.name}</div>
                        <div className="text-xs text-slate-500">{account.region} · {account.industry.split(" ")[0]}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200 font-medium">{formatARR(account.arrTotal)}</td>
                      <td className="px-4 py-3"><RagBadge rag={account.rag} /></td>
                      <td className="px-4 py-3">
                        <div className={`text-sm font-medium ${days <= 60 ? "text-red-400" : days <= 120 ? "text-amber-400" : "text-slate-300"}`}>
                          {formatDate(account.renewalDate)}
                        </div>
                        <div className="text-xs text-slate-500">{days} days</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-tungsten-border overflow-hidden w-16">
                            <div
                              className={`h-full rounded-full ${account.intelligence.completenessScore >= 80 ? "bg-emerald-500" : account.intelligence.completenessScore >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                              style={{ width: `${account.intelligence.completenessScore}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400">{account.intelligence.completenessScore}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/accounts/${account.id}`}
                          className="text-xs text-tungsten-gold hover:text-amber-300 font-medium transition-colors"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signals panel */}
        <div className="bg-tungsten-surface border border-tungsten-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-tungsten-border">
            <h2 className="text-sm font-semibold text-white">Active Signals</h2>
            <p className="text-xs text-slate-400 mt-0.5">{allSignals.length} requiring attention</p>
          </div>
          <div className="divide-y divide-tungsten-border/50">
            {allSignals.map((signal, i) => (
              <div key={i} className="px-5 py-3 hover:bg-tungsten-border/20 transition-colors">
                <div className="flex items-start gap-2">
                  <SignalIcon type={signal.type} />
                  <div className="flex-1 min-w-0">
                    <Link href={`/accounts/${signal.accountId}`} className="text-xs font-semibold text-tungsten-gold hover:text-amber-300">
                      {signal.accountName}
                    </Link>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{signal.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program trackers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          { label: "Term Realignment", value: "$4.2M", target: "$28.5M", pct: 15, color: "bg-tungsten-gold" },
          { label: "Move Up Pipeline", value: "$850K", target: "FY26 Target", pct: 34, color: "bg-blue-500" },
          { label: "VE Engagements", value: "8 Active", target: "Q1 FY27", pct: 60, color: "bg-purple-500" },
        ].map(({ label, value, target, pct, color }) => (
          <div key={label} className="bg-tungsten-surface border border-tungsten-border rounded-xl p-5">
            <div className="text-xs text-slate-400 mb-1">{label}</div>
            <div className="text-xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-slate-500 mb-3">{target}</div>
            <div className="h-1.5 rounded-full bg-tungsten-border overflow-hidden">
              <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
            </div>
            <div className="text-xs text-slate-400 mt-1">{pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
