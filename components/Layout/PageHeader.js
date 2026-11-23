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
      <StyledBrand href="/" aria-label="MeetMate – Startseite">
        <Logo />
        <StyledAppName>MEET MATE</StyledAppName>
      </StyledBrand>
      {session && (
        <Row>
          <StyledProfileLink
            href="/profil"
            $square
            aria-label="Ich & meine Mates"
            aria-current={pathname === "/profil" ? "page" : undefined}
          >
            {session.user.image ? (
              <Image src={session.user.image} alt="" width={80} height={80} />
            ) : (
              <FiUser />
            )}
          </StyledProfileLink>
          <Button onClick={() => signOut()} $square aria-label="Abmelden">
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
  padding-bottom: var(--space-m);
  border-bottom: var(--border-thin) solid var(--color-text);
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
  text-transform: uppercase;
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
