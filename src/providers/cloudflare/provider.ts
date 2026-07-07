import { chat, toHttpResponse } from "@tanstack/ai";
import type {
  AIProvider,
  ChatRequest,
} from "../interfaces/AIProvider";

import { createWorkerAI } from "../workers-ai";

export class CloudflareProvider implements AIProvider {

  constructor(
    private readonly env: Env
  ) {}

  async chat(
    request: ChatRequest
  ): Promise<Response> {

    const adapter = createWorkerAI(
      this.env,
      request.model
    );

    const response = await chat({
      adapter,
      stream: true,
      messages: request.messages,
    });

    return toHttpResponse(response);

  }

  async models(): Promise<string[]> {

    return [
      "@cf/zai-org/glm-5.2",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-32b",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
    ];

  }

}