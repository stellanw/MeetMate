import Link from "next/link";
import PageLayout from "@/components/Layout/PageLayout";
import UserProfile from "@/components/UserProfile";
import JoinedActivities from "@/components/JoinedActivities/joined";
import { Stack } from "@/components/ui/Layout";
import { SectionTitle } from "@/components/ui/Typography";

export default function ProfilePage() {
  return (
    <PageLayout title="Mein Profil">
      <Stack as="section" $gap="l">
        <SectionTitle>Das bin ich</SectionTitle>
        <Link href="/friendlist" aria-label="Meine Mates anzeigen">
          <UserProfile />
        </Link>
      </Stack>
      <JoinedActivities />
    </PageLayout>
  );
}
