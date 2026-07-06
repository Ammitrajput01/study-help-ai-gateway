export function healthRoute(): Response {
  return Response.json({
    status: "healthy",
    ai: "connected",
  });
}