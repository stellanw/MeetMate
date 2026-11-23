import styled, { css } from "styled-components";
import { IoSearch } from "react-icons/io5";

/*
 * Form elements
 * -------------
 * Two input looks only:
 *   - "line"  → TextInput: underlined, sits inside cards/forms
 *   - "boxed" → Select, TextArea, SearchField: border + small shadow
 */

const boxedStyles = css`
  background-color: var(--color-bg);
  border: var(--border-medium) solid var(--color-text);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-s);
`;

export const FormLabel = styled.label`
  font-family: var(--font-heading);
`;

/* Label/value grid used in forms and detail views – labels align right */
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  align-items: end;
  gap: var(--space-m);

  > ${FormLabel} {
    text-align: right;
  }
`;

/* Read-only value in a FormGrid (detail view) */
export const FormValue = styled.span`
  min-height: var(--control-s);
  display: flex;
  align-items: end;
  font-family: var(--font-heading);
  border-bottom: var(--border-thin) solid var(--color-line-soft);
  overflow-wrap: anywhere;
`;

export const TextInput = styled.input`
  width: 100%;
  height: var(--control-s);
  padding: 0;
  font-family: var(--font-heading);
  background-color: transparent;
  border: none;
  border-bottom: var(--border-thin) solid var(--color-line-soft);
  border-radius: 0;

  &:focus-visible {
    outline: none;
    border-bottom-color: var(--color-text);
  }
`;

export const Select = styled.select`
  ${boxedStyles}
  width: 100%;
  height: var(--control-s);
  padding: 0 var(--space-s);
  font-family: var(--font-heading);
`;

export const TextArea = styled.textarea`
  ${boxedStyles}
  width: 100%;
  min-height: var(--card-height);
  padding: var(--space-s);
  resize: none;
  overflow: hidden;

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const StyledSearchField = styled.label`
  ${boxedStyles}
  display: flex;
  flex: 1;
  align-items: center;
  gap: var(--space-s);
  height: var(--control-m);
  padding: 0 var(--space-s);
  border-radius: var(--radius-m);
  cursor: text;

  svg {
    width: var(--icon-m);
    height: var(--icon-m);
    flex-shrink: 0;
  }

  &:focus-within {
    box-shadow: var(--shadow-m);
  }
`;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: transparent;
  border: none;

  &:focus-visible {
    outline: none;
  }
`;

export function SearchField({ label = "Suchen", ...inputProps }) {
  return (
    <StyledSearchField>
      <IoSearch aria-hidden="true" />
      <StyledSearchInput
        type="search"
        placeholder="Suchen …"
        aria-label={label}
        {...inputProps}
      />
    </StyledSearchField>
  );
}
