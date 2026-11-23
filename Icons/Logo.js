import styled from "styled-components";
import Face from "./Face";

/*
 * MeetMate logo
 * -------------
 * The Face (XX + smile) in a frame with the same size, border, radius
 * and shadow as a large square button – it sits next to them in the header.
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
  width: var(--button-l);
  height: var(--button-l);
  color: var(--color-text);
  background-color: var(--color-bg);
  border: var(--border-medium) solid currentColor;
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-m);
`;
