import { connectToDB } from "utils/database";
import Prompt from "models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { staus: 200 });
  } catch (err) {
    return new Response("failed to fecth prompt", { staus: 404 });
  }
};
