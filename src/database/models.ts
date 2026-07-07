export interface ModelInfo {
  id: string;
  provider: string;

  capabilities: {
    chat: boolean;
    reasoning: boolean;
    coding: boolean;
    vision: boolean;
    embedding: boolean;
    functionCalling: boolean;
    longContext: boolean;
  };

  contextWindow: number;

  speed: 1 | 2 | 3 | 4 | 5;

  quality: 1 | 2 | 3 | 4 | 5;

  cost: 1 | 2 | 3 | 4 | 5;
}

export const MODEL_DATABASE: Record<string, ModelInfo> = {

  "@cf/zai-org/glm-5.2": {
    id: "@cf/zai-org/glm-5.2",
    provider: "cloudflare",

    capabilities: {
      chat: true,
      reasoning: true,
      coding: true,
      vision: false,
      embedding: false,
      functionCalling: true,
      longContext: true,
    },

    contextWindow: 128000,

    speed: 4,

    quality: 5,

    cost: 2,
  },

  "@cf/meta/llama-4-scout-17b-16e-instruct": {
    id: "@cf/meta/llama-4-scout-17b-16e-instruct",
    provider: "cloudflare",

    capabilities: {
      chat: true,
      reasoning: true,
      coding: true,
      vision: true,
      embedding: false,
      functionCalling: true,
      longContext: true,
    },

    contextWindow: 128000,

    speed: 5,

    quality: 4,

    cost: 2,
  },

  "@cf/qwen/qwen3-32b": {
    id: "@cf/qwen/qwen3-32b",
    provider: "cloudflare",

    capabilities: {
      chat: true,
      reasoning: true,
      coding: true,
      vision: false,
      embedding: false,
      functionCalling: true,
      longContext: true,
    },

    contextWindow: 128000,

    speed: 4,

    quality: 4,

    cost: 2,
  },

  "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b": {
    id: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
    provider: "cloudflare",

    capabilities: {
      chat: true,
      reasoning: true,
      coding: true,
      vision: false,
      embedding: false,
      functionCalling: true,
      longContext: true,
    },

    contextWindow: 128000,

    speed: 3,

    quality: 5,

    cost: 2,
  },
};