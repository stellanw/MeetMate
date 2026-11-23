import { useRef, useState } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import useDismiss from "@/hooks/useDismiss";
import { boxedStyles, pickerOptionStyles, popoverStyles } from "./Form";

/*
 * SelectMenu
 * ----------
 * Custom dropdown in the style of the date/time pickers.
 *   options  [{ value, label, color? }] – color shows a swatch (categories)
 *   name     submits the value with the form (hidden input, supports `required`)
 */
export default function SelectMenu({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Bitte wählen …",
  required,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const close = () => setIsOpen(false);
  useDismiss(wrapperRef, isOpen, close);

  const selected = options.find((option) => option.value === value);

  return (
    <StyledWrapper ref={wrapperRef}>
      <StyledTrigger
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {selected?.color && <Swatch $color={selected.color} />}
        <StyledValue $placeholder={!selected}>
          {selected ? selected.label : placeholder}
        </StyledValue>
        <FiChevronDown aria-hidden="true" />
      </StyledTrigger>

      {name && (
        /* invisible input so the browser validates `required` and submits the value */
        <StyledValidationInput
          name={name}
          value={value}
          required={required}
          onChange={() => {}}
          tabIndex={-1}
          aria-hidden="true"
        />
      )}

      {isOpen && (
        <StyledList role="listbox" aria-labelledby={id}>
          {options.map((option) => (
            <StyledOption
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                close();
              }}
            >
              {option.color && <Swatch $color={option.color} />}
              {option.label}
            </StyledOption>
          ))}
        </StyledList>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledTrigger = styled.button`
  ${boxedStyles}
  display: flex;
  align-items: center;
  gap: var(--space-s);
  width: 100%;
  height: var(--field-height);
  padding: 0 var(--space-s);
  font-family: var(--font-heading);
  text-align: left;
  cursor: pointer;

  svg {
    width: var(--icon-m);
    height: var(--icon-m);
    margin-left: auto;
    flex-shrink: 0;
  }
`;

const StyledValue = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ $placeholder }) =>
    $placeholder ? "var(--color-text-muted)" : "inherit"};
`;

const StyledValidationInput = styled.input`
  position: absolute;
  inset: auto 0 0 0;
  height: 0;
  padding: 0;
  border: none;
  opacity: 0;
  pointer-events: none;
`;

const StyledList = styled.div`
  ${popoverStyles}
  left: 0;
  display: flex;
  flex-direction: column;
`;

const StyledOption = styled.button`
  ${pickerOptionStyles}
  display: flex;
  align-items: center;
  gap: var(--space-s);
  height: var(--field-height);
  padding: 0 var(--space-s);
  font: inherit;
  text-align: left;
  white-space: nowrap;
  background: none;
  border: none;
`;

/* small square in the category color */
const Swatch = styled.span`
  flex-shrink: 0;
  width: var(--icon-s);
  height: var(--icon-s);
  background-color: ${({ $color }) => $color};
  border: var(--border-thin) solid var(--color-text);
  border-radius: var(--radius-s);
`;
