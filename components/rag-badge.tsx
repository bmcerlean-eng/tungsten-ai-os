import { cn } from "@/lib/utils";
import type { RAG } from "@/lib/types";

const styles: Record<RAG, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

const labels: Record<RAG, string> = {
  green: "On Track",
  amber: "Attention",
  red: "At Risk",
};

const dots: Record<RAG, string> = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

export default function RagBadge({ rag, showDot = true }: { rag: RAG; showDot?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border", styles[rag])}>
      {showDot && <span className={cn("w-1.5 h-1.5 rounded-full", dots[rag])} />}
      {labels[rag]}
    </span>
  );
}
