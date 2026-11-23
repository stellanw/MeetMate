import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const activities = await Activity.find();
    return response.status(200).json(activities);
  }

  if (request.method === "POST") {
    try {
      const activityData = request.body;
      // whoever creates an activity is always part of it
      await Activity.create({
        ...activityData,
        participants: [activityData.authorId],
      });

      response.status(201).json({ status: "Activity created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
