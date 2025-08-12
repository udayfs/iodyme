"use server";

import { signinSchema } from "./schemas/validate";
import * as z from "zod";

export async function login(
  values: z.infer<typeof signinSchema>
): Promise<{ error?: string; success?: string }> {
  const validated = signinSchema.safeParse(values);

  if (!validated.success) {
    return {
      error: "Invalid fields!",
    };
  }
  return { success: "Email sent!" };
}
