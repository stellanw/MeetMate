import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiClock } from "react-icons/fi";
import {
  PickerField,
  PickerToggle,
  TextInput,
  pickerOptionStyles,
  popoverStyles,
} from "@/components/ui/Form";

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

/*
 * TimePicker
 * ----------
 * Line input + popover with an hour and a minute column, styled like the
 * date picker. Submits its value through a hidden input (`name`).
 */
export default function TimePicker({ id, name, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const [hour = "12", minute = "00"] = (value || "").split(":");

  // center the selected hour/minute in its column when opening
  useEffect(() => {
    if (!isOpen) return;
    popoverRef.current
      ?.querySelectorAll('[aria-pressed="true"]')
      .forEach((option) => {
        const column = option.parentElement;
        column.scrollTop =
          option.offsetTop - column.clientHeight / 2 + option.offsetHeight / 2;
      });
  }, [isOpen]);

  const toggle = () => setIsOpen((open) => !open);

  return (
    <PickerField>
      <TextInput id={id} value={value} readOnly onClick={toggle} />
      <input type="hidden" name={name} value={value} />
      <PickerToggle onClick={toggle} aria-label="Uhrzeit wählen" aria-expanded={isOpen}>
        <FiClock />
      </PickerToggle>

      {isOpen && (
        <StyledPopover ref={popoverRef}>
          <TimeColumn
            label="Stunde"
            options={HOURS}
            selected={hour}
            onSelect={(newHour) => onChange(`${newHour}:${minute}`)}
          />
          <TimeColumn
            label="Minute"
            options={MINUTES}
            selected={minute}
            onSelect={(newMinute) => {
              onChange(`${hour}:${newMinute}`);
              setIsOpen(false);
            }}
          />
        </StyledPopover>
      )}
    </PickerField>
  );
}

function TimeColumn({ label, options, selected, onSelect }) {
  return (
    <StyledColumn role="group" aria-label={label}>
      <StyledColumnLabel>{label}</StyledColumnLabel>
      <StyledOptions>
        {options.map((option) => (
          <StyledOption
            key={option}
            type="button"
            aria-pressed={option === selected}
            onClick={() => onSelect(option)}
          >
            {option}
          </StyledOption>
        ))}
      </StyledOptions>
    </StyledColumn>
  );
}

const StyledPopover = styled.div`
  ${popoverStyles}
  display: grid;
  grid-template-columns: repeat(2, var(--button-l));
  gap: var(--space-s);
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
`;

const StyledColumnLabel = styled.span`
  font-size: var(--font-size-xs);
  text-align: center;
  color: var(--color-text-muted);
`;

/* six options visible, the rest scrolls */
const StyledOptions = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(6 * var(--field-height));
  overflow-y: auto;
  scrollbar-width: none;
`;

const StyledOption = styled.button`
  ${pickerOptionStyles}
  flex-shrink: 0;
  height: var(--field-height);
  padding: 0;
  background: none;
  border: none;
`;
