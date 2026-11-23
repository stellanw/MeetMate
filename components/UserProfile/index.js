import Image from "next/image";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import {
  CardTitle,
  SplitCard,
  SplitCardAside,
  SplitCardMain,
} from "@/components/ui/Card";

/* Own profile card – clickable, opens the profile form */
export default function UserProfile({ onEdit }) {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <StyledProfileCard
      as="button"
      type="button"
      onClick={onEdit}
      $interactive
      aria-label="Profil bearbeiten"
    >
      <SplitCardMain>
        <CardTitle as="span">{session.user.name}</CardTitle>
      </SplitCardMain>
      <SplitCardAside>
        <StyledAvatar
          src={session.user.image}
          alt={`Profilbild von ${session.user.name}`}
          width={96}
          height={96}
        />
      </SplitCardAside>
    </StyledProfileCard>
  );
}

const StyledProfileCard = styled(SplitCard)`
  padding: 0;
  text-align: inherit;
  cursor: pointer;
`;

const StyledAvatar = styled(Image)`
  width: var(--avatar-size);
  height: var(--avatar-size);
  object-fit: cover;
  border-radius: var(--radius-m);
`;
