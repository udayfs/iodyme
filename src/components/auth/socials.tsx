"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

function Social() {
  const oauth = async (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="sm"
        className="flex-1 cursor-pointer rounded-lg not-dark:bg-gray-400 not-dark:hover:bg-gray-300"
        onClick={() => oauth("google")}
      >
        <Image
          src="/svg/google.svg"
          alt="google_login"
          width={25}
          height={25}
          priority
        />
      </Button>
      <Button
        size="sm"
        className="flex-1 cursor-pointer rounded-lg not-dark:bg-gray-400 not-dark:hover:bg-gray-300"
        onClick={() => oauth("github")}
      >
        <Image
          src="/svg/github.svg"
          alt="linkedin_login"
          width={25}
          height={25}
          priority
        />
      </Button>
    </div>
  );
}

export default Social;
