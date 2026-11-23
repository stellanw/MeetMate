import styled, { css } from "styled-components";
import { categoryColor } from "@/utils/categories";

/*
 * Card
 * ----
 * The only box style in the app (border + radius + hard shadow).
 *   $category     activity category → background color
 *   $interactive  true → hover/active feedback (for linked cards)
 *   $padded       true → inner padding for content cards
 */
export const Card = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ $category }) => categoryColor($category)};
  border: var(--border-medium) solid var(--color-text);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-l);

  ${({ $padded }) =>
    $padded &&
    css`
      padding: var(--space-l);
    `}

  ${({ $interactive }) =>
    $interactive &&
    css`
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
    $compact ? "var(--control-l)" : "var(--card-height)"};
`;

export const SplitCardMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

/* $size "m" for compact cards, default "l" */
export const CardTitle = styled.h2`
  width: 100%;
  overflow: hidden;
  font-size: ${({ $size = "l" }) => `var(--font-size-${$size})`};
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

/* Small "joined" badge sitting on the top edge of a card */
export const JoinBadge = styled.span`
  position: absolute;
  top: calc(-1 * var(--space-s));
  left: var(--space-m);
  padding: 0 var(--space-xs);
  font-family: var(--font-heading);
  font-size: var(--font-size-xs);
  background-color: var(--color-highlight);
  border: var(--border-medium) solid var(--color-text);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-s);
`;
