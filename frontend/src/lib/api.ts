import type { SubscriptionValues } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function createSubscription(payload: SubscriptionValues) {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/subscriptions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'Unable to reach the server. Please try again in a few minutes.',
    );
  }

  if (!response.ok) {
    const responseText = await response.text();
    let errorPayload: Record<string, unknown> | null = null;

    if (responseText) {
      try {
        errorPayload = JSON.parse(responseText) as Record<string, unknown>;
      } catch {
        errorPayload = null;
      }
    }

    const message =
      (typeof errorPayload?.detail === 'string' ? errorPayload.detail : null) ||
      (typeof errorPayload?.message === 'string' ? errorPayload.message : null) ||
      responseText ||
      (errorPayload ? JSON.stringify(errorPayload) : null) ||
      'Unable to submit subscription.';
    throw new Error(message);
  }

  return response.json();
}

export async function askAI(message: string): Promise<string> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/ai/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
  } catch {
    throw new Error(
      'Unable to reach the AI service. Please try again in a few minutes.',
    );
  }

  const payload = (await response.json().catch(() => null)) as
    | { answer?: string; detail?: string; message?: string }
    | null;

  if (!response.ok) {
    const errorMessage =
      payload?.detail ||
      payload?.message ||
      'Unable to get response from AI assistant.';
    throw new Error(errorMessage);
  }

  if (!payload?.answer) {
    throw new Error('AI assistant returned an empty response.');
  }

  return payload.answer;
}
