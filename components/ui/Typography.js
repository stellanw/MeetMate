import styled from "styled-components";

/*
 * Typography
 * ----------
 * PageTitle     one per page, in the header
 * SectionTitle  label above a group of content ("Deine nächste Aktivität", …)
 * StatusText    loading, empty and error states
 * Paragraphs    user text: blank lines → paragraphs, single line breaks kept
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

const StyledParagraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-s);

  p {
    white-space: pre-line;
    overflow-wrap: anywhere;
  }
`;

export function Paragraphs({ text }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <StyledParagraphs>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </StyledParagraphs>
  );
}
