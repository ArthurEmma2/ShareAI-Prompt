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

        // Check if the user already exists based on the GitHub username
        const existingUser = await User.findOne({
          username: profile.name.replace("", "").toLowerCase(),
        });

        if (existingUser) {
          // User already exists, sign them in
          return true;
        } else {
          // User does not exist, create a new user
          await User.create({
            username: profile.name.replace("", "").toLowerCase(),
            image: profile.avatar_url, // Save the avatar URL as the image
          });

          // Sign in the newly created user
          return true;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
