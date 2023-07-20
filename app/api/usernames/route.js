import { connectToDB } from "utils/database";
import User from "models/user";

export const GET = async (req, res) => {
  try {
    // Connect to the database
    await connectToDB();

    // Query the database to get all usernames
    const usernames = await User.find({}, { username: 1 });

    // Extract the usernames from the query result
    const usernamesList = usernames.map((user) => user.username);

    // Output all the usernames in the console
    console.log(usernamesList);

    // Return the usernames as a JSON response
    return new Response(JSON.stringify(usernamesList), { status: 201 });
  } catch (err) {
    return new Response("failed to create username", { status: 404 });
  }
};
