import { cn } from "@/lib/utils";
import type { RAG } from "@/lib/types";

const styles: Record<RAG, string> = {
  green: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  red: "bg-red-500/20 text-red-400 border-red-500/30",
};

const labels: Record<RAG, string> = {
  green: "On Track",
  amber: "Attention",
  red: "At Risk",
};

const dots: Record<RAG, string> = {
  green: "bg-emerald-400",
  amber: "bg-amber-400",
  red: "bg-red-400",
};

export default function RagBadge({ rag, showDot = true }: { rag: RAG; showDot?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border", styles[rag])}>
      {showDot && <span className={cn("w-1.5 h-1.5 rounded-full", dots[rag])} />}
      {labels[rag]}
    </span>
  );
}
