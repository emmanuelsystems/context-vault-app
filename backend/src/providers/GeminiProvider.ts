import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMProvider, LLMConfig, LLMResponse } from './LLMProvider';
import { config as appConfig } from '../config';

export class GeminiProvider extends LLMProvider {
  private client: GoogleGenerativeAI;
  private defaultModel: string;

  constructor(config: LLMConfig = {}) {
    super(config);

    if (!appConfig.llm.gemini.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    this.client = new GoogleGenerativeAI(appConfig.llm.gemini.apiKey);
    this.defaultModel = config.model || 'gemini-pro';
  }

  async generate(prompt: string, config?: Partial<LLMConfig>): Promise<LLMResponse> {
    const mergedConfig = { ...this.config, ...config };

    try {
      const model = this.client.getGenerativeModel({ 
        model: mergedConfig.model || this.defaultModel,
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        content: text,
        model: mergedConfig.model || this.defaultModel,
        usage: {
          prompt_tokens: 0, // Gemini doesn't provide token counts in the same way
          completion_tokens: 0,
          total_tokens: 0,
        },
      };
    } catch (error: any) {
      throw new Error(`Gemini API error: ${error.message}`);
    }
  }

  getName(): string {
    return 'Gemini';
  }
}
