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
    const errorPayload = await response.json().catch(() => null);
    const message =
      errorPayload?.detail ||
      errorPayload?.message ||
      (errorPayload ? JSON.stringify(errorPayload) : null) ||
      'Unable to submit subscription.';
    throw new Error(message);
  }

  return response.json();
}
