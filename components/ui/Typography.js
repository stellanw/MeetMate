import styled from "styled-components";

/*
 * Typography
 * ----------
 * PageTitle     one per page, centered
 * SectionTitle  label above a group of content ("Your next activity", …)
 * StatusText    loading, empty and error states
 */

export const PageTitle = styled.h1`
  font-size: var(--font-size-xl);
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: var(--font-size-m);
`;

export const StatusText = styled.p`
  padding-block: var(--space-l);
  color: var(--color-text-muted);
  text-align: center;
`;
