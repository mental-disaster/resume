import 'server-only';

import {
  parseResumeQaModelOutputText,
  ResumeQaProviderConfigError,
  ResumeQaProviderResponseError,
  type ResumeQaProvider,
} from './provider';

const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash-lite';
const DEFAULT_GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_TIMEOUT_MS = 15_000;
const GEMINI_MAX_OUTPUT_TOKENS = 2048;

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
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS,
            responseMimeType: 'application/json',
            responseSchema,
          },
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
