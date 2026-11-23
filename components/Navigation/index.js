import { useRouter } from "next/router";
import styled from "styled-components";
import { FiCalendar, FiHome, FiPlus } from "react-icons/fi";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";

/*
 * Bottom tab bar – every button always does the same thing.
 * The tab of the current page is shown pressed (aria-current).
 */
export default function Navigation({ onCreateClick }) {
  const { pathname } = useRouter();
  const current = (path) => (pathname === path ? "page" : undefined);

  return (
    <StyledNavigation aria-label="Hauptnavigation">
      <StyledNavInner>
        <ButtonLink href="/" $square aria-label="Startseite" aria-current={current("/")}>
          <FiHome />
        </ButtonLink>
        <Button onClick={onCreateClick} $fill>
          Neue Aktivität
          <FiPlus />
        </Button>
        <ButtonLink
          href="/kalender"
          $square
          aria-label="Kalender"
          aria-current={current("/kalender")}
        >
          <FiCalendar />
        </ButtonLink>
      </StyledNavInner>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  position: fixed;
  inset: auto 0 0 0;
  z-index: var(--z-nav);
  background-color: var(--color-bg);
`;

const StyledNavInner = styled(Container)`
  display: flex;
  gap: var(--space-m);
  padding-block: var(--space-m);
  border-top: var(--border-thin) solid var(--color-text);
`;
