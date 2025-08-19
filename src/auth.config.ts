import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { signinSchema } from "@/schemas/validate";
import { comparePassword } from "@/actions/passwords";
import { getUserByEmail } from "@/data";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(creds) {
        const validated = signinSchema.safeParse(creds);
        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);
          if (!user || !password) return null;

          const isCorrectPassword = await comparePassword(
            password,
            user.password as string,
          );
          if (isCorrectPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
