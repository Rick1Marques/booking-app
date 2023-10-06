import connect from "@/db/connect";
import User from "@/db/models/User";
import Listing from "@/db/models/Listing";
import Starship from "@/db/models/Starship";

export default async function handler(request, response) {
  await connect();
  if (request.method === "GET") {
    const user = await User.findById("651fe0d15de60b4a1ebaabc0")
      .sort({ createdAt: -1 })
      .populate("listings")
      .populate("starships")
      .exec();
    response.status(200).json(user);
    return;
  }
  response.status(405).json({ message: "Method not allowed" });
}
