import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { signinSchema } from "@/schemas/validate";
import { comparePassword } from "@/actions/passwords";
import { getUserByEmail } from "@/data";

export default {
  providers: [
    Google,
    LinkedIn,
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
