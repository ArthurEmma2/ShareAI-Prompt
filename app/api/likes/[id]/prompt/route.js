import { connectToDB } from "utils/database";
import Prompt from "models/prompt";

export const GET = async (req, { params }) => {
  await connectToDB();

  try {
    const postId = params.id;
    const prompt = await Prompt.findById(postId);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify({ likes: prompt.likes.length }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Error getting likes", { status: 500 });
  }
};

export const POST = async (req, { params }) => {
  const { session } = await req.json();
  await connectToDB();
  const postId = params.id;

  try {
    const prompt = await Prompt.findById(postId);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    if (req.method === "POST") {
      if (!prompt.likes.includes(session.user.id)) {
        prompt.likes.push(session.user.id);
      }
    } else if (req.method === "DELETE") {
      prompt.likes = prompt.likes.filter(
        (userId) => userId.toString() !== session.user.id
      );
    }

    const updatedPrompt = await prompt.save();

    return new Response(JSON.stringify({ likes: updatedPrompt.likes.length }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Error updating likes", { status: 500 });
  }
};
