import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { ACCOUNTS } from "@/lib/seed-data";
import { buildSystemPrompt } from "@/lib/utils";

export const maxDuration = 60;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const anthropic = createAnthropic({ apiKey });
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: buildSystemPrompt(ACCOUNTS),
    messages,
    maxTokens: 2048,
    onError: ({ error }) => {
      console.error("[chat stream error]", error);
    },
  });

  return result.toDataStreamResponse({
    getErrorMessage: (err) => {
      console.error("[chat response error]", err);
      return err instanceof Error ? err.message : "An error occurred";
    },
  });
}
