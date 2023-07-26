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
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if the user already exists based on the GitHub user ID
        const existingUser = await User.findOne({
          userId: profile.id.toString,
        });

        if (existingUser) {
          // User already exists, sign them in
          return {
            success: true,
            message: "User found and signed in",
            user: {
              _id: existingUser._id.toString(),
              userId: profile.id,
              username: profile.name.replace("", "").toLowerCase(),
              image: profile.avatar_url,
            },
          };
        } else {
          // User does not exist, create a new user
          const newUser = await User.create({
            userId: profile.id,
            username: profile.name.replace("", "").toLowerCase(),
            image: profile.avatar_url,
          });

          // Sign in the newly created user
          return {
            success: true,
            message: "New user created and signed in",
            user: {
              _id: newUser._id,
              userId: profile.id,
              username: profile.name.replace("", "").toLowerCase(),
              image: profile.avatar_url,
            },
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
