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

        const userExists = await User.findOne({ username: profile.username });

        if (!userExists) {
          await User.create({
            username: profile.name.replace("", "").toLowerCase(),
            image: profile.avatar_url, // Save the avatar URL as the image
          });
        } else {
          // Update the image if the user already exists
          userExists.image = profile.avatar_url; // Assign the new avatar URL
          await userExists.save();
        }

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
