import NextAuth from "next-auth"
import { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Google from "next-auth/providers/google"

declare module "next-auth" {
  interface Session {
    user: {
      username?: string | null;
      bio?: string | null;
      url?: string | null;
      password?: string | null;
      passsalt?: string | null;
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: false,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      session.user = { ...session?.user, ...user }
      return session
    },
    jwt({ token, user }) {
      token = { ...token, ...user }
      return token
    },
  },
})
