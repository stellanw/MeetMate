import { useRouter } from "next/router";
import styled from "styled-components";
import { FiCalendar, FiHome, FiPlus, FiUsers } from "react-icons/fi";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";

/*
 * Bottom tab bar – four equal icon tabs, every tab always does the same.
 * The tab of the current page is shown pressed (aria-current).
 */
const TABS = [
  { href: "/", label: "Startseite", icon: <FiHome /> },
  { href: "/mates", label: "Meine Mates", icon: <FiUsers /> },
  { create: true, label: "Neue Aktivität", icon: <FiPlus /> },
  { href: "/kalender", label: "Kalender", icon: <FiCalendar /> },
];

export default function Navigation({ onCreateClick }) {
  const { pathname } = useRouter();

  return (
    <StyledNavigation aria-label="Hauptnavigation">
      <StyledNavInner>
        {TABS.map(({ href, create, label, icon }) =>
          create ? (
            <Button
              key={label}
              onClick={onCreateClick}
              $fill
              aria-label={label}
            >
              {icon}
            </Button>
          ) : (
            <ButtonLink
              key={label}
              href={href}
              $fill
              aria-label={label}
              aria-current={pathname === href ? "page" : undefined}
            >
              {icon}
            </ButtonLink>
          )
        )}
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
