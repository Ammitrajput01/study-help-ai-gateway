import { MODELS } from "../config/models";

export function resolveModel(requestedModel?: string): string {
  if (!requestedModel) {
    return MODELS.DEFAULT;
  }

  const normalized = requestedModel.toLowerCase();

  switch (normalized) {
    case "glm":
    case "glm-5.2":
    case "@cf/zai-org/glm-5.2":
      return MODELS.GLM_52;

    case "llama":
    case "llama4":
    case "@cf/meta/llama-4-scout-17b-16e-instruct":
      return MODELS.LLAMA_4;

    case "qwen":
    case "qwen3":
    case "@cf/qwen/qwen3-32b":
      return MODELS.QWEN_3;

    case "deepseek":
    case "deepseek-r1":
    case "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b":
      return MODELS.DEEPSEEK_R1;

    default:
      return MODELS.DEFAULT;
  }
}