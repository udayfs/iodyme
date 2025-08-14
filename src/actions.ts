"use server";

import { prisma as db } from "@/db/db";
import { signinSchema, signupSchema } from "@/schemas/validate";
import * as z from "zod";
import { scrypt, randomBytes } from "node:crypto";

async function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error);
      resolve(hash.toString("hex").normalize());
    });
  });
}

function generateSalt(): string {
  return randomBytes(16).toString("hex").normalize();
}

export async function login(
  values: z.infer<typeof signinSchema>,
): Promise<{ error?: string; success?: string }> {
  const validated = signinSchema.safeParse(values);

  if (!validated.success) return { error: "Invalid fields!" };

  return { success: "Email sent!" };
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

  const user = await db.user.create({
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
