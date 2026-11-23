import { useState } from "react";
import styled, { css } from "styled-components";

/*
 * Layout primitives
 * -----------------
 * Container  centered content column, same width on every page
 * Stack      vertical list with a token gap instead of margins
 * Row        horizontal group with a token gap
 * Divider    thin full-width line
 * Overlay    full-screen layer (create/edit form)
 * Collapsible  animated open/close panel (filter, friend requests);
 *             place it directly after its trigger, not inside a Stack gap
 */

const gaps = {
  xs: "var(--space-xs)",
  s: "var(--space-s)",
  m: "var(--space-m)",
  l: "var(--space-l)",
  xl: "var(--space-xl)",
};

export const Container = styled.div`
  width: min(100% - 2 * var(--page-gutter), var(--content-width));
  margin-inline: auto;
`;

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = "m" }) => gaps[$gap]};

  ${({ $center }) =>
    $center &&
    css`
      align-items: center;
    `}
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ $gap = "s" }) => gaps[$gap]};
  justify-content: ${({ $justify = "flex-start" }) => $justify};
`;

export const Divider = styled.hr`
  width: 100%;
  margin: 0;
  border: none;
  border-top: var(--border-thin) solid var(--color-text);
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  overflow-y: auto;
  padding-block: var(--space-l);
  background-color: var(--color-bg);
`;

const StyledCollapsible = styled.div`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows var(--transition-slide);
`;

const StyledCollapsibleClip = styled.div`
  min-height: 0;
  overflow: ${({ $clip }) => ($clip ? "hidden" : "visible")};
`;

/*
 * Top space only exists while open – so a closed panel adds no gap.
 * Right/bottom space leaves room for the card shadow inside the clip.
 */
const StyledCollapsibleContent = styled.div`
  padding: var(--space-m) var(--space-s) var(--space-s) 0;
`;

/* clips only while animating or closed, so popovers inside can overflow when open */
export function Collapsible({ open, children }) {
  const [isSettled, setIsSettled] = useState(false);

  return (
    <StyledCollapsible
      $open={open}
      aria-hidden={!open}
      inert={open ? undefined : ""}
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget) setIsSettled(open);
      }}
    >
      <StyledCollapsibleClip $clip={!(open && isSettled)}>
        <StyledCollapsibleContent>{children}</StyledCollapsibleContent>
      </StyledCollapsibleClip>
    </StyledCollapsible>
  );
}
