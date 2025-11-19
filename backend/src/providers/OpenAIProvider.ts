import OpenAI from 'openai';
import { LLMProvider, LLMConfig, LLMResponse } from './LLMProvider';
import { config as appConfig } from '../config';

export class OpenAIProvider extends LLMProvider {
  private client: OpenAI;
  private defaultModel: string;

  constructor(config: LLMConfig = {}) {
    super(config);

    if (!appConfig.llm.openai.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    this.client = new OpenAI({
      apiKey: appConfig.llm.openai.apiKey,
    });

    this.defaultModel = config.model || 'gpt-4-turbo-preview';
  }

  async generate(prompt: string, config?: Partial<LLMConfig>): Promise<LLMResponse> {
    const mergedConfig = { ...this.config, ...config };

    try {
      const response = await this.client.chat.completions.create({
        model: mergedConfig.model || this.defaultModel,
        messages: [{ role: 'user', content: prompt }],
        temperature: mergedConfig.temperature,
        max_tokens: mergedConfig.maxTokens,
        top_p: mergedConfig.topP,
      });

      return {
        content: response.choices[0]?.message?.content || '',
        model: response.model,
        usage: {
          prompt_tokens: response.usage?.prompt_tokens || 0,
          completion_tokens: response.usage?.completion_tokens || 0,
          total_tokens: response.usage?.total_tokens || 0,
        },
      };
    } catch (error: any) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }

  getName(): string {
    return 'OpenAI';
  }
}
