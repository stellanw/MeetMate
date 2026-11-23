import { useRouter } from "next/router";
import styled from "styled-components";
import { FiCalendar, FiPlus } from "react-icons/fi";
import { TbArrowBackUp } from "react-icons/tb";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";

export default function Navigation({ onCreateClick }) {
  const router = useRouter();
  const isCalendar = router.pathname === "/calendar";

  return (
    <StyledNavigation>
      <StyledNavInner>
        <ButtonLink href="/profilepage" $size="l" $square aria-label="Profile">
          XX
        </ButtonLink>
        <StyledCreateButton
          onClick={onCreateClick}
          $size="l"
          aria-label="Create activity"
        >
          <FiPlus />
        </StyledCreateButton>
        {isCalendar ? (
          <ButtonLink href="/" $size="l" $square aria-label="Back to home">
            <TbArrowBackUp />
          </ButtonLink>
        ) : (
          <ButtonLink href="/calendar" $size="l" $square aria-label="Calendar">
            <FiCalendar />
          </ButtonLink>
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

const StyledCreateButton = styled(Button)`
  flex: 1;
`;
