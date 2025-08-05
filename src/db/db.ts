import prisma from "@/db/client";
import { User } from "@prisma/client";

export async function dbCreateUser(user: User): Promise<void> {
  await prisma.user.upsert({
    create: { ...user },
    update: {},
    where: { user_id: user.user_id },
  });
}
