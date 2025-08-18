import { getVerificationTokenByEmail } from "@/data";
import { v4 as uuidv4 } from "uuid";
import { prisma as db } from "@/db/db";

export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return verificationToken;
}
