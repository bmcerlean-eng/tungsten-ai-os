export default function EnablementPage() {
  const priorities = [
    {
      number: "01",
      title: "AI Positioning",
      desc: "Enable the field to confidently position Tungsten in the new world of AI. The core narrative: Tungsten is the 'enterprise plumbing' that turns unstructured documents into AI-ready structured data — boring AI that actually works in production.",
      outputs: ["Elevator pitch framework", "Competitive differentiation vs. hyperscalers / niche IDP / legacy BPM", "Objection handlers (\"Why not just use GPT-4?\")", "Customer-facing one-pager", "Reference story bank (TD, BNY, US Bank)"],
    },
    {
      number: "02",
      title: "DWA Product Releases",
      desc: "Document Workflow Automation release enablement. Seller readiness packages for each DWA release — drafted by Claude from product release notes.",
      outputs: ["Seller brief (what changed, why it matters, how to sell it)", "Updated Highspot page", "Talk track", "Updated slides using 2026 brand template"],
    },
    {
      number: "03",
      title: "AP/AR Product Releases",
      desc: "Accounts Payable / Accounts Receivable release enablement. Same package structure as DWA, aligned to AP/AR personas.",
      outputs: ["Seller brief", "Highspot page update", "Talk track", "Field communication draft"],
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Team Agent</div>
        <h1 className="text-xl font-bold text-tungsten-navy">Sales Enablement</h1>
        <p className="text-sm text-gray-400 mt-1">Sarah Johnson · Global enablement · Highspot + Asana</p>
      </div>

      {/* Priority areas */}
      <div className="space-y-4 mb-8">
        {priorities.map(({ number, title, desc, outputs }) => (
          <div key={number} className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-tungsten-border bg-tungsten-surface flex items-center gap-3">
              <span className="text-2xl font-bold text-tungsten-border select-none">{number}</span>
              <h2 className="text-sm font-semibold text-tungsten-navy">{title}</h2>
              <span className="ml-auto text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Phase 2</span>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{desc}</p>
              <div className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">Outputs</div>
              <ul className="space-y-1">
                {outputs.map((o) => (
                  <li key={o} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-tungsten-gold mt-0.5 flex-shrink-0">·</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Operational model */}
      <div className="bg-tungsten-surface border border-tungsten-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-tungsten-navy mb-3">Team Operating Model</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          {[
            { tier: "Tier 1", label: "Big Bets", desc: "Protected strategic initiatives. AI helps accelerate, not replace." },
            { tier: "Tier 2", label: "Seller Effectiveness", desc: "Planned programs incl. MEDDPICC adoption. AI drafts coaching content." },
            { tier: "Tier 3", label: "Ad Hoc Requests", desc: "Currently heroic effort. AI absorbs the volume, freeing the team for Tier 1 & 2." },
          ].map(({ tier, label, desc }) => (
            <div key={tier} className="bg-white border border-tungsten-border rounded-lg p-4">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{tier}</div>
              <div className="text-sm font-semibold text-tungsten-navy mb-1">{label}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
