import 'server-only';

import {
  parseResumeQaModelOutputText,
  ResumeQaProviderConfigError,
  ResumeQaProviderResponseError,
  type ResumeQaProvider,
} from './provider';

const DEFAULT_GEMINI_MODEL = 'gemini-3.1-flash-lite';
const DEFAULT_GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_TIMEOUT_MS = 15_000;
const GEMINI_THINKING_LEVELS = ['minimal', 'low', 'medium', 'high'] as const;

type GeminiThinkingLevel = (typeof GEMINI_THINKING_LEVELS)[number];

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getGeminiApiKey = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new ResumeQaProviderConfigError('GEMINI_API_KEY is missing.');
  }

  return apiKey;
};

const getGeminiModel = () =>
  (process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL).replace(/^models\//, '');

const getGeminiApiBaseUrl = () =>
  (process.env.GEMINI_API_BASE_URL || DEFAULT_GEMINI_API_BASE_URL).replace(/\/$/, '');

const getOptionalNumberEnv = (envName: string) => {
  const rawValue = process.env[envName]?.trim();
  if (!rawValue) return undefined;

  const value = Number(rawValue);

  if (!Number.isFinite(value)) {
    throw new ResumeQaProviderConfigError(`${envName} must be a finite number.`);
  }

  return value;
};

const getGeminiMaxOutputTokens = () => {
  const maxOutputTokens = getOptionalNumberEnv('GEMINI_MAX_OUTPUT_TOKENS');

  if (maxOutputTokens === undefined) return undefined;

  if (!Number.isInteger(maxOutputTokens) || maxOutputTokens <= 0) {
    throw new ResumeQaProviderConfigError('GEMINI_MAX_OUTPUT_TOKENS must be a positive integer.');
  }

  return maxOutputTokens;
};

const getGeminiTemperature = () => {
  const temperature = getOptionalNumberEnv('GEMINI_TEMPERATURE');

  if (temperature === undefined) return undefined;

  if (temperature < 0 || temperature > 2) {
    throw new ResumeQaProviderConfigError('GEMINI_TEMPERATURE must be between 0 and 2.');
  }

  return temperature;
};

const isGeminiThinkingLevel = (value: string): value is GeminiThinkingLevel =>
  GEMINI_THINKING_LEVELS.includes(value as GeminiThinkingLevel);

const getGeminiThinkingLevel = () => {
  const thinkingLevel = process.env.GEMINI_THINKING_LEVEL?.trim();

  if (!thinkingLevel) return undefined;

  if (!isGeminiThinkingLevel(thinkingLevel)) {
    throw new ResumeQaProviderConfigError(
      `GEMINI_THINKING_LEVEL must be one of: ${GEMINI_THINKING_LEVELS.join(', ')}.`
    );
  }

  return thinkingLevel;
};

const buildGeminiGenerationConfig = (responseSchema: unknown) => {
  const maxOutputTokens = getGeminiMaxOutputTokens();
  const temperature = getGeminiTemperature();
  const thinkingLevel = getGeminiThinkingLevel();

  return {
    ...(temperature !== undefined ? { temperature } : {}),
    ...(maxOutputTokens !== undefined ? { maxOutputTokens } : {}),
    responseMimeType: 'application/json',
    responseSchema,
    ...(thinkingLevel ? { thinkingConfig: { thinkingLevel } } : {}),
  };
};

const extractTextFromGeminiResponse = (value: unknown) => {
  if (!isPlainObject(value) || !Array.isArray(value.candidates)) {
    return null;
  }

  const [candidate] = value.candidates;

  if (!isPlainObject(candidate) || !isPlainObject(candidate.content)) {
    return null;
  }

  const parts = candidate.content.parts;

  if (!Array.isArray(parts)) {
    return null;
  }

  const text = parts
    .map(part => (isPlainObject(part) && typeof part.text === 'string' ? part.text : ''))
    .join('')
    .trim();

  return text || null;
};

export const geminiResumeQaProvider: ResumeQaProvider = {
  name: 'gemini',

  async generateModelOutput({ systemInstruction, prompt, responseSchema }) {
    const apiKey = getGeminiApiKey();
    const model = getGeminiModel();
    const apiBaseUrl = getGeminiApiBaseUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

    try {
      const response = await fetch(`${apiBaseUrl}/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: buildGeminiGenerationConfig(responseSchema),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new ResumeQaProviderResponseError(
          `Gemini request failed with status ${response.status}.`
        );
      }

      const responseBody: unknown = await response.json();
      const text = extractTextFromGeminiResponse(responseBody);

      if (!text) {
        throw new ResumeQaProviderResponseError('Gemini response text is empty.');
      }

      return parseResumeQaModelOutputText(text, 'Gemini');
    } catch (error) {
      if (
        error instanceof ResumeQaProviderConfigError ||
        error instanceof ResumeQaProviderResponseError
      ) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new ResumeQaProviderResponseError('Gemini request timed out.');
      }

      throw new ResumeQaProviderResponseError('Gemini request failed.');
    } finally {
      clearTimeout(timeoutId);
    }
  },
};
