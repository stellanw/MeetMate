import Link from "next/link";
import PageLayout from "@/components/Layout/PageLayout";
import UserProfile from "@/components/UserProfile";
import JoinedActivities from "@/components/JoinedActivities/joined";
import { Stack } from "@/components/ui/Layout";
import { SectionTitle } from "@/components/ui/Typography";

export default function ProfilePage() {
  return (
    <PageLayout title="My Profile">
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
