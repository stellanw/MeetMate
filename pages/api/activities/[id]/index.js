import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  const activity = await Activity.findById(id);
  if (!activity) {
    return response.status(404).json({ status: "Not Found" });
  }

  if (request.method === "GET") {
    return response.status(200).json(activity);
  }

  // editing and deleting is only allowed for the author
  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    return response.status(401).json({ message: "Not signed in" });
  }
  if (activity.authorId !== session.user.id) {
    return response.status(403).json({ message: "Only the author can do this" });
  }

  if (request.method === "PUT") {
    // author and participants never change through the edit form
    const { participants, author, authorId, ...activityData } = request.body;
    await Activity.findByIdAndUpdate(id, activityData);
    return response.status(200).json({ status: `Activity ${id} updated!` });
  }

  if (request.method === "DELETE") {
    await Activity.findByIdAndDelete(id);
    return response
      .status(200)
      .json({ status: `Activity ${id} successfully deleted.` });
  }

  return response.status(405).json({ message: "Method not allowed" });
}
