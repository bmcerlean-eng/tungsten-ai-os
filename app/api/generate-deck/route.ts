import { getAccount } from "@/lib/seed-data";
import { formatARR, formatDate, daysUntil } from "@/lib/utils";
// @ts-ignore — pptxgenjs types
import PptxGenJS from "pptxgenjs";

const NAVY = "002855";
const GOLD = "F5A623";
const DARK = "0D1B2A";
const WHITE = "FFFFFF";
const LIGHT_GRAY = "F8F9FC";
const BORDER_GRAY = "E5E9F0";

export async function POST(req: Request) {
  const { accountId } = await req.json();
  const account = getAccount(accountId);

  if (!account) {
    return new Response(JSON.stringify({ error: "Account not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";

  const today = new Date().toISOString().split("T")[0];
  const renewal = daysUntil(account.renewalDate);
  const renewalLabel = renewal < 0 ? "Expired" : renewal <= 30 ? `⚠ ${renewal} days` : `${renewal} days`;

  // ── Slide 1: Title ───────────────────────────────────────────────
  const s1 = pptx.addSlide();
  s1.background = { color: NAVY };

  // Gold accent bar
  s1.addShape("rect", { x: 0, y: 4.5, w: 10, h: 0.08, fill: { color: GOLD }, line: { color: GOLD } });

  // Account name
  s1.addText(account.name, {
    x: 0.6, y: 1.4, w: 8.8, h: 1.2,
    fontSize: 38, bold: true, color: WHITE, align: "left",
  });

  // Subtitle
  s1.addText(`Account Briefing  ·  ${formatDate(today)}`, {
    x: 0.6, y: 2.8, w: 8.8, h: 0.5,
    fontSize: 16, color: GOLD, align: "left",
  });

  // Exec sponsor
  s1.addText(`Prepared by: ${account.execSponsorTungsten}`, {
    x: 0.6, y: 3.4, w: 8.8, h: 0.4,
    fontSize: 13, color: "AABBCC", align: "left",
  });

  // Footer
  s1.addText("TUNGSTEN AUTOMATION  ·  CONFIDENTIAL", {
    x: 0.6, y: 4.9, w: 8.8, h: 0.3,
    fontSize: 9, color: "7799AA", align: "left",
  });

  // ── Helper: content slide ────────────────────────────────────────
  const addSlide = (title: string, items: { label?: string; text: string }[]) => {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    // Top accent bar
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.1, fill: { color: GOLD }, line: { color: GOLD } });
    // Title background strip
    s.addShape("rect", { x: 0, y: 0.1, w: 10, h: 0.75, fill: { color: LIGHT_GRAY }, line: { color: BORDER_GRAY } });
    // Title text
    s.addText(title, {
      x: 0.5, y: 0.12, w: 9, h: 0.7,
      fontSize: 20, bold: true, color: NAVY, valign: "middle",
    });
    // Content
    const textData = items.map((item) => [
      ...(item.label ? [{ text: item.label + "  ", options: { bold: true, color: NAVY, fontSize: 13 } }] : []),
      { text: item.text, options: { color: DARK, fontSize: 13 } },
      { text: "\n", options: { fontSize: 6 } },
    ]).flat();
    s.addText(textData, {
      x: 0.5, y: 1.05, w: 9, h: 4.2,
      fontSize: 13, valign: "top",
    });
    // Page number footer
    s.addText("TUNGSTEN AUTOMATION  ·  CONFIDENTIAL", {
      x: 0.5, y: 5.0, w: 9, h: 0.25,
      fontSize: 8, color: "AABBCC", align: "right",
    });
    return s;
  };

  // ── Slide 2: Account Status ──────────────────────────────────────
  const ragColor = account.rag === "red" ? "DC2626" : account.rag === "amber" ? "D97706" : "16A34A";
  const ragLabel = account.rag === "red" ? "AT RISK" : account.rag === "amber" ? "NEEDS ATTENTION" : "ON TRACK";

  addSlide("Account Status", [
    { label: "RAG Status:", text: ragLabel },
    { label: "Total ARR:", text: formatARR(account.arrTotal) },
    { label: "Renewal Date:", text: `${formatDate(account.renewalDate)} — ${renewalLabel}` },
    { label: "Industry:", text: account.industry },
    { label: "Region:", text: account.region },
    { label: "Satisfaction:", text: `${account.intelligence.satisfactionRating ?? "Unknown"}/5` },
    { label: "Usage Rate:", text: `${account.intelligence.usageRate ?? "Unknown"}%` },
    { label: "Intelligence Score:", text: `${account.intelligence.completenessScore}% complete` },
    { label: "Last QBR:", text: formatDate(account.lastQbrDate) },
    { label: "Last Contact:", text: formatDate(account.lastContactDate) },
  ]);

  // ── Slide 3: Relationship Map ────────────────────────────────────
  addSlide("Relationship Map", account.intelligence.relationships.map((r) => ({
    label: r.type + ":",
    text: `${r.contact}  [${r.status.toUpperCase()}]  —  ${r.notes}`,
  })));

  // ── Slide 4: Active Signals & Risks ─────────────────────────────
  addSlide("Key Risks & Active Signals", [
    ...account.signals.map((s) => ({ text: s.detail })),
    { label: "Key Problems:", text: account.intelligence.keyProblems },
    { label: "Help Needed:", text: account.intelligence.helpNeeded },
  ]);

  // ── Slide 5: Strategic Opportunity ──────────────────────────────
  addSlide("Strategic Opportunity", [
    { label: "Strategy Plays:", text: account.intelligence.strategyPlays.map((p) => p.replace(/_/g, " ")).join("  ·  ") },
    { label: "Strategy Notes:", text: account.intelligence.strategyNotes },
    { label: "Pipeline:", text: account.intelligence.pipelineAlignment || "—" },
  ]);

  // ── Slide 6: Recommended Actions ────────────────────────────────
  addSlide("Recommended Actions — Next 30 Days", [
    { text: `1.  Confirm renewal intent and timeline with ${account.execSponsorCustomer}` },
    { text: "2.  Close any open Infosec / AI Lab relationship gaps (see Relationship Map)" },
    { text: "3.  Prepare business case addressing Procurement price sensitivity" },
    { text: `4.  Schedule Executive Top-to-Top (last: ${formatDate(account.intelligence.lastTopToTopDate ?? null)})` },
    { text: "5.  Advance Move Up / expansion opportunity with product team" },
  ]);

  // ── Slide 7: Revenue Breakdown ───────────────────────────────────
  addSlide("Revenue by Product", account.revenue.map((r) => ({
    label: r.product + ":",
    text: `${formatARR(r.arrCurrent)}  ·  ${r.pillar}  ·  ${r.contractType}  ·  ends ${formatDate(r.contractEndDate)}`,
  })));

  // ── Slide 8: Exec Sponsors ───────────────────────────────────────
  addSlide("Key Contacts", [
    { label: "Tungsten Exec Sponsor:", text: account.execSponsorTungsten },
    { label: "Customer Exec Sponsor:", text: account.execSponsorCustomer },
    ...account.intelligence.relationships.filter((r) => r.status !== "gap").map((r) => ({
      label: r.type + ":",
      text: `${r.contact}  —  ${r.notes}`,
    })),
  ]);

  // ── Generate buffer ──────────────────────────────────────────────
  const buffer = (await pptx.write({ outputType: "nodebuffer" })) as Buffer;
  const safeName = account.name.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

  return new Response(arrayBuffer as ArrayBuffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "Content-Disposition": `attachment; filename="Briefing - ${safeName} - ${today}.pptx"`,
    },
  });
}
