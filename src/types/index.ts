/**
 * Shared domain types for the date proposal flow.
 * Keeping these centralized makes it trivial to later swap the
 * in-memory/localStorage persistence for a real backend call:
 * the shape of `DateProposal` becomes the request payload.
 */

export type AppStep = 'proposal' | 'planning' | 'summary';

export interface LocationSuggestion {
  id: string;
  label: string;
  emoji: string;
}

export interface DateProposal {
  answer: 'yes';
  date: string | null; // ISO date string (yyyy-mm-dd)
  location: string;
  createdAt: string; // ISO timestamp
}

export interface Point {
  x: number;
  y: number;
}
