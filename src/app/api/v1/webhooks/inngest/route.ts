import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { createClerkUser } from "@/inngest/clerk";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [createClerkUser],
});
