export function cleanAIStream(
  stream: ReadableStream
): ReadableStream {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {

      const reader = stream.getReader();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          controller.close();
          break;
        }

        const text = decoder.decode(value);

        const lines = text
          .split("\n")
          .filter(Boolean);

        for (const line of lines) {

          try {
            const json = JSON.parse(line);

            if (
              json.type === "TEXT_MESSAGE_CONTENT"
            ) {

              controller.enqueue(
                encoder.encode(
                  JSON.stringify({
                    type: "TEXT_MESSAGE_CONTENT",
                    delta: json.delta,
                  }) + "\n"
                )
              );

            }

          } catch {
            // ignore invalid chunks
          }
        }
      }
    },
  });
}