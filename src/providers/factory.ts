import type { AIProvider } from "./interfaces/AIProvider";
import { CloudflareProvider } from "./cloudflare/provider";

export class ProviderFactory {

  static create(
    provider: string,
    env: Env
  ): AIProvider {

    switch (provider.toLowerCase()) {

      case "cloudflare":
        return new CloudflareProvider(env);

      default:
        throw new Error(
          `Provider '${provider}' not supported.`
        );

    }

  }

}