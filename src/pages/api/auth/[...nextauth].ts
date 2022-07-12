import NextAuth, { Theme, type NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/welcome", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "#1F2937", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "#1F2937", // Hex color code
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: Number(process.env.EMAIL_SERVER_PORT),
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,

    //   sendVerificationRequest({
    //     identifier: email,
    //     url,
    //     provider: { server, from },
    //   }) {
    //     console.log("01", email);
    //     console.log("02", url);
    //     console.log("03", server);
    //     console.log("04", from);
    //   },
    // }),
    // GoogleProvider({
    //   clientId: String(process.env.GOOGLE_ID),
    //   clientSecret: String(process.env.GOOGLE_SECRET),
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //     },
    //   },
    // }),
  ],
  callbacks: {
    signIn: async (params: any) => {
      {
        console.log("User: ", params.user);
        console.log("Account: ", params.account);
        console.log("Profile: ", params.profile);
        return Promise.resolve(true);
      }
    },
  },
};

export default NextAuth(authOptions);
