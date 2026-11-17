import type { ComponentType } from 'preact';
import { WIDGET_PARAMS, isWidgetName } from '../core/widgets.ts';
import { dict, type Lang } from '../i18n/index.ts';
import { WIDGETS, type WidgetProps } from './widgets/index.ts';

interface Props {
  widget: string;
  params: Record<string, unknown>;
  lang: Lang;
  onChange?: (value: string) => void;
}

/** Renders the widget named in the content, with its parameters validated and defaulted. */
export function Widget({ widget, params, lang, onChange }: Props) {
  if (!isWidgetName(widget)) throw new Error(`widget inconnu : ${widget}`);
  const Component = WIDGETS[widget] as ComponentType<WidgetProps<typeof widget>>;
  return (
    <Component params={WIDGET_PARAMS[widget].parse(params)} onChange={onChange} t={dict(lang)} />
  );
}
