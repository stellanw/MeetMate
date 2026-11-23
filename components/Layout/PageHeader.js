import Link from "next/link";
import styled from "styled-components";
import Logo from "@/Icons/Logo";
import { Row } from "@/components/ui/Layout";

/* Same header on every page: logo + app name (links home), actions on the right */
export default function PageHeader({ actions }) {
  return (
    <StyledHeader>
      <StyledBrand href="/" aria-label="MeetMate – home">
        <Logo />
        <StyledAppName>MeetMate</StyledAppName>
      </StyledBrand>
      {actions && <Row>{actions}</Row>}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-m);
  min-height: var(--control-m);
`;

const StyledBrand = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--space-s);
`;

const StyledAppName = styled.span`
  font-family: var(--font-heading);
  font-size: var(--font-size-l);
  font-weight: 700;
`;
