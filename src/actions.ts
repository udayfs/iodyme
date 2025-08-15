"use server";
import * as z from "zod";

import { prisma as db } from "@/db/db";
import { signinSchema, signupSchema } from "@/schemas/validate";
import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { signIn } from "@/auth/nextauth";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error);
      resolve(hash.toString("hex").normalize());
    });
  });
}

export async function comparePassword(
  inputPassword: string,
  salt: string,
  hashedPassword: string,
): Promise<boolean> {
  const inputHashedPassword = await hashPassword(inputPassword, salt);

  return timingSafeEqual(
    Buffer.from(inputHashedPassword),
    Buffer.from(hashedPassword),
  );
}

export function generateSalt(): string {
  return randomBytes(16).toString("hex").normalize();
}

export async function login(
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

  const salt = generateSalt();
  const hashedPassword = await hashPassword(password, salt);

  await db.user.create({
    data: {
      user_name: name,
      email,
      password: hashedPassword,
      salt,
      image_url: "null",
      createdAt: new Date(),
    },
  });

  return { success: "User Created!" };
}
