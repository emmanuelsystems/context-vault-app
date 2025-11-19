export interface LLMConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export abstract class LLMProvider {
  protected config: LLMConfig;

  constructor(config: LLMConfig = {}) {
    this.config = {
      temperature: 0.7,
      maxTokens: 2000,
      topP: 1.0,
      ...config,
    };
  }

  abstract generate(prompt: string, config?: Partial<LLMConfig>): Promise<LLMResponse>;

  abstract getName(): string;
}
