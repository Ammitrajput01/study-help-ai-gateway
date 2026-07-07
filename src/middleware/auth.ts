import { SETTINGS } from "../config/settings";

export function authMiddleware(
  request: Request
): Response | null {

  if (!SETTINGS.REQUIRE_AUTH) {
    return null;
  }

  const authHeader =
    request.headers.get("Authorization");

  if (!authHeader) {
    return Response.json(
      {
        success: false,
        error: "Missing API key",
      },
      {
        status: 401,
      }
    );
  }


  const token = authHeader.replace(
    "Bearer ",
    ""
  );


  if (!SETTINGS.API_KEYS.includes(token)) {
    return Response.json(
      {
        success: false,
        error: "Invalid API key",
      },
      {
        status: 401,
      }
    );
  }


  return null;
}