import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <div className="inset-0 flex items-center w-full justify-center min-h-screen relative bg-black/[0.96]">
      <div className="relative z-10 -top-25">
        <SignUp />
      </div>
    </div>
  );
}

export default SignUpPage;
