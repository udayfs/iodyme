import { prisma as db } from "@/db/db";

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getVerificationTokenByEmail(email: string) {
  return await db.verificationToken.findFirst({
    where: {
      email,
    },
  });
}

export async function getVerificationTokenByToken(token: string) {
  return await db.verificationToken.findUnique({
    where: {
      token,
    },
  });
}
