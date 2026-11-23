import { toast } from "react-toastify";
import { isParticipant } from "@/utils/participation";

/* Join or leave an activity – optimistic update, then sync with the server */
export default async function handleJoin(activity, userId, mutate) {
  const joining = !isParticipant(activity, userId);
  const participants = activity.participants ?? [];

  mutate(
    {
      ...activity,
      participants: joining
        ? [...participants, userId]
        : participants.filter((participant) => participant !== userId),
    },
    false
  );

  const response = await fetch(`/api/activities/${activity._id}/join`, {
    method: joining ? "POST" : "DELETE",
  });

  if (!response.ok) {
    toast.error("Das hat nicht geklappt. Bitte versuch es noch einmal.");
  }
  mutate();
}
