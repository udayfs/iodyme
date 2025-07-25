import { SignUp } from "@clerk/nextjs";
import { BackgroundBeams } from "@/components/ui/bg-beams";

function SignInPage() {
  return (
    <div className="relative overflow-hidden items-center justify-center min-h-screen flex flex-col w-full antialiased">
      <div className="mx-auto relative z-10">
        <SignUp />
      </div>
      <BackgroundBeams className="h-full bg-black/[0.96]" />
    </div>
  );
}

export default SignInPage;
