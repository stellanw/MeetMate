import Link from "next/link";
import { useSession } from "next-auth/react";
import ActivityCard from "@/components/ActivityCard";
import { Stack } from "@/components/ui/Layout";
import { StatusText } from "@/components/ui/Typography";
import { isParticipant } from "@/utils/participation";

/* List of linked activity cards, sorted by date – or a message if empty */
export default function ActivityList({ activities, emptyText, label }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (activities.length === 0) {
    return <StatusText>{emptyText}</StatusText>;
  }

  const sorted = [...activities].sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  );

  return (
    <Stack as="ul" $gap="l" aria-label={label}>
      {sorted.map((activity) => (
        <li key={activity._id}>
          <Link href={`/${activity._id}`}>
            <ActivityCard
              name={activity.name}
              date={activity.date}
              time={activity.time}
              joined={isParticipant(activity, userId)}
              category={activity.category}
            />
          </Link>
        </li>
      ))}
    </Stack>
  );
}
