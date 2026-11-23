import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSession, signOut } from "next-auth/react";
import { FiLogOut, FiUser } from "react-icons/fi";
import Logo from "@/Icons/Logo";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Row } from "@/components/ui/Layout";

/*
 * Same header on every page:
 * logo + app name (links home) · profile · sign out
 */
export default function PageHeader() {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  return (
    <StyledHeader>
      <StyledBrand href="/" aria-label="MeetMate – home">
        <Logo />
        <StyledAppName>MeetMate</StyledAppName>
      </StyledBrand>
      {session && (
        <Row>
          <StyledProfileLink
            href="/profilepage"
            $square
            aria-label="My profile"
            aria-current={pathname === "/profilepage" ? "page" : undefined}
          >
            {session.user.image ? (
              <Image src={session.user.image} alt="" width={80} height={80} />
            ) : (
              <FiUser />
            )}
          </StyledProfileLink>
          <Button onClick={() => signOut()} $square aria-label="Sign out">
            <FiLogOut />
          </Button>
        </Row>
      )}
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

/* Avatar fills the square button, frame stays the button border */
const StyledProfileLink = styled(ButtonLink)`
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
