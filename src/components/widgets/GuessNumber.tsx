import { useEffect, useState } from 'preact/hooks';
import type { WidgetProps } from './index.ts';

interface Game {
  secret: number;
  /** Remaining candidates: every number from `low` to `high`. */
  low: number;
  high: number;
  questions: number;
  message: string;
}

/**
 * Guess a secret number with "is it greater than…?" questions.
 * Shows that each answer is an information: it eliminates possibilities.
 * Value: the number of questions once the number is found.
 */
export function GuessNumber({ params, onChange, t }: WidgetProps<'devinette'>) {
  const text = t.widgets.guess;
  // The secret is drawn in the browser only, so the static page stays deterministic.
  const [game, setGame] = useState<Game | null>(null);
  const start = () =>
    setGame({
      secret: 1 + Math.floor(Math.random() * params.max),
      low: 1,
      high: params.max,
      questions: 0,
      message: '',
    });
  useEffect(start, []);

  const found = game !== null && game.low === game.high;
  useEffect(() => onChange?.(found && game ? String(game.questions) : ''), [found]);

  const ask = (threshold: number) => {
    if (!game || found) return;
    const greater = game.secret > threshold;
    const low = greater ? Math.max(game.low, threshold + 1) : game.low;
    const high = greater ? game.high : Math.min(game.high, threshold);
    const eliminated = game.high - game.low - (high - low);
    setGame({
      ...game,
      low,
      high,
      questions: game.questions + 1,
      message: `${greater ? text.yes(threshold) : text.no(threshold)} ${
        eliminated > 0 ? text.eliminated(eliminated) : text.useless
      }`,
    });
  };

  const numbers = Array.from({ length: params.max }, (_, i) => i + 1);
  const isCandidate = (n: number) => game === null || (n >= game.low && n <= game.high);

  return (
    <div class="widget guess">
      <p class="widget-hint">{text.prompt}</p>
      <div class="guess-cards">
        {numbers.map((n) => (
          <button
            type="button"
            class={`card ${isCandidate(n) ? '' : 'out'} ${found && isCandidate(n) ? 'found' : ''}`}
            aria-label={text.ask(n)}
            disabled={game === null || found}
            onClick={() => ask(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <p class="guess-message" aria-live="polite" data-testid="guess-message">
        {game && (found ? text.found(game.secret, game.questions) : game.message)}
      </p>
      <p class="widget-value">
        {text.remaining(game ? game.high - game.low + 1 : params.max)} ·{' '}
        {text.questions(game?.questions ?? 0)}
      </p>
      {found && (
        <button type="button" class="secondary" onClick={start}>
          {text.replay}
        </button>
      )}
    </div>
  );
}
