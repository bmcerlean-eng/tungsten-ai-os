import { ACCOUNTS } from "@/lib/seed-data";
import { formatARR, formatDate, daysUntil } from "@/lib/utils";
import RagBadge from "@/components/rag-badge";
import Link from "next/link";

export default function AccountsPage() {
  const sorted = [...ACCOUNTS].sort((a, b) => {
    const ragOrder = { red: 0, amber: 1, green: 2 };
    return ragOrder[a.rag] - ragOrder[b.rag] || daysUntil(a.renewalDate) - daysUntil(b.renewalDate);
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Strategic Accounts</h1>
        <p className="text-sm text-slate-400 mt-1">{ACCOUNTS.length} accounts · Click any account to view detail and generate a briefing</p>
      </div>
      <div className="bg-tungsten-surface border border-tungsten-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-tungsten-border">
              {["Account", "Region", "ARR", "Status", "Renewal", "Intelligence", "Signals", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((account) => {
              const days = daysUntil(account.renewalDate);
              return (
                <tr key={account.id} className="border-b border-tungsten-border/40 hover:bg-tungsten-border/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{account.name}</div>
                    <div className="text-xs text-slate-500">{account.industry}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-300 text-xs">{account.region}</td>
                  <td className="px-4 py-3 font-semibold text-tungsten-gold">{formatARR(account.arrTotal)}</td>
                  <td className="px-4 py-3"><RagBadge rag={account.rag} /></td>
                  <td className="px-4 py-3">
                    <div className={`text-sm font-medium ${days <= 60 ? "text-red-400" : days <= 120 ? "text-amber-400" : "text-slate-300"}`}>
                      {formatDate(account.renewalDate)}
                    </div>
                    <div className="text-xs text-slate-500">{days}d</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 rounded-full bg-tungsten-border overflow-hidden">
                        <div
                          className={`h-full rounded-full ${account.intelligence.completenessScore >= 80 ? "bg-emerald-500" : account.intelligence.completenessScore >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${account.intelligence.completenessScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">{account.intelligence.completenessScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${account.signals.length > 0 ? "text-amber-400" : "text-slate-600"}`}>
                      {account.signals.length > 0 ? `${account.signals.length} active` : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/accounts/${account.id}`} className="text-xs text-tungsten-gold hover:text-amber-300 font-medium">
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
  );
}
