import styled, { css } from "styled-components";
import { categoryColor } from "@/utils/categories";
import Face from "@/Icons/Face";
import { IconButton } from "./Button";

/*
 * JoinBadge – the Face on the top edge of a card.
 * Alone (one X) or together (XX + smile); switching is animated.
 */
export function JoinBadge({ together = true }) {
  return (
    <StyledJoinBadge
      aria-label={together ? "Du bist dabei" : "Du bist nicht dabei"}
    >
      <Face together={together} />
    </StyledJoinBadge>
  );
}

const StyledJoinBadge = styled.span`
  position: absolute;
  top: calc(-1 * var(--space-m));
  left: var(--space-m);
  width: var(--badge-size);
  height: var(--badge-size);
  padding: var(--space-xs);
  background-color: var(--color-highlight);
  border: var(--border-medium) solid var(--color-text);
  border-radius: var(--radius-s);
`;

/*
 * Card
 * ----
 * The only box style in the app (border + radius).
 *   $category     activity category → background color
 *   $interactive  true → clickable: hard shadow + hover/active feedback.
 *                 Rule: only clickable elements get a shadow.
 *   $padded       true → inner padding for content cards
 */
export const Card = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ $category }) => categoryColor($category)};
  border: var(--border-medium) solid var(--color-text);
  border-radius: var(--radius-m);

  ${({ $padded }) =>
    $padded &&
    css`
      padding: var(--space-l);
    `}

  ${({ $interactive }) =>
    $interactive &&
    css`
      box-shadow: var(--shadow-l);
      transition: box-shadow var(--transition-fast);

      &:hover {
        box-shadow: var(--shadow-m);
      }

      &:active {
        box-shadow: var(--shadow-s);
      }
    `}
`;

/*
 * SplitCard
 * ---------
 * Card with a main area (name) and an aside separated by a thin line
 * (date/time, avatar, actions). Used for activities, profile and friends.
 *   $compact  true → lower height (friend lists)
 */
export const SplitCard = styled(Card)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--card-aside-width);
  min-height: ${({ $compact }) =>
    $compact ? "var(--card-height-compact)" : "var(--card-height)"};

  /* the join badge sticks out above the card – a little extra room */
  &:has(> ${StyledJoinBadge}) {
    margin-top: var(--space-s);
  }
`;

export const SplitCardMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-s);
  min-width: 0;
  padding: var(--space-s) var(--space-m);
`;

export const SplitCardAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  margin-block: var(--space-s);
  padding-inline: var(--space-s);
  border-left: var(--border-thin) solid var(--color-text);

  ${({ $row }) =>
    $row &&
    css`
      flex-direction: row;
      gap: var(--space-s);
    `}
`;

/* Wraps onto several lines if needed. $size: "s" (default) … "xl" */
export const CardTitle = styled.h2`
  width: 100%;
  font-size: ${({ $size = "s" }) => `var(--font-size-${$size})`};
  text-align: center;
  overflow-wrap: anywhere;
  hyphens: auto;
`;

/*
 * TitleCard – colored card with the activity name (details, create, edit).
 * Room on both sides so the title never runs under the badge or the close icon.
 */
export const TitleCard = styled(Card)`
  display: flex;
  align-items: center;
  min-height: var(--card-height);
  padding-inline: var(--button-height);

  /* the join badge sticks out above the card – make room for it */
  &:has(> ${StyledJoinBadge}) {
    margin-top: var(--space-m);
  }
`;

/* Bare close icon in the top right corner of a card */
export const CardCloseButton = styled(IconButton).attrs({
  "aria-label": "Schließen",
})`
  position: absolute;
  top: 0;
  right: 0;
`;

/* Editable title in a TitleCard – looks exactly like the saved CardTitle */
export const CardTitleInput = styled.input`
  width: 100%;
  padding: 0;
  font-family: var(--font-title);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-l);
  text-align: center;
  background-color: transparent;
  border: none;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;
