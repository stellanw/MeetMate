import Link from "next/link";
import styled, { css } from "styled-components";

/*
 * Button
 * ------
 * The only button style in the app. Use the props instead of new styles:
 *   $size     "s" | "m" | "l"                (default "m")
 *   $variant  "default" | "confirm" | "alert" (default "default")
 *   $square   true → icon button, width = height
 *   $wide     true → full width of the parent
 *
 * Current page: set aria-current="page" → pressed look (no shadow, highlight color)
 */

const sizes = {
  s: { height: "var(--control-s)", icon: "var(--icon-s)", shadow: "var(--shadow-s)", hover: "none" },
  m: { height: "var(--control-m)", icon: "var(--icon-m)", shadow: "var(--shadow-m)", hover: "var(--shadow-s)" },
  l: { height: "var(--control-l)", icon: "var(--icon-l)", shadow: "var(--shadow-l)", hover: "var(--shadow-m)" },
};

const variants = {
  default: "var(--color-bg)",
  confirm: "var(--color-confirm)",
  alert: "var(--color-alert)",
};

export const buttonStyles = css`
  ${({ $size = "m", $variant = "default", $square, $wide }) => {
    const size = sizes[$size];
    return css`
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      gap: var(--space-s);
      height: ${size.height};
      min-width: ${size.height};
      width: ${$wide ? "100%" : $square ? size.height : "auto"};
      padding: ${$square ? "0" : "0 var(--space-m)"};
      font-family: var(--font-heading);
      font-size: var(--font-size-s);
      line-height: 1;
      color: var(--color-text);
      background-color: ${variants[$variant]};
      border: var(--border-medium) solid var(--color-text);
      border-radius: var(--radius-m);
      box-shadow: ${size.shadow};
      cursor: pointer;
      transition: box-shadow var(--transition-fast);

      &:hover {
        box-shadow: ${size.hover};
      }

      &:active {
        box-shadow: none;
      }

      &[aria-current="page"] {
        background-color: var(--color-highlight);
        box-shadow: none;
      }

      svg {
        width: ${size.icon};
        height: ${size.icon};
        flex-shrink: 0;
      }
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
