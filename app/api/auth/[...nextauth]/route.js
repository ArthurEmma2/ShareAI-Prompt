import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { connectToDB } from "utils/database";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  async session({ session }) {
    try{

    }catch{
      
    }
  },

  async signIn({ profile }) {
    try{
      await connectToDB()
      return true


    }catch(err){
      console.log(err)
      return false

    }
 
  },
});

export { handler as GET, handler as POST };
