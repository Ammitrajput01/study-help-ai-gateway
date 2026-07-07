import { chatRoute } from "./chat";

export async function completionsRoute(
  request: Request,
  env: Env
): Promise<Response> {
  return chatRoute(request, env);
}