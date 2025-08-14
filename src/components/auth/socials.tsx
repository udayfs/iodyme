import { Button } from "@/components/ui/button";
import Image from "next/image";

function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="sm"
        className="flex-1 cursor-pointer rounded-lg not-dark:bg-gray-400 not-dark:hover:bg-gray-300"
        onClick={() => {}}
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
        onClick={() => {}}
      >
        <Image
          src="/svg/linkedin.svg"
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
