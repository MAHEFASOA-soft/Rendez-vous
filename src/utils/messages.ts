/**
 * Humorous, affectionate lines shown as the "Non" button escapes.
 * Kept short so they never overflow on small screens.
 */
export const escapeMessages: string[] = [
  'Tu es sûre ? 👀',
  'Réfléchis encore... ❤️',
  'Ce bouton a un peu peur de ta réponse 😏',
  'Je crois qu\'il préfère le "Oui"...',
  'Allez... donne-moi une chance ❤️',
  'Il est timide, ce bouton.',
  'Essaie encore, pour voir 😄',
  'Le "Oui" est juste à côté, tu sais.',
];

export function pickEscapeMessage(previous?: string): string {
  const pool = escapeMessages.filter((m) => m !== previous);
  return pool[Math.floor(Math.random() * pool.length)];
}
