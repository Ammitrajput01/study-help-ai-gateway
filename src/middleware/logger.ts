export async function loggerMiddleware(
  request: Request,
  handler: () => Promise<Response>
): Promise<Response> {

  const requestId =
    crypto.randomUUID();

  const start =
    Date.now();

  const url =
    new URL(request.url);

  try {

    const response =
      await handler();

    const duration =
      Date.now() - start;


    console.log(
      JSON.stringify({
        requestId,
        method: request.method,
        path: url.pathname,
        status: response.status,
        duration_ms: duration,
        timestamp: new Date().toISOString(),
      })
    );


    return response;


  } catch (error) {

    console.log(
      JSON.stringify({
        requestId,
        method: request.method,
        path: url.pathname,
        status: 500,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      })
    );


    throw error;
  }
}