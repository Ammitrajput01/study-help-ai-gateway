import { loggerMiddleware } from "./middleware/logger";
import { authMiddleware } from "./middleware/auth";
import { chatRoute } from "./routes/chat";
import { completionsRoute } from "./routes/completions";
import { healthRoute } from "./routes/health";
import { modelsRoute } from "./routes/models";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {

  return loggerMiddleware(
    request,
    async () => {
    try {

      // API Key Authentication
      const authError = authMiddleware(request);

      if (authError) {
        return authError;
      }

      const url = new URL(request.url);

      // Root endpoint
      if (url.pathname === "/") {
        return Response.json({
          success: true,
          name: "AI Gateway",
          version: "1.0.0",
          status: "running",
          model: "@cf/zai-org/glm-5.2",
        });
      }

      // Health endpoint
      if (url.pathname === "/health") {
        return healthRoute();
      }

      // OpenAI-compatible Models endpoint
      if (url.pathname === "/v1/models") {
        return modelsRoute();
      }

      // OpenAI-compatible Chat Completions
      if (url.pathname === "/v1/chat/completions") {

        if (request.method !== "POST") {
          return new Response("Method Not Allowed", {
            status: 405,
          });
        }

        return await completionsRoute(request, env);
      }


      // Chat endpoint
      if (url.pathname === "/chat") {

        if (request.method !== "POST") {
          return new Response("Method Not Allowed", {
            status: 405,
          });
        }

        return await chatRoute(request, env);
      }


      // Unknown route
      return new Response("Not Found", {
        status: 404,
      });


    } catch (error) {

      console.error(error);

      return Response.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Unknown error",
        },
        {
          status: 500,
        }
      );
    }
     }
  );
}
} satisfies ExportedHandler<Env>;