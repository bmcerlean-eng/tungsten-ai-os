import Link from "next/link";
import { ACCOUNTS } from "@/lib/seed-data";
import { formatARR, formatDate, daysUntil } from "@/lib/utils";
import RagBadge from "@/components/rag-badge";

export default function SELeadsPage() {
  const seAccounts = ACCOUNTS.filter((a) => a.execSponsorTungsten === "Victoria Hawkins");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Team Agent</div>
        <h1 className="text-xl font-bold text-tungsten-navy">Strategic Engagements</h1>
        <p className="text-sm text-gray-400 mt-1">Victoria Hawkins · {seAccounts.length} accounts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total ARR", value: formatARR(seAccounts.reduce((s, a) => s + a.arrTotal, 0)) },
          { label: "At Risk", value: seAccounts.filter((a) => a.rag === "red").length },
          { label: "Renewing ≤120d", value: seAccounts.filter((a) => daysUntil(a.renewalDate) <= 120).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-tungsten-border rounded-xl p-4 shadow-sm">
            <div className="text-xs text-gray-400 font-medium mb-1">{label}</div>
            <div className="text-xl font-bold text-tungsten-navy">{value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b border-tungsten-border bg-tungsten-surface text-sm font-semibold text-tungsten-navy">Account List</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-tungsten-border bg-tungsten-surface">
              {["Account", "ARR", "Status", "Renewal", "Strategy", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seAccounts.map((a) => (
              <tr key={a.id} className="border-b border-tungsten-border/60 hover:bg-tungsten-surface transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                <td className="px-4 py-3 text-tungsten-navy font-semibold">{formatARR(a.arrTotal)}</td>
                <td className="px-4 py-3"><RagBadge rag={a.rag} /></td>
                <td className="px-4 py-3 text-sm text-gray-600">{formatDate(a.renewalDate)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {a.intelligence.strategyPlays.slice(0, 2).map((p) => (
                      <span key={p} className="px-1.5 py-0.5 rounded bg-tungsten-navy/5 border border-tungsten-navy/20 text-[10px] text-tungsten-navy font-medium">
                        {p.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/accounts/${a.id}`} className="text-xs text-tungsten-navy hover:text-tungsten-blue font-semibold">View →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
