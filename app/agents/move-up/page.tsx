import { ACCOUNTS } from "@/lib/seed-data";
import { formatARR } from "@/lib/utils";
import Link from "next/link";

export default function MoveUpPage() {
  const moveUpAccounts = ACCOUNTS.filter((a) =>
    a.intelligence.strategyPlays.includes("move_up")
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Team Agent</div>
        <h1 className="text-xl font-bold text-tungsten-navy">Modernization & Expansion</h1>
        <p className="text-sm text-gray-400 mt-1">Daniel Schmidt · Legacy → Modern product migration</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Move Up Pipeline", value: "$850K" },
          { label: "Target Accounts", value: moveUpAccounts.length },
          { label: "FY26 Target", value: "TBD" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-tungsten-border rounded-xl p-4 shadow-sm">
            <div className="text-xs text-gray-400 font-medium mb-1">{label}</div>
            <div className="text-xl font-bold text-tungsten-navy">{value}</div>
          </div>
        ))}
      </div>

      {/* Move Up candidates */}
      <div className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="px-5 py-3 border-b border-tungsten-border bg-tungsten-surface">
          <h2 className="text-sm font-semibold text-tungsten-navy">Move Up Candidates</h2>
          <p className="text-xs text-gray-400 mt-0.5">Accounts with active Move Up strategy play</p>
        </div>
        {moveUpAccounts.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-400 text-sm">No Move Up candidates in current dataset</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-tungsten-border bg-tungsten-surface">
                {["Account", "ARR", "Industry", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {moveUpAccounts.map((a) => (
                <tr key={a.id} className="border-b border-tungsten-border/60 hover:bg-tungsten-surface transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                  <td className="px-4 py-3 font-semibold text-tungsten-navy">{formatARR(a.arrTotal)}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{a.industry}</td>
                  <td className="px-4 py-3">
                    <Link href={`/accounts/${a.id}`} className="text-xs text-tungsten-navy hover:text-tungsten-blue font-semibold">View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Coming soon */}
      <div className="bg-tungsten-surface border border-tungsten-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-tungsten-navy mb-2">Coming in Phase 2</h3>
        <ul className="text-sm text-gray-500 space-y-1.5">
          <li>· Move Up Readiness Score per account</li>
          <li>· Weekly prioritised outreach list with AI-drafted messages</li>
          <li>· Regional ARR dashboard (retained + incremental by region)</li>
          <li>· Forecast accuracy tracker (actual vs. forecast by quarter)</li>
        </ul>
      </div>
    </div>
  );
}
