import { ACCOUNTS } from "@/lib/seed-data";
import { formatARR } from "@/lib/utils";
import Link from "next/link";

export default function ValueEngineeringPage() {
  const veAccounts = ACCOUNTS.filter((a) =>
    a.intelligence.strategyPlays.some((p) => p.includes("value") || p.includes("expand"))
  );
  const atRisk = ACCOUNTS.filter((a) => a.rag === "red" || a.rag === "amber");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Team Agent</div>
        <h1 className="text-xl font-bold text-tungsten-navy">Value Engineering</h1>
        <p className="text-sm text-gray-400 mt-1">Thomas Jacob · VMO · ROI quantification & value risk monitoring</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Active VE Engagements", value: "8" },
          { label: "Accounts Needing VE", value: atRisk.length },
          { label: "Avg ROI Delivered", value: "4.2×" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-tungsten-border rounded-xl p-4 shadow-sm">
            <div className="text-xs text-gray-400 font-medium mb-1">{label}</div>
            <div className="text-xl font-bold text-tungsten-navy">{value}</div>
          </div>
        ))}
      </div>

      {/* Value risk accounts */}
      <div className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="px-5 py-3 border-b border-tungsten-border bg-tungsten-surface">
          <h2 className="text-sm font-semibold text-tungsten-navy">Value Risk — Red & Amber Accounts</h2>
          <p className="text-xs text-gray-400 mt-0.5">Accounts where value delivery evidence is needed</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-tungsten-border bg-tungsten-surface">
              {["Account", "ARR", "Usage Rate", "Satisfaction", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {atRisk.map((a) => (
              <tr key={a.id} className="border-b border-tungsten-border/60 hover:bg-tungsten-surface transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                <td className="px-4 py-3 font-semibold text-tungsten-navy">{formatARR(a.arrTotal)}</td>
                <td className="px-4 py-3 text-gray-600">{a.intelligence.usageRate != null ? `${a.intelligence.usageRate}%` : "—"}</td>
                <td className="px-4 py-3 text-gray-600">{a.intelligence.satisfactionRating != null ? `${a.intelligence.satisfactionRating}/5` : "—"}</td>
                <td className="px-4 py-3">
                  <Link href={`/accounts/${a.id}`} className="text-xs text-tungsten-navy hover:text-tungsten-blue font-semibold">View →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Coming soon */}
      <div className="bg-tungsten-surface border border-tungsten-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-tungsten-navy mb-2">Coming in Phase 2</h3>
        <ul className="text-sm text-gray-500 space-y-1.5">
          <li>· ROI Assessment first draft generator (Claude + L3 Calculator + use case library)</li>
          <li>· Value Risk Dashboard — promised ROI vs. delivery evidence per account</li>
          <li>· Churn Signal Digest — weekly alert for accounts crossing 2+ risk thresholds</li>
          <li>· Intervention brief generator — for accounts entering high-risk status</li>
          <li>· VE Pipeline dashboard by region, stage, deal size, velocity</li>
          <li>· Case study generator using Citi/Maritz as structural templates</li>
        </ul>
      </div>
    </div>
  );
}
