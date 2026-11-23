import Link from "next/link";
import { useSession } from "next-auth/react";
import { isParticipant } from "@/utils/participation";
import ActivityCard from "../ActivityCard";
import { Divider, Stack } from "@/components/ui/Layout";
import { SectionTitle, StatusText } from "@/components/ui/Typography";

export default function NextActivity({ activities }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const joinedFutureActivities = activities.filter((activity) => {
    const activityDateTime = new Date(`${activity.date}T${activity.time}`);
    const currentDateTime = new Date();
    return isParticipant(activity, userId) && activityDateTime > currentDateTime;
  });

  joinedFutureActivities.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  const nextActivity = joinedFutureActivities[0];

  return (
    <Stack as="section" $gap="m">
      <SectionTitle>Deine nächste Aktivität</SectionTitle>
      {nextActivity ? (
        <Link href={`/${nextActivity._id}`}>
          <ActivityCard
            name={nextActivity.name}
            date={nextActivity.date}
            time={nextActivity.time}
            joined
            category={nextActivity.category}
          />
        </Link>
      ) : (
        <StatusText>
          Noch nichts geplant – schließ dich deinen Freund*innen an!
        </StatusText>
      )}
      <Divider />
    </Stack>
  );
}
