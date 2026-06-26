import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import type { AIProvider } from '@/types';

export function createAIProvider(
  provider: AIProvider,
  apiKey: string,
  baseURL?: string
) {
  switch (provider) {
    case 'google':
      return createGoogleGenerativeAI({ apiKey });

    case 'openai':
      return createOpenAI({
        apiKey,
        ...(baseURL ? { baseURL } : {}),
      });

    case 'anthropic':
      return createAnthropic({ apiKey });

    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

export function getModel(
  provider: AIProvider,
  modelId: string,
  apiKey: string,
  baseURL?: string
) {
  const aiProvider = createAIProvider(provider, apiKey, baseURL);
  return aiProvider(modelId);
}