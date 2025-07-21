import { SignUp } from "@clerk/nextjs";
import { Spotlight } from "@/components/ui/spotlight";

function SignUpPage() {
  return (
    <div className="inset-0 flex items-center w-full justify-center min-h-screen relative bg-black/[0.96] overflow-hidden">
      <Spotlight duration={5} />
      <div className="relative z-10 -top-25">
        <SignUp />
      </div>
    </div>
  );
}

export default SignUpPage;
