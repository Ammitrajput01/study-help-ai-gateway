import { chat, toHttpResponse } from "@tanstack/ai";
import { createWorkerAI } from "../providers/workers-ai";
import { MODELS } from "../config/models";
import { aiStreamResponse } from "../utils/response";

export async function chatRoute(
  request: Request,
  env: Env
): Promise<Response> {
  const body = (await request.json()) as {
    model?: string;
    messages: {
      role: "system" | "user" | "assistant";
      content: string;
    }[];
  };

  const model = body.model ?? MODELS.DEFAULT;

  const adapter = createWorkerAI(env, model);

  const response = await chat({
    adapter,
    stream: true,
    messages: body.messages,
  });

  return aiStreamResponse(
    toHttpResponse(response)
  );
}