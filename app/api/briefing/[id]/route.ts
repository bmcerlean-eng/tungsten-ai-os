import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { getAccount, ACCOUNTS } from "@/lib/seed-data";
import { buildSystemPrompt, formatARR, formatDate, daysUntil } from "@/lib/utils";

export const maxDuration = 60;

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const account = getAccount(id);

  if (!account) {
    return new Response("Account not found", { status: 404 });
  }

  const renewal = daysUntil(account.renewalDate);
  const revenueBreakdown = account.revenue
    .map((r) => `  - ${r.pillar} / ${r.product}: ${formatARR(r.arrCurrent)} (ends ${formatDate(r.contractEndDate)})`)
    .join("\n");

  const relationshipStatus = account.intelligence.relationships
    .map((r) => `  - ${r.type}: ${r.contact} [${r.status.toUpperCase()}] — ${r.notes}`)
    .join("\n");

  const signals = account.signals.map((s) => `  • ${s.detail}`).join("\n");

  const prompt = `Generate a pre-meeting executive briefing for ${account.name}.

Account data:
- Total ARR: ${formatARR(account.arrTotal)}
- Status: ${account.rag.toUpperCase()}
- Renewal: ${formatDate(account.renewalDate)} (${renewal} days from today)
- Intelligence Completeness: ${account.intelligence.completenessScore}%
- Last QBR: ${formatDate(account.lastQbrDate)}
- Last Contact: ${formatDate(account.lastContactDate)}
- Usage Rate: ${account.intelligence.usageRate ?? "Unknown"}%
- Satisfaction: ${account.intelligence.satisfactionRating ?? "Unknown"}/5

Revenue by product:
${revenueBreakdown}

Relationships:
${relationshipStatus}

Key problems: ${account.intelligence.keyProblems}
Strategy plays: ${account.intelligence.strategyPlays.join(", ")}
Strategy notes: ${account.intelligence.strategyNotes}
Active signals:
${signals}
Help needed: ${account.intelligence.helpNeeded}

Format the briefing with these exact sections:
# Account Briefing: ${account.name}

## Status Snapshot
[RAG status, ARR, renewal timeline, satisfaction]

## Relationship Map
[Who we know, relationship quality, critical gaps]

## Key Risks & Signals
[What needs attention right now]

## Strategic Opportunity
[What we're pursuing and why]

## Recommended Actions (Next 30 Days)
[Numbered, specific, actionable]

## Talking Points
[3-5 bullet points for the next conversation]

## Intelligence Gaps
[What we don't know that we should — with suggested actions to fill each gap]

Keep it concise, direct, and action-oriented. This is used in real customer meetings.`;

  const result = streamText({
    model: anthropic("claude-3-5-sonnet-20241022"),
    system: buildSystemPrompt(ACCOUNTS),
    messages: [{ role: "user", content: prompt }],
    maxTokens: 1500,
  });

  return result.toDataStreamResponse();
}
