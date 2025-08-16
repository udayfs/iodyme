"use server";
import * as z from "zod";

import { prisma as db } from "@/db/db";
import { signinSchema, signupSchema } from "@/schemas/validate";
import { signIn } from "@/auth/nextauth";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { hashPassword, generateSalt } from "@/actions/passwords";

export async function signin(
  values: z.infer<typeof signinSchema>,
): Promise<{ error: string } | undefined> {
  const validated = signinSchema.safeParse(values);

  if (!validated.success) return { error: "Invalid fields!" };

  const { email, password } = validated.data;

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

  return undefined;
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
      user_name: name,
      email,
      password: hashedPassword,
      salt,
      image_url: "nil",
      createdAt: new Date(),
    },
  });

  return { success: "Verification link sent!" };
}
