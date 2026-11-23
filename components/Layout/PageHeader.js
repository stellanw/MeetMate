import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSession, signOut } from "next-auth/react";
import { FiLogOut, FiUser, FiX } from "react-icons/fi";
import Logo from "@/Icons/Logo";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Row } from "@/components/ui/Layout";
import { PageTitle } from "@/components/ui/Typography";

/*
 * PageHeader – same on every page
 * --------------------------------
 * left   logo (links home) + page title; without title: app name
 * right  pages:        profile · sign out
 *        opened views: close (X) – pass `close` as href, function or true (= back)
 */
export default function PageHeader({ title, close }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <StyledHeader>
      <Row $gap="m">
        <Link href="/" aria-label="MeetMate – Startseite">
          <Logo />
        </Link>
        {title ? <PageTitle>{title}</PageTitle> : <StyledAppName>MeetMate</StyledAppName>}
      </Row>

      {close ? (
        <CloseButton close={close} router={router} />
      ) : (
        session && (
          <Row $gap="m">
            <StyledProfileLink
              href="/profil"
              $size="l"
              $square
              aria-label="Ich & meine Mates"
              aria-current={router.pathname === "/profil" ? "page" : undefined}
            >
              {session.user.image ? (
                <Image src={session.user.image} alt="" width={80} height={80} />
              ) : (
                <FiUser />
              )}
            </StyledProfileLink>
            <Button onClick={() => signOut()} $size="l" $square aria-label="Abmelden">
              <FiLogOut />
            </Button>
          </Row>
        )
      )}
    </StyledHeader>
  );
}

function CloseButton({ close, router }) {
  if (typeof close === "string") {
    return (
      <ButtonLink href={close} $square aria-label="Schließen">
        <FiX />
      </ButtonLink>
    );
  }

  const handleClick = typeof close === "function" ? close : () => router.back();

  return (
    <Button onClick={handleClick} $square aria-label="Schließen">
      <FiX />
    </Button>
  );
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-m);
  min-height: var(--button-l);
  padding-bottom: var(--space-m);
  border-bottom: var(--border-thin) solid var(--color-text);
`;

/* app name on the home page – same size as page titles */
const StyledAppName = styled(PageTitle)`
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
