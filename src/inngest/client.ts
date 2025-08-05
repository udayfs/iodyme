import { EventSchemas, Inngest } from "inngest";
import { UserJSON, DeletedObjectJSON } from "@clerk/nextjs/server";

type ClerkWebhookData<T> = {
  data: {
    data: T;
    raw: string;
    headers: Record<string, string>;
  };
};

type Event = {
  "clerk/user.created": ClerkWebhookData<UserJSON>;
  "clerk/user.updated": ClerkWebhookData<UserJSON>;
  "clerk/user.deleted": ClerkWebhookData<DeletedObjectJSON>;
};

export const inngest = new Inngest({
  id: "iodyme",
  schemas: new EventSchemas().fromRecord<Event>(),
});
