import Link from "next/link";
import styled, { css } from "styled-components";

/*
 * Button
 * ------
 * The only button style in the app – one size (40px) everywhere.
 *   $variant  "default" | "confirm" | "alert" (default "default")
 *   $square   true → icon button, width = height
 *   $wide     true → full width of the parent
 *   $fill     true → takes the remaining space in a row (flex: 1)
 *
 * Current page: set aria-current="page" → pressed look (no shadow)
 */

const variants = {
  default: "var(--color-bg)",
  confirm: "var(--color-confirm)",
  alert: "var(--color-alert)",
};

export const buttonStyles = css`
  position: relative;
  display: inline-flex;
  flex: ${({ $fill }) => ($fill ? "1" : "none")};
  align-items: center;
  justify-content: center;
  gap: var(--space-s);
  height: var(--button-height);
  min-width: var(--button-height);
  width: ${({ $wide, $square }) =>
    $wide ? "100%" : $square ? "var(--button-height)" : "auto"};
  padding: ${({ $square }) => ($square ? "0" : "0 var(--space-m)")};
  font-family: var(--font-heading);
  font-size: var(--font-size-s);
  line-height: 1;
  color: var(--color-text);
  background-color: ${({ $variant = "default" }) => variants[$variant]};
  border: var(--border-medium) solid var(--color-text);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-m);
  cursor: pointer;
  transition: box-shadow var(--transition-fast);

  &:hover {
    box-shadow: var(--shadow-s);
  }

  &:active,
  &[aria-current="page"] {
    box-shadow: none;
  }

  svg {
    width: var(--icon-m);
    height: var(--icon-m);
    flex-shrink: 0;
  }
`;

export const Button = styled.button.attrs(({ type }) => ({
  type: type ?? "button",
}))`
  ${buttonStyles}
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles}
`;

/*
 * IconButton
 * ----------
 * Bare icon without frame or shadow, for secondary actions inside a card
 * (e.g. close). Keeps the full button height as tap area.
 */
export const IconButton = styled.button.attrs(({ type }) => ({
  type: type ?? "button",
}))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--button-height);
  height: var(--button-height);
  padding: 0;
  color: var(--color-text);
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: var(--icon-m);
    height: var(--icon-m);
  }
`;
