"use client";

import Wrapper from "@/components/auth/card-wrap";
import { useSearchParams } from "next/navigation";

function ErrorCard() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <Wrapper
      headerLabel="Something went wrong!"
      backButtonLabel="Back to Sign-in page &rarr;"
      backButtonHref="/auth/sign-in"
      isErrorPage
    >
      <span className="flex justify-center w-full text-sm font-bold text-red-500">
        {error + " error" || "Authentication error"}!
      </span>
    </Wrapper>
  );
}

export default ErrorCard;
