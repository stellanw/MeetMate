import Link from "next/link";
import useSWR from "swr";
import ActivityCard from "@/components/ActivityCard";
import useAuthentication from "../../pages/api/auth/useAuthentication";
import { Stack } from "@/components/ui/Layout";
import { SectionTitle, StatusText } from "@/components/ui/Typography";

export default function JoinedActivities() {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const { authenticated, loading } = useAuthentication();

  if (isLoading || loading) return <StatusText>Loading...</StatusText>;
  if (!activities) return <StatusText>Failed to load.</StatusText>;
  if (!authenticated) {
    return <StatusText>You must be signed in to view this page.</StatusText>;
  }

  const joinedActivities = activities.filter((activity) => activity.joined);

  return (
    <Stack as="section" $gap="l">
      <SectionTitle>My joined activities</SectionTitle>
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
        <StatusText>You haven&apos;t joined any activities yet.</StatusText>
      )}
    </Stack>
  );
}
