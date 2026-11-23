import { toast } from "react-toastify";

export default async function handleRemoveFromFriendRequests(
  friendRequestId,
  userId
) {
  try {
    const response = await fetch(`/api/users/addFriend/${friendRequestId}`, {
      method: "DELETE",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return toast.success(`Anfrage abgelehnt.`);
    } else {
      toast.error(`Anfrage nicht gefunden.`);
      console.error("Failed to delete user.");
    }
  } catch {
    console.error("Error occurred while deleting user:", error);
  }
}
