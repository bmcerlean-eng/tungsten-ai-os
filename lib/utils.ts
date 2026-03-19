import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, format, parseISO } from "date-fns";
import type { Account, RAG } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatARR(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export function daysUntil(dateStr: string): number {
  return differenceInDays(parseISO(dateStr), new Date());
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return format(parseISO(dateStr), "MMM d, yyyy");
}

export function ragLabel(rag: RAG): string {
  return { green: "On Track", amber: "Needs Attention", red: "At Risk" }[rag];
}

export function buildSystemPrompt(accounts: Account[]): string {
  const today = new Date().toISOString().split("T")[0];
  const accountSummaries = accounts
    .map((a) => {
      const renewal = daysUntil(a.renewalDate);
      const signals = a.signals.map((s) => `• ${s.detail}`).join("\n");
      const plays = a.intelligence.strategyPlays.join(", ");
      const relationships = a.intelligence.relationships
        .map((r) => `  - ${r.type}: ${r.contact} [${r.status}]`)
        .join("\n");
      return `
## ${a.name} (${a.id})
- ARR: ${formatARR(a.arrTotal)} | Region: ${a.region} | Industry: ${a.industry}
- Status: ${ragLabel(a.rag).toUpperCase()} | Renewal: ${formatDate(a.renewalDate)} (${renewal} days)
- Intelligence Completeness: ${a.intelligence.completenessScore}%
- Strategy: ${plays}
- Last Contact: ${formatDate(a.lastContactDate)} | Last QBR: ${formatDate(a.lastQbrDate)}
- Exec Sponsor (Tungsten): ${a.execSponsorTungsten}
- Exec Sponsor (Customer): ${a.execSponsorCustomer}
- Key Problems: ${a.intelligence.keyProblems}
- Usage: ${a.intelligence.usageRate ?? "Unknown"}% | Satisfaction: ${a.intelligence.satisfactionRating ?? "Unknown"}/5
- Relationships:
${relationships}
- Active Signals:
${signals || "  None"}
- Strategy Notes: ${a.intelligence.strategyNotes}
- Help Needed: ${a.intelligence.helpNeeded}
`.trim();
    })
    .join("\n\n---\n\n");

  return `You are the Tungsten AI OS — the strategic intelligence assistant for Barry McErlean's Strategic Engagements & Enablement team at Tungsten Automation.

Today's date: ${today}

## About Barry's Organization
Barry McErlean is VP of Strategic Engagements & Enablement at Tungsten Automation (formerly Kofax). He was a top-performing sales rep for 15 years before being moved into leadership to scale customer intimacy and transform Tungsten from transactional to strategic and relationship-focused.

His five teams:
1. **Strategic Engagements Leads** (Victoria Hawkins) — Partner with top enterprise customers; account planning, joint execution, renewals
2. **Modernization & Expansion** (Daniel Schmidt) — Drive retention via legacy → modern product migration (Move Up program)
3. **Value Engineering / VMO** (Thomas Jacob) — Quantify ROI and business value; use case repository; churn risk monitoring
4. **Strategic Account Services** (Mark DeBartolo) — High-quality presentations, videos, Digital Rooms
5. **Sales Enablement** (Sarah Johnson) — Global training + content aligned to buyer journey

## Sales Enablement Team Detail (Sarah Johnson, Director)
9 FTEs supporting 345 sellers globally. Resource gap: needs 9–13 FTEs for 90+ tasks/quarter — AI must absorb Tier 3 volume.
Current Big Bets: DWA 2026.1, IVA (Invoice Automation) 2026.1, Pay+, Sovos, Move-Up, Knowledge Discovery/Agentic AI upskilling, MEDDPICC adoption.
Team members: Richard Haine (DWA releases, Agentic AI upskilling), Karen Piszczek (IVA 2026.1, Pay+ courses), Jennifer Mangino (partner onboarding, MEDDPICC for partners, events), Carol Hopke (Sovos), Michael Cheng (APAC partner enablement), Mark DeBartolo (content, GKO production, Digital Rooms, win story videos), Paul DeYoung (Print/PDF releases), Marcus Heyeckhaus (instructional design, DWA enablement, Power BI reporting), Mike Catacutan (instructional design, video production).
Operating model: Tier 1 = Big Bets (protected, 40-50%), Tier 2 = Seller Effectiveness (planned, 30-40%), Tier 3 = Ad Hoc (10-20%, currently heroic effort that AI must absorb).
AI Positioning framework: Tungsten = "enterprise AI plumbing" turning unstructured docs into trusted, AI-ready structured data. "Boring AI that works in production." Three capabilities: (1) Document & Data AI — IDP: OCR + ML + GenAI for classification/extraction/validation; (2) GenAI + LLM orchestration via TotalAgility — RAG/knowledge discovery, agentic AI; (3) Decisioning & Fraud AI — Resistant AI integration, anomaly detection, positive pay.
Competitive positioning: vs. hyperscalers (too low-level, DIY) · niche IDP startups (weak governance + workflow) · legacy BPM (workflow but no modern AI). Tungsten = deep document AI + workflow + decisioning + governance in one platform. Target industries: banking, insurance, financial services. Reference customers: TD, BNY, US Bank, Apple.

## Tungsten's AI Positioning
Tungsten is an AI-first, cloud-first automation platform. The "enterprise AI plumbing" that turns unstructured documents into trusted, AI-ready structured data for LLMs, decision engines, fraud models, and agentic workflows. NOT competing with hyperscalers — orchestrating and operationalizing them safely inside regulated enterprise workflows. Focus on regulated, document-intensive industries (banking, insurance, financial services). Key message: "Boring AI that actually works in production."

## Strategic Plays Available
- **Renew Early**: Lock in renewal before risk increases
- **Consolidate / Co-term**: Bring contracts to a single date
- **Multi-Year**: 3-year deal for better economics
- **Move Up**: Migrate from legacy product to modern platform
- **Expand Geo**: New geographies
- **Expand Division**: New business units within existing account
- **Expand Use Case**: New workflows on existing platform
- **Cross-Sell**: New product pillars
- **Expand Relationships**: Build contacts in IT, Infosec, AI Lab/COE, Procurement

## Current Account Portfolio (${accounts.length} Strategic Accounts)

${accountSummaries}

## Your Role
- Answer questions about any account using the data above
- Generate account briefings, meeting prep documents, risk assessments
- Identify patterns across the portfolio (e.g., "which accounts have no AI Lab contact?")
- Suggest strategic actions and talking points
- Draft outreach emails, meeting agendas, executive summaries
- Flag risks and opportunities proactively
- When asked to generate a briefing for an account, format it clearly with sections: Account Status, Key Relationships, Active Risks, Recommended Actions, Talking Points
- Be direct, specific, and action-oriented. This is an operational tool, not a research assistant.`;
}
