import styled, { css } from "styled-components";

/*
 * Face
 * ----
 * The MeetMate idea in one icon: an X is a person.
 *   together=false → one X, alone
 *   together=true  → XX with a smile connecting them: you and your friends
 * Switching between both states is animated (second X joins, smile draws);
 * animated={false} switches instantly (e.g. icons inside buttons).
 * Strokes always use the border width, so it matches buttons and cards.
 */
export default function Face({ together = true, animated = true, className }) {
  return (
    <StyledFace
      viewBox="299 719 458 458"
      className={className}
      $together={together}
      $animated={animated}
      aria-hidden="true"
    >
      <path className="eye eye--left" d="M374 840 L477 1011 M477 840 L374 1011" />
      <path className="eye eye--right" d="M576 840 L679 1011 M679 840 L576 1011" />
      <path className="smile" d="M432 1090 Q528 1162 624 1090" pathLength="1" />
    </StyledFace>
  );
}

/* distance between the center of the left eye and the center of the face */
const EYE_OFFSET = "102px";

const StyledFace = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;

  path {
    fill: none;
    stroke: currentColor;
    stroke-width: var(--border-medium);
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    transform-box: view-box;
    transition: transform var(--transition-face), opacity var(--transition-face),
      stroke-dashoffset var(--transition-face);
  }

  .smile {
    stroke-dasharray: 1;
  }

  ${({ $together }) =>
    $together
      ? css`
          .smile {
            stroke-dashoffset: 0;
            transition-delay: 150ms;
          }
        `
      : css`
          /* alone: the left X moves to the center, the right X and the smile disappear */
          .eye--left {
            transform: translateX(${EYE_OFFSET});
          }

          .eye--right {
            opacity: 0;
            transform: translateX(calc(-1 * ${EYE_OFFSET}));
          }

          .smile {
            stroke-dashoffset: 1;
          }
        `}

  ${({ $animated }) =>
    !$animated &&
    css`
      path {
        transition: none;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    path {
      transition: none;
    }
  }
`;
