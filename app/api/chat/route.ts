import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { ACCOUNTS } from "@/lib/seed-data";
import { buildSystemPrompt } from "@/lib/utils";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: buildSystemPrompt(ACCOUNTS),
    messages,
    maxTokens: 2048,
  });

  return result.toDataStreamResponse();
}
