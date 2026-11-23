/* Site-wide texts for <title> and meta tags */
export const SITE_NAME = "MEET MATE";
export const SITE_DESCRIPTION =
  "MEET MATE: Treffen mit Freund*innen einfach planen. Aktivität vorschlagen, Freund*innen sagen zu – ohne Abstimmungschaos im Gruppenchat.";

export function pageTitle(title) {
  return title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} – Treffen mit Freund*innen planen`;
}
