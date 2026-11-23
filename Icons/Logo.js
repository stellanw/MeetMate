import styled from "styled-components";
import Face from "./Face";

/*
 * MeetMate logo
 * -------------
 * The Face (XX + smile) in a frame that uses the same tokens as a
 * square button: size, border, radius and shadow.
 */
export default function Logo({ size = "m" }) {
  return (
    <StyledLogo $size={size} aria-hidden="true">
      <Face together />
    </StyledLogo>
  );
}

const StyledLogo = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  width: ${({ $size }) => `var(--control-${$size})`};
  height: ${({ $size }) => `var(--control-${$size})`};
  color: var(--color-text);
  background-color: var(--color-bg);
  border: var(--border-medium) solid currentColor;
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-m);
`;
