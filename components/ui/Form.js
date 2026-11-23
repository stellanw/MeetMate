import styled, { css } from "styled-components";
import { IoSearch } from "react-icons/io5";

/*
 * Form elements
 * -------------
 * Two input looks only:
 *   - "line"  → TextInput: underlined, sits inside cards/forms
 *   - "boxed" → Select, TextArea, SearchField: border + small shadow
 *
 * Focus never adds an outline on top of the border (no double lines):
 *   line  → the underline turns solid
 *   boxed → the shadow grows one step
 */

const boxedStyles = css`
  background-color: var(--color-bg);
  border: var(--border-medium) solid var(--color-text);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-s);
  transition: box-shadow var(--transition-fast);

  &:focus,
  &:focus-visible,
  &:focus-within {
    outline: none;
    box-shadow: var(--shadow-m);
  }
`;

export const FormLabel = styled.label`
  font-family: var(--font-heading);
`;

/* Label/value grid used in forms and detail views */
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  align-items: end;
  gap: var(--space-m);
`;

/* Read-only value in a FormGrid (detail view) */
export const FormValue = styled.span`
  min-height: var(--field-height);
  display: flex;
  align-items: end;
  font-family: var(--font-heading);
  border-bottom: var(--border-thin) solid var(--color-line-soft);
  overflow-wrap: anywhere;
`;

export const TextInput = styled.input`
  width: 100%;
  height: var(--field-height);
  padding: 0;
  font-family: var(--font-heading);
  background-color: transparent;
  border: none;
  border-bottom: var(--border-thin) solid var(--color-line-soft);
  border-radius: 0;

  &:focus,
  &:focus-visible {
    outline: none;
    border-bottom-color: var(--color-text);
  }
`;

export const Select = styled.select`
  ${boxedStyles}
  width: 100%;
  height: var(--field-height);
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
  height: var(--field-height);
  padding: 0 var(--space-s);
  border-radius: var(--radius-m);
  cursor: text;

  svg {
    width: var(--icon-m);
    height: var(--icon-m);
    flex-shrink: 0;
  }
`;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: transparent;
  border: none;

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

/*
 * Picker fields (date, time)
 * --------------------------
 * PickerField   wrapper: line input + icon toggle + popover
 * PickerToggle  icon button at the right end of the line
 * popoverStyles frame for every picker popover
 */
export const PickerField = styled.div`
  position: relative;
  display: flex;
  align-items: end;
`;

export const PickerToggle = styled.button.attrs({ type: "button" })`
  position: absolute;
  right: 0;
  bottom: var(--space-xs);
  display: flex;
  padding: 0;
  background: none;
  border: none;

  svg {
    width: var(--icon-m);
    height: var(--icon-m);
  }
`;

export const popoverStyles = css`
  position: absolute;
  top: calc(100% + var(--space-s));
  right: 0;
  z-index: var(--z-popover);
  margin: 0;
  padding: var(--space-s);
  font-family: var(--font-heading);
  background-color: var(--color-bg);
  border: var(--border-medium) solid var(--color-text);
  border-radius: var(--radius-m);
`;

/* Selectable option inside a picker (calendar day, hour, minute) */
export const pickerOptionStyles = css`
  border-radius: var(--radius-s);

  &:hover {
    background-color: var(--color-confirm-soft);
  }

  &[aria-pressed="true"] {
    background-color: var(--color-confirm);
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
