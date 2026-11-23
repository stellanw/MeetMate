/* Is this user part of the activity? Authors always are. */
export function isParticipant(activity, userId) {
  if (!activity || !userId) return false;
  return (
    activity.authorId === userId ||
    (activity.participants ?? []).includes(userId)
  );
}

export function isAuthor(activity, userId) {
  return Boolean(activity && userId && activity.authorId === userId);
}
