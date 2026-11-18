const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escapes text for an HTML text node or a double-quoted attribute. */
export const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (c) => ESCAPES[c]!);

/** Reverses `escapeHtml`. */
export const unescapeHtml = (html: string) =>
  html.replace(/&(amp|lt|gt|quot|#39);/g, (entity) =>
    Object.keys(ESCAPES).find((c) => ESCAPES[c] === entity)!,
  );
