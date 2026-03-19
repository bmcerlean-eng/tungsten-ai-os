import { Users, Zap, BookOpen, Target, TrendingUp } from "lucide-react";

const TEAM = [
  { name: "Sarah Johnson", role: "Director, Sales Enablement", focus: "Strategy, RVP partnerships, MEDDPICC, Big Bets oversight", initials: "SJ" },
  { name: "Richard Haine", role: "Manager, Enablement", focus: "DWA releases, Agentic AI / Knowledge Discovery upskilling", initials: "RH" },
  { name: "Karen Piszczek", role: "Enablement Consultant", focus: "IVA 2026.1, Pay+ courses", initials: "KP" },
  { name: "Jennifer Mangino", role: "Program Manager", focus: "Partner onboarding, MEDDPICC for partners, event planning", initials: "JM" },
  { name: "Carol Hopke", role: "Enablement Specialist", focus: "Sovos integration enablement", initials: "CH" },
  { name: "Michael Cheng", role: "Partner Enablement", focus: "APAC region partner readiness", initials: "MC" },
  { name: "Mark DeBartolo", role: "Director, Content & Highspot", focus: "GKO production, Digital Rooms, win story videos", initials: "MD" },
  { name: "Paul DeYoung", role: "QC & Admin", focus: "Print / PDF product releases", initials: "PD" },
  { name: "Marcus Heyeckhaus", role: "Instructional Design", focus: "DWA release enablement, Power BI reporting", initials: "MH" },
  { name: "Mike Catacutan", role: "Instructional Design", focus: "Video production & editing", initials: "MC2" },
];

const BIG_BETS = [
  { label: "DWA 2026.1", owner: "Richard Haine", desc: "Document Workflow Automation release enablement — seller brief, talk track, Highspot update", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  { label: "IVA 2026.1", owner: "Karen Piszczek", desc: "Invoice Automation release — courses, partner readiness, field communications", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
  { label: "Pay+", owner: "Karen Piszczek", desc: "Pay+ product enablement courses and seller readiness package", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700" },
  { label: "Sovos", owner: "Carol Hopke", desc: "Sovos compliance integration enablement for the field", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
  { label: "Move-Up", owner: "Team", desc: "Seller enablement for legacy → modern product migration conversations", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
  { label: "Knowledge Discovery / Agentic AI", owner: "Richard Haine", desc: "Upskilling field to position Tungsten's agentic AI and knowledge discovery capabilities", bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700" },
  { label: "MEDDPICC Adoption", owner: "Sarah Johnson", desc: "Global MEDDPICC training and coaching content — Tier 2 seller effectiveness initiative", bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
];

const PRIORITY_PLAYS = [
  {
    number: "01",
    title: "AI Positioning Content Kit",
    desc: "Enable the field to confidently position Tungsten in the AI era. Core narrative: Tungsten is the 'enterprise AI plumbing' that turns unstructured documents into trusted, AI-ready structured data — boring AI that actually works in production.",
    outputs: [
      "Elevator pitch framework (IDP + GenAI + Decisioning)",
      "Competitive differentiation vs. hyperscalers / niche IDP / legacy BPM",
      "Objection handlers (\"Why not just use GPT-4?\")",
      "Customer-facing one-pager",
      "Reference story bank (TD, BNY, US Bank)",
    ],
  },
  {
    number: "02",
    title: "DWA Product Release Enablement",
    desc: "Seller readiness packages for each DWA release — drafted by Claude from product release notes, refined by Richard Haine, published to Highspot.",
    outputs: [
      "Seller brief (what changed, why it matters, how to sell it)",
      "Updated Highspot page",
      "Talk track",
      "Updated slides using 2026 brand template",
    ],
  },
  {
    number: "03",
    title: "AP/AR Product Release Enablement",
    desc: "Same package structure as DWA, aligned to AP/AR personas (AP Essentials, Invoices, Pay+). Karen Piszczek owns IVA and Pay+.",
    outputs: [
      "Seller brief",
      "Highspot page update",
      "Talk track",
      "Field communication draft",
    ],
  },
];

export default function EnablementPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Team Agent</div>
        <h1 className="text-xl font-bold text-tungsten-navy">Sales Enablement</h1>
        <p className="text-sm text-gray-400 mt-1">Sarah Johnson · Director, Sales Enablement · Highspot + Asana</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { value: "9", label: "FTEs (needs 9–13)", icon: Users, color: "text-tungsten-navy" },
          { value: "345", label: "Sellers supported globally", icon: TrendingUp, color: "text-emerald-600" },
          { value: "90+", label: "Distinct tasks per quarter", icon: Zap, color: "text-amber-500" },
        ].map(({ value, label, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-tungsten-border rounded-xl p-4 shadow-sm flex items-center gap-3">
            <Icon size={20} className={color} />
            <div>
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-gray-400">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Big Bets */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Target size={15} className="text-tungsten-gold" />
          <h2 className="text-sm font-semibold text-tungsten-navy uppercase tracking-wide">Big Bets — 2026 Strategic Initiatives</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BIG_BETS.map(({ label, owner, desc, bg, border, text }) => (
            <div key={label} className={`border rounded-xl p-4 ${bg} ${border}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-semibold ${text}`}>{label}</span>
                <span className="text-[10px] text-gray-400 font-medium">{owner}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Priority plays */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={15} className="text-tungsten-gold" />
          <h2 className="text-sm font-semibold text-tungsten-navy uppercase tracking-wide">Priority Agent Outputs (Phase 2)</h2>
        </div>
        {PRIORITY_PLAYS.map(({ number, title, desc, outputs }) => (
          <div key={number} className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-tungsten-border bg-tungsten-surface flex items-center gap-3">
              <span className="text-2xl font-bold text-tungsten-border select-none">{number}</span>
              <h3 className="text-sm font-semibold text-tungsten-navy">{title}</h3>
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

      {/* Team roster */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Users size={15} className="text-tungsten-gold" />
          <h2 className="text-sm font-semibold text-tungsten-navy uppercase tracking-wide">Team Roster</h2>
        </div>
        <div className="bg-white border border-tungsten-border rounded-xl overflow-hidden shadow-sm">
          <div className="divide-y divide-tungsten-border/60">
            {TEAM.map(({ name, role, focus, initials }) => (
              <div key={name} className="px-5 py-3 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-tungsten-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-tungsten-navy">{initials.replace(/\d/, "")}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{name}</div>
                  <div className="text-xs text-gray-400">{role}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{focus}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operating model */}
      <div className="bg-tungsten-surface border border-tungsten-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-tungsten-navy mb-3">Team Operating Model</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          {[
            { tier: "Tier 1", label: "Big Bets", desc: "Protected strategic initiatives. AI accelerates delivery, not replaces ownership.", pct: "40–50%" },
            { tier: "Tier 2", label: "Seller Effectiveness", desc: "Planned programs incl. MEDDPICC adoption. AI drafts coaching content and assessments.", pct: "30–40%" },
            { tier: "Tier 3", label: "Ad Hoc Requests", desc: "Currently heroic effort. AI absorbs the volume, freeing the team for Tier 1 & 2.", pct: "10–20%" },
          ].map(({ tier, label, desc, pct }) => (
            <div key={tier} className="bg-white border border-tungsten-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tier}</div>
                <div className="text-[10px] font-semibold text-tungsten-gold">{pct}</div>
              </div>
              <div className="text-sm font-semibold text-tungsten-navy mb-1">{label}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-semibold">Resource gap:</span> Team needs 9–13 FTEs to cover 90+ quarterly tasks at current demand.
            AI must absorb Tier 3 volume without adding headcount — this is the core case for the Enablement Agent.
          </p>
        </div>
      </div>
    </div>
  );
}
