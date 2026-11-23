import styled from "styled-components";

/*
 * MeetMate logo
 * -------------
 * Frame, radius and shadow use the same tokens as a square button,
 * the face is drawn with lines in the border width – so the logo always
 * matches the buttons next to it.
 */
export default function Logo({ size = "m" }) {
  return (
    <StyledLogo $size={size} aria-hidden="true">
      <svg viewBox="299 719 458 458" width="100%" height="100%">
        {/* left eye */}
        <path d="M361 819 L490 1032 M490 819 L361 1032" />
        {/* right eye */}
        <path d="M563 819 L692 1032 M692 819 L563 1032" />
        {/* smile */}
        <path d="M432 1090 Q528 1162 624 1090" />
      </svg>
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

  path {
    fill: none;
    stroke: currentColor;
    stroke-width: var(--border-medium);
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }
`;
