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
 * right  pages:        profile link; on the profile page: sign out
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
        {title ? (
          <PageTitle>{title}</PageTitle>
        ) : (
          <StyledAppName>MEET MATE</StyledAppName>
        )}
      </Row>

      {close ? (
        <CloseButton close={close} router={router} />
      ) : (
        session &&
        (router.pathname === "/profil" ? (
          /* on the profile page itself: sign out instead of the profile link */
          <Button onClick={() => signOut()} $square aria-label="Abmelden">
            <FiLogOut />
          </Button>
        ) : (
          <StyledProfileLink href="/profil" $square aria-label="Mein Profil">
            {session.user.image ? (
              <Image src={session.user.image} alt="" width={80} height={80} />
            ) : (
              <FiUser />
            )}
          </StyledProfileLink>
        ))
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
  min-height: var(--button-height);
  padding-bottom: var(--space-m);
  border-bottom: var(--border-thin) solid var(--color-text);
`;

/* app name on the home page – same size as page titles */
/* wordmark – title font, a bit heavier than headings */
const StyledAppName = styled(PageTitle)`
  font-weight: var(--font-weight-brand);
  text-transform: none;
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
