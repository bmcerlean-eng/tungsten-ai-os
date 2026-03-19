import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { ACCOUNTS } from "@/lib/seed-data";
import { buildSystemPrompt } from "@/lib/utils";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = streamText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      system: buildSystemPrompt(ACCOUNTS),
      messages,
      maxTokens: 2048,
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error("[chat route error]", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
