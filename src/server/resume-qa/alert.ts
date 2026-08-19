import 'server-only';

const ALERT_COOLDOWN_MS = 10 * 60 * 1_000;
const WEBHOOK_TIMEOUT_MS = 1_000;

let lastWebhookAtMs = 0;

export const notifyResumeQaDegraded = async (reason: string) => {
  const message = `[resume-qa] rate limit store degraded: ${reason}`;

  console.error(message);

  const url = process.env.RESUME_QA_ALERT_WEBHOOK_URL;
  const now = Date.now();

  if (!url || now - lastWebhookAtMs < ALERT_COOLDOWN_MS) return;

  lastWebhookAtMs = now;

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: message }),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
  } catch {}
};
