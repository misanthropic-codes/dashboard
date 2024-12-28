import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return { id: user.id, email: user.email };
        }

        throw new Error("Invalid email or password.");
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },
  session: {
    strategy: "jwt", // Correctly typed
  },
};

// Updated export for Next.js 13 App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
