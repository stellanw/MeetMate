import styled from "styled-components";

/*
 * Typography
 * ----------
 * PageTitle     one per page, in the header
 * SectionTitle  label above a group of content ("Deine nächste Aktivität", …)
 * StatusText    loading, empty and error states
 */

/* Sits in the header next to the logo */
export const PageTitle = styled.h1`
  font-size: var(--font-size-m);
`;

export const SectionTitle = styled.h2`
  font-size: var(--font-size-s);
`;

export const StatusText = styled.p`
  padding-block: var(--space-l);
  color: var(--color-text-muted);
  text-align: center;
`;
