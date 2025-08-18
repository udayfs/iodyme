"use server";
import * as z from "zod";

import { prisma as db } from "@/db/db";
import { signinSchema, signupSchema } from "@/schemas/validate";
import { signIn } from "@/auth/nextauth";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { hashPassword, generateSalt } from "@/actions/passwords";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/data";

export async function signin(
  values: z.infer<typeof signinSchema>,
): Promise<{ error?: string; success?: string } | undefined> {
  const validated = signinSchema.safeParse(values);

  if (!validated.success) return { error: "Invalid fields!" };

  const { email, password } = validated.data;

  const user = await getUserByEmail(email);
  if (!user || !user.email || !user.password) {
    return { error: "Email does not exist!" };
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email);

    return { success: "Verification link sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw err;
  }
}

export async function signup(
  values: z.infer<typeof signupSchema>,
): Promise<{ error?: string; success?: string }> {
  const validated = signupSchema.safeParse(values);

  if (!validated.success) return { error: "Invalid fields!" };

  const { email, password, name } = validated.data;

  const userExist = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist !== null) return { error: "Email already in use!" };

  const salt = await generateSalt();
  const hashedPassword = await hashPassword(password, salt);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      salt,
      image: "nil",
    },
  });

  const verificationToken = await generateVerificationToken(email);

  return { success: "Verification link sent!" };
}
