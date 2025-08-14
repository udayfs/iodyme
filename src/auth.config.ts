import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";

import type { NextAuthConfig } from "next-auth";

export default {
  providers: [Google, LinkedIn],
} satisfies NextAuthConfig;
