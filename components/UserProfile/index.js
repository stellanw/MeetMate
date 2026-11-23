import Image from "next/image";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import {
  CardTitle,
  SplitCard,
  SplitCardAside,
  SplitCardMain,
} from "@/components/ui/Card";

export default function UserProfile() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <SplitCard>
      <SplitCardMain>
        <CardTitle>{session.user.name}</CardTitle>
      </SplitCardMain>
      <SplitCardAside>
        <StyledAvatar
          src={session.user.image}
          alt={`Profilbild von ${session.user.name}`}
          width={96}
          height={96}
        />
      </SplitCardAside>
    </SplitCard>
  );
}

const StyledAvatar = styled(Image)`
  width: var(--control-l);
  height: var(--control-l);
  object-fit: cover;
  border-radius: var(--radius-m);
`;
