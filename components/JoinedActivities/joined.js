import Link from "next/link";
import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard";
import useAuthentication from "../../pages/api/auth/useAuthentication";
import { Stack } from "@/components/ui/Layout";
import { SectionTitle, StatusText } from "@/components/ui/Typography";

export default function JoinedActivities() {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const { authenticated, loading } = useAuthentication();

  if (isLoading || loading) return <StatusText>Lädt …</StatusText>;
  if (!activities) return <StatusText>Daten konnten nicht geladen werden.</StatusText>;
  if (!authenticated) {
    return <StatusText>Bitte melde dich an, um diese Seite zu sehen.</StatusText>;
  }

  const joinedActivities = activities.filter((activity) => activity.joined);

  return (
    <Stack as="section" $gap="l">
      <SectionTitle>Hier bin ich dabei</SectionTitle>
      {joinedActivities.length > 0 ? (
        joinedActivities.map((activity) => (
          <Link key={activity._id} href={`/${activity._id}`}>
            <ActivityCard
              name={activity.name}
              date={activity.date}
              time={activity.time}
              joined={activity.joined}
              category={activity.category}
            />
          </Link>
        ))
      ) : (
        <StatusText>Du bist noch bei keiner Aktivität dabei.</StatusText>
      )}
    </Stack>
  );
}
