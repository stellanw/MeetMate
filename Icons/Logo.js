import styled from "styled-components";
import Face from "./Face";

/*
 * MeetMate logo
 * -------------
 * The Face (XX + smile) on white, like the join badge – the brand mark.
 * Same size, border and radius as a button, but deliberately no shadow:
 * it is the brand, not a control (even though it links home).
 */
export default function Logo() {
  return (
    <StyledLogo aria-hidden="true">
      <Face together />
    </StyledLogo>
  );
}

const StyledLogo = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  width: var(--logo-size);
  height: var(--logo-size);
  color: var(--color-text);
  background-color: var(--color-highlight);
  border: var(--border-medium) solid currentColor;
  border-radius: var(--radius-m);
`;
