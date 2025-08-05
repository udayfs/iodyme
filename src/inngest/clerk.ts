import { User } from "@prisma/client";
import { dbCreateUser } from "@/db/db";

import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { Webhook } from "svix";

function verifyWebhook({
  raw,
  headers,
}: {
  raw: string;
  headers: Record<string, string>;
}) {
  return new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET as string).verify(
    raw,
    headers
  );
}

export const createClerkUser = inngest.createFunction(
  { id: "create-db-user", name: "Create User" },
  { event: "clerk/user.created" },

  async ({ event, step }) => {
    await step.run("verify-webhook", async () => {
      try {
        verifyWebhook(event.data);
      } catch {
        throw new NonRetriableError("Unrecognized webhook request");
      }
    });

    await step.run("create-user", async () => {
      const userData = event.data.data;
      const email = userData.email_addresses.find(
        (email) => email.id === userData.primary_email_address_id
      );

      if (email === undefined) {
        throw new NonRetriableError("No primary email address found");
      }

      await dbCreateUser({
        user_id: userData.id,
        user_name: `${userData.first_name} ${userData.first_name}`,
        email: email.email_address,
        image_url: userData.image_url,
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at),
      } as User);

      return userData.id;
    });
  }
);
