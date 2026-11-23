import Link from "next/link";
import styled, { css } from "styled-components";

/*
 * Button
 * ------
 * The only button style in the app. Use the props instead of new styles:
 *   $size     "s" (20px, default) | "l" (40px)
 *             l only for navigation (header, tab bar) and card action rows
 *   $variant  "default" | "confirm" | "alert" (default "default")
 *   $square   true → icon button, width = height
 *   $wide     true → full width of the parent
 *   $fill     true → takes the remaining space in a row (flex: 1)
 *
 * Small buttons keep a 40px touch target (invisible ::after).
 * Current page: set aria-current="page" → pressed look (no shadow)
 */

const sizes = {
  s: {
    height: "var(--button-s)",
    icon: "var(--icon-s)",
    font: "var(--font-size-xs)",
    radius: "var(--radius-s)",
    shadow: "var(--shadow-s)",
    hover: "none",
  },
  l: {
    height: "var(--button-l)",
    icon: "var(--icon-m)",
    font: "var(--font-size-s)",
    radius: "var(--radius-m)",
    shadow: "var(--shadow-m)",
    hover: "var(--shadow-s)",
  },
};

const variants = {
  default: "var(--color-bg)",
  confirm: "var(--color-confirm)",
  alert: "var(--color-alert)",
};

export const buttonStyles = css`
  ${({ $size = "s", $variant = "default", $square, $wide, $fill }) => {
    const size = sizes[$size];
    return css`
      position: relative;
      display: inline-flex;
      flex: ${$fill ? "1" : "none"};
      align-items: center;
      justify-content: center;
      gap: var(--space-s);
      height: ${size.height};
      min-width: ${size.height};
      width: ${$wide ? "100%" : $square ? size.height : "auto"};
      padding: ${$square ? "0" : "0 var(--space-m)"};
      font-family: var(--font-heading);
      font-size: ${size.font};
      line-height: 1;
      color: var(--color-text);
      background-color: ${variants[$variant]};
      border: var(--border-medium) solid var(--color-text);
      border-radius: ${size.radius};
      box-shadow: ${size.shadow};
      cursor: pointer;
      transition: box-shadow var(--transition-fast);

      &:hover {
        box-shadow: ${size.hover};
      }

      &:active,
      &[aria-current="page"] {
        box-shadow: none;
      }

      svg {
        width: ${size.icon};
        height: ${size.icon};
        flex-shrink: 0;
      }

      ${$size === "s" &&
      css`
        &::after {
          content: "";
          position: absolute;
          inset: calc((var(--button-s) - var(--touch-target)) / 2);
        }
      `}
    `;
  }}
`;

export const Button = styled.button.attrs(({ type }) => ({
  type: type ?? "button",
}))`
  ${buttonStyles}
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles}
`;
