import { toast } from "react-toastify";

export default async function handleAccept(
  userId,
  session,
  setMyMates,
  myMates
) {
  try {
    const response = await fetch(`/api/users/addFriend/${session.user?.id}`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setMyMates([userId, ...myMates]);
      return toast.success(`Neuer Mate hinzugefügt!`);
    } else {
      toast.error(`Ihr seid schon Mates!`);
      console.error("Failed to update user.");
    }
  } catch (error) {
    console.error("Error occurred while updating user:", error);
  }
}
