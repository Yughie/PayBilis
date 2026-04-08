import type { SubscriptionValues } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function createSubscription(payload: SubscriptionValues) {
  const response = await fetch(`${API_BASE_URL}/api/subscriptions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

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
