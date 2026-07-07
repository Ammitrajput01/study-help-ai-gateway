import { createWorkersAiChat } from "@cloudflare/tanstack-ai";

export function createWorkerAI(
  env: Env,
  model: string
) {
  return createWorkersAiChat(model, {
    binding: env.AI,
  });
}