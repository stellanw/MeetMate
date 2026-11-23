import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const activities = await Activity.find();
    return response.status(200).json(activities);
  }

  if (request.method === "POST") {
    const session = await getServerSession(request, response, authOptions);
    if (!session) {
      return response.status(401).json({ message: "Not signed in" });
    }

    try {
      // author is always the signed-in user – never taken from the request
      const { author, authorId, participants, ...activityData } = request.body;
      await Activity.create({
        ...activityData,
        author: session.user.name,
        authorId: session.user.id,
        participants: [session.user.id],
      });
      return response.status(201).json({ status: "Activity created" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
