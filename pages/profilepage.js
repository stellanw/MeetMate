import Link from "next/link";
import { FiHome } from "react-icons/fi";
import PageLayout from "@/components/Layout/PageLayout";
import UserProfile from "@/components/UserProfile";
import JoinedActivities from "@/components/JoinedActivities/joined";
import { ButtonLink } from "@/components/ui/Button";
import { Stack } from "@/components/ui/Layout";
import { SectionTitle } from "@/components/ui/Typography";

export default function ProfilePage() {
  return (
    <PageLayout
      title="My Profile"
      headerActions={
        <ButtonLink href="/" $square aria-label="Home">
          <FiHome />
        </ButtonLink>
      }
    >
      <Stack as="section" $gap="l">
        <SectionTitle>This is me</SectionTitle>
        <Link href="/friendlist" aria-label="My profile – show my mates">
          <UserProfile />
        </Link>
      </Stack>
      <JoinedActivities />
    </PageLayout>
  );
}
