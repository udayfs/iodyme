"use server";

import bcrypt from "bcryptjs";

export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(
  inputPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

export async function generateSalt(): Promise<string> {
  return bcrypt.genSalt(16);
}
