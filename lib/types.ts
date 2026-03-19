export type RAG = "green" | "amber" | "red";

export type StrategyPlay =
  | "renew_early"
  | "consolidate_coterm"
  | "multi_year"
  | "move_up"
  | "expand_geo"
  | "expand_division"
  | "expand_use_case"
  | "cross_sell"
  | "expand_relationships";

export type Pillar =
  | "Document & Workflow Automation"
  | "AP & AR Automation"
  | "Print & Workplace Automation"
  | "PDF & eSignature";

export interface AccountRevenue {
  pillar: Pillar;
  product: string;
  arrCurrent: number;
  contractEndDate: string | null;
  contractType: "SAAS" | "Subscription" | "Maintenance" | null;
}

export interface Relationship {
  type: "Business Sponsor" | "IT" | "Infosec" | "AI Lab/COE" | "Procurement";
  contact: string;
  status: "strong" | "developing" | "gap" | "unknown";
  notes: string;
}

export interface Signal {
  type: "renewal_approaching" | "stage_regression" | "contact_gap" | "news" | "expansion_ready";
  detail: string;
  date: string;
}

export interface AccountIntelligence {
  ownershipType: "regional" | "global";
  keyProblems: string;
  usageRate: number | null;
  satisfactionRating: number | null;
  satisfactionNotes: string;
  geographiesServed: string[];
  relationships: Relationship[];
  partnerOrDirect: "partner" | "direct";
  partnerNotes: string;
  lastTopToTopDate: string | null;
  strategyPlays: StrategyPlay[];
  strategyNotes: string;
  pipelineAlignment: string;
  helpNeeded: string;
  completenessScore: number;
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  region: "AMS" | "EMEA" | "APAC";
  arrTotal: number;
  renewalDate: string;
  rag: RAG;
  lastQbrDate: string | null;
  lastContactDate: string | null;
  execSponsorTungsten: string;
  execSponsorCustomer: string;
  revenue: AccountRevenue[];
  intelligence: AccountIntelligence;
  signals: Signal[];
}
