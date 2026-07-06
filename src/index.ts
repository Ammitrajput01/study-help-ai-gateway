import { createWorkersAiChat } from "@cloudflare/tanstack-ai";
import { chat, toHttpResponse } from "@tanstack/ai";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      // Health endpoint
      const url = new URL(request.url);

      if (url.pathname === "/") {
        return Response.json({
          success: true,
          name: "AI Gateway",
          version: "1.0.0",
          model: "@cf/zai-org/glm-5.2",
          status: "running"
        });
      }

      if (url.pathname === "/health") {
        return Response.json({
          status: "healthy",
          ai: "connected"
        });
      }

      if (request.method !== "POST") {
        return new Response("Use POST /chat", {
          status: 405,
        });
      }

      const body = await request.json() as {
        messages: {
          role: "system" | "user" | "assistant";
          content: string;
        }[];
      };

      const adapter = createWorkersAiChat(
        "@cf/zai-org/glm-5.2",
        {
          binding: env.AI,
        }
      );

      const response = await chat({
        adapter,
        stream: true,
        messages: body.messages,
        modelOptions: {
          reasoning_effort: "high",
        },
      });

      return toHttpResponse(response);

    } catch (error) {
      return Response.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
        {
          status: 500,
        }
      );
    }
  },
} satisfies ExportedHandler<Env>;