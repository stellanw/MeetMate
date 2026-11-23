import useSWR from "swr";
import { useSession } from "next-auth/react";
import ActivityList from "@/components/ActivityList";
import { Divider, Stack } from "@/components/ui/Layout";
import { SectionTitle, StatusText } from "@/components/ui/Typography";
import { isAuthor, isParticipant } from "@/utils/participation";

/* Profile page: activities I planned and activities I joined */
export default function MyActivities() {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (isLoading) return <StatusText>Lädt …</StatusText>;
  if (!activities) {
    return <StatusText>Daten konnten nicht geladen werden.</StatusText>;
  }

  const planned = activities.filter((activity) => isAuthor(activity, userId));
  const joined = activities.filter(
    (activity) =>
      !isAuthor(activity, userId) && isParticipant(activity, userId)
  );

  return (
    <>
      <Stack as="section" $gap="m">
        <SectionTitle>Von mir geplant</SectionTitle>
        <ActivityList
          activities={planned}
          emptyText="Du hast noch nichts geplant."
          label="Von mir geplante Aktivitäten"
        />
      </Stack>
      <Divider />
      <Stack as="section" $gap="m">
        <SectionTitle>Hier bin ich dabei</SectionTitle>
        <ActivityList
          activities={joined}
          emptyText="Du bist noch bei keiner Aktivität deiner Mates dabei."
          label="Aktivitäten, bei denen ich dabei bin"
        />
      </Stack>
    </>
  );
}
