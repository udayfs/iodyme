import SignInForm from "@/components/auth/sign-in-form";
import { Suspense } from "react";

function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}

export default SignInPage;
