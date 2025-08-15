import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma as db } from "@/db/db";

export const { handlers, auth, signIn } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
