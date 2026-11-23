import Link from "next/link";
import ActivityCard from "../ActivityCard";
import { Divider, Stack } from "@/components/ui/Layout";
import { SectionTitle, StatusText } from "@/components/ui/Typography";

export default function NextActivity({ activities }) {
  const joinedFutureActivities = activities.filter((activity) => {
    const activityDateTime = new Date(`${activity.date}T${activity.time}`);
    const currentDateTime = new Date();
    return activity.joined && activityDateTime > currentDateTime;
  });

  joinedFutureActivities.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  const nextActivity = joinedFutureActivities[0];

  return (
    <Stack as="section" $gap="l">
      <SectionTitle>Your next activity</SectionTitle>
      {nextActivity ? (
        <Link href={`/${nextActivity._id}`}>
          <ActivityCard
            name={nextActivity.name}
            date={nextActivity.date}
            time={nextActivity.time}
            joined={nextActivity.joined}
            category={nextActivity.category}
          />
        </Link>
      ) : (
        <StatusText>
          No upcoming activity yet – join your friends!
        </StatusText>
      )}
      <Divider />
    </Stack>
  );
}
