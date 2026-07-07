export const MODELS = {
  DEFAULT: "@cf/zai-org/glm-5.2",

  GLM_52: "@cf/zai-org/glm-5.2",

  LLAMA_4: "@cf/meta/llama-4-scout-17b-16e-instruct",

  QWEN_3: "@cf/qwen/qwen3-32b",

  DEEPSEEK_R1: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
} as const;

export type ModelName =
  (typeof MODELS)[keyof typeof MODELS];