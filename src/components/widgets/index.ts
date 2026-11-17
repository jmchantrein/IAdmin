import type { ComponentType } from 'preact';
import type { z } from 'zod';
import type { WIDGET_PARAMS, WidgetName } from '../../core/widgets.ts';
import type { Dictionary } from '../../i18n/fr.ts';
import { BitToggles } from './BitToggles.tsx';
import { GuessNumber } from './GuessNumber.tsx';
import { Stepper } from './Stepper.tsx';

export interface WidgetProps<N extends WidgetName> {
  params: z.output<(typeof WIDGET_PARAMS)[N]>;
  /** Called with the widget state each time it changes. */
  onChange?: (value: string) => void;
  t: Dictionary;
}

/** Registry: one component per widget name declared in `src/core/widgets.ts`. */
export const WIDGETS: { [N in WidgetName]: ComponentType<WidgetProps<N>> } = {
  'bascule-bits': BitToggles,
  devinette: GuessNumber,
  'pas-a-pas': Stepper,
};
