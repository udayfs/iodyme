import { SignIn } from "@clerk/nextjs";
import { Spotlight } from "@/components/ui/spotlight";

function SignInPage() {
  return (
    <div className="inset-0 flex items-center w-full justify-center min-h-screen relative bg-black overflow-hidden">
      <Spotlight duration={5} />
      <div className="relative z-10 -top-25">
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
