import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

/*
 * POST   /api/activities/:id/join → current user joins
 * DELETE /api/activities/:id/join → current user leaves
 * The user always comes from the session, never from the request body.
 */
export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    return response.status(401).json({ message: "Not signed in" });
  }

  await dbConnect();
  const { id } = request.query;
  const userId = session.user.id;

  const activity = await Activity.findById(id);
  if (!activity) {
    return response.status(404).json({ message: "Not found" });
  }

  if (request.method === "POST") {
    await Activity.findByIdAndUpdate(id, { $addToSet: { participants: userId } });
    return response.status(200).json({ joined: true });
  }

  if (request.method === "DELETE") {
    if (activity.authorId === userId) {
      return response
        .status(403)
        .json({ message: "The author cannot leave their own activity" });
    }
    await Activity.findByIdAndUpdate(id, { $pull: { participants: userId } });
    return response.status(200).json({ joined: false });
  }

  return response.status(405).json({ message: "Method not allowed" });
}
