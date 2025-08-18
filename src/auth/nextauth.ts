import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma as db } from "@/db/db";
import { getUserById } from "@/data";
import { Role } from "@prisma/client";

type ExtendedUser = DefaultSession["user"] & {
  role: Role;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        const existingUser = await getUserById(user.id!);
        if (!existingUser?.emailVerified) return false;
      }

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) session.user.id = token.sub;
      if (token.role && session.user) session.user.role = token.role as Role;
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);

      if (!user) return token;
      token.role = user.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
