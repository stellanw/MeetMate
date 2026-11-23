import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import Activity from "@/db/models/Activity";

const NAME_MIN = 2;
const NAME_MAX = 40;

/* PUT /api/users/me { name } – the signed-in user changes their display name */
export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    return response.status(401).json({ message: "Not signed in" });
  }
  if (request.method !== "PUT") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  const name = String(request.body?.name ?? "").trim();
  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    return response
      .status(400)
      .json({ message: `Name must be ${NAME_MIN}–${NAME_MAX} characters` });
  }

  await dbConnect();
  const userId = session.user.id;
  await User.findByIdAndUpdate(userId, { name });
  // activities store the author name – keep them in sync
  await Activity.updateMany({ authorId: userId }, { author: name });

  return response.status(200).json({ name });
}
