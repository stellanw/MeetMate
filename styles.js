import { createGlobalStyle, css } from "styled-components";

/*
 * MeetMate styling system
 * =======================
 * All design decisions live here as CSS custom properties (tokens).
 * Components only use `var(--token)` – no raw px/rem/hex values.
 *
 * Scales:
 *   spacing   xs · s · m · l · xl · xxl   (4px grid)
 *   font-size xs · s · m · l · xl
 *   control   s · m · l                   (fixed heights for buttons/inputs)
 *   icon      s · m · l
 *   shadow    s · m · l                   (hard offset shadow, hover = one step smaller)
 */

export const breakpoints = {
  tablet: "600px",
  desktop: "900px",
};

export const media = {
  tablet: (...args) => css`
    @media (min-width: ${breakpoints.tablet}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${breakpoints.desktop}) {
      ${css(...args)}
    }
  `,
};

const tokens = css`
  :root {
    /* Colors */
    --color-bg: #efe8d8;
    --color-text: #262524;
    --color-text-muted: rgb(38 37 36 / 0.6);
    --color-line-soft: rgb(38 37 36 / 0.3);
    --color-highlight: #ffffff;
    --color-confirm: #b4c9ab;
    --color-confirm-soft: rgb(180 201 171 / 0.5);
    --color-alert: #dea0a0;

    --color-category-sports: #86b2b1;
    --color-category-culture: #c16b6b;
    --color-category-food: #e2aa60;
    --color-category-outdoor: #96ad8c;
    --color-category-party: #b87fa3;
    --color-category-cozy: #d6bf94;
    --color-category-default: var(--color-bg);

    /* Typography */
    --font-heading: ${({ $fontHeading }) => $fontHeading}, serif;
    --font-text: ${({ $fontText }) => $fontText}, serif;

    --font-size-xs: 0.8rem;
    --font-size-s: 1rem;
    --font-size-m: 1.25rem;
    --font-size-l: 1.5rem;
    --font-size-xl: 2rem;

    --line-height-tight: 1.15;
    --line-height-text: 1.45;

    /* Spacing */
    --space-xs: 0.25rem;
    --space-s: 0.5rem;
    --space-m: 1rem;
    --space-l: 1.5rem;
    --space-xl: 2rem;
    --space-xxl: 3rem;

    /* Borders & radii */
    --border-thin: 1px;
    --border-medium: 2px;
    --radius-s: 0.3rem;
    --radius-m: 0.6rem;

    /* Shadows */
    --shadow-s: 2px 2px 0 var(--color-text);
    --shadow-m: 3px 3px 0 var(--color-text);
    --shadow-l: 5px 5px 0 var(--color-text);

    /* Fixed sizes */
    --control-s: 2rem;
    --control-m: 2.5rem;
    --control-l: 3.5rem;
    --icon-s: 1rem;
    --icon-m: 1.25rem;
    --icon-l: 1.5rem;
    --card-height: 4.75rem;
    --card-aside-width: 7.5rem;

    /* Layout */
    --content-width: 28rem;
    --page-gutter: var(--space-m);
    --nav-height: calc(var(--control-l) + 2 * var(--space-m));

    /* Layers */
    --z-popover: 10;
    --z-nav: 100;
    --z-overlay: 200;

    /* Motion */
    --transition-fast: 120ms ease-out;
    --transition-slide: 600ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

export default createGlobalStyle`
  ${tokens}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--font-text);
    font-size: var(--font-size-s);
    line-height: var(--line-height-text);
    color: var(--color-text);
    background-color: var(--color-bg);
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    font-family: var(--font-heading);
    font-weight: 400;
    line-height: var(--line-height-tight);
  }

  h1 { font-size: var(--font-size-xl); }
  h2 { font-size: var(--font-size-l); }
  h3 { font-size: var(--font-size-m); }
  h4 { font-size: var(--font-size-s); }

  p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  :focus-visible {
    outline: var(--border-medium) solid var(--color-text);
    outline-offset: var(--border-medium);
  }

  abbr {
    text-decoration: none;
  }

  /* react-toastify */
  .Toastify__toast {
    font-family: var(--font-heading);
    color: var(--color-text);
    background-color: var(--color-bg);
    border: var(--border-medium) solid var(--color-text);
    border-radius: var(--radius-m);
    box-shadow: var(--shadow-m);
  }

  .Toastify__close-button {
    color: var(--color-text);
  }

  .Toastify__progress-bar--success,
  .Toastify__progress-bar--info {
    background-color: var(--color-confirm);
  }

  .Toastify__progress-bar--error {
    background-color: var(--color-alert);
  }

  .Toastify__toast--success svg,
  .Toastify__toast--info svg {
    fill: var(--color-confirm);
  }

  .Toastify__toast--error svg {
    fill: var(--color-alert);
  }
`;
