import { MODELS } from "../config/models";

export function modelsRoute(): Response {
  const uniqueModels = [...new Set(Object.values(MODELS))];

  return Response.json({
    object: "list",
    data: uniqueModels.map((model) => ({
      id: model,
      object: "model",
      owned_by: "Cloudflare",
    })),
  });
}