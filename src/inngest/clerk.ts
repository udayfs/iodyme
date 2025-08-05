import { dbCreateUser } from "@/prisma/db";
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
    headers,
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

    const userId = await step.run("create-user", async () => {
      const userData = event.data.data;
      const email = userData.email_addresses.find(
        (email) => email.id === userData.primary_email_address_id,
      );

      if (email === null) {
        throw new NonRetriableError("No primary email address found");
      }

      await dbCreateUser();
      return userData.id;
    });
  },
);
