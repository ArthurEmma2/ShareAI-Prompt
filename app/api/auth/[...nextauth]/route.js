import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { connectToDB } from "utils/database";
import User from "models/user";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if the user already exists based on the GitHub user ID
        const existingUser = await User.findOne({
          userId: profile.id,
        });

        if (existingUser) {
          // User already exists, sign them in
          return {
            success: true,
            message: "User found and signed in",
            user: existingUser,
          };
        } else {
          // User does not exist, create a new user
          const newUser = await User.create({
            userId: profile.id, // Use GitHub user ID to uniquely identify the user
            username: profile.name.replace("", "").toLowerCase(),
            image: profile.avatar_url, // Save the avatar URL as the image
          });

          // Sign in the newly created user
          return {
            success: true,
            message: "New user created and signed in",
            user: newUser,
          };
        }
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "Error occurred while signing in",
        };
      }
    },
  },
});

export { handler as GET, handler as POST };
