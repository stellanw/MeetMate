import PageLayout from "@/components/Layout/PageLayout";
import UserProfile from "@/components/UserProfile";
import Mates from "@/components/Mates";
import JoinedActivities from "@/components/JoinedActivities/joined";
import { Divider, Stack } from "@/components/ui/Layout";
import { SectionTitle } from "@/components/ui/Typography";

export default function ProfilePage() {
  return (
    <PageLayout title="Ich & meine Mates">
      <Stack as="section" $gap="l">
        <SectionTitle>Das bin ich</SectionTitle>
        <UserProfile />
      </Stack>
      <Divider />
      <Mates />
      <Divider />
      <JoinedActivities />
    </PageLayout>
  );
}
