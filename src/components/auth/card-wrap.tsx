import Link from "next/link";
import Social from "@/components/auth/socials";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { TriangleAlert } from "lucide-react";

type WrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  socialTag?: string;
  isErrorPage?: boolean;
};

function Wrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  socialTag,
  isErrorPage,
}: WrapperProps) {
  return (
    <Card className="w-[350px] text-gray-900 rounded-lg dark:text-white dark:bg-white/1 dark:backdrop-blur-xs border-2">
      <CardHeader>
        <div className="flex flex-col w-full items-center justify-center pb-2">
          {isErrorPage ? (
            <div className="flex flex-col items-center pb-2 text-destructive">
              <TriangleAlert className="h-7 w-7" />
            </div>
          ) : (
            <div className="flex flex-col items-center pb-2">
              <Briefcase className="h-7 w-7" />
              <span className="text-lg font-bold text-sky-500">iodyme</span>
            </div>
          )}
          <p
            className={`text-sm ${isErrorPage ? "text-destructive font-semibold" : "font-medium"}`}
          >
            {headerLabel}
          </p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <div className="flex flex-col w-full items-center justify-center gap-3">
          {isErrorPage ? null : (
            <div className="flex flex-col items-center justify-center w-full gap-3">
              <span className="font-semibold text-sky-500">Or {socialTag}</span>
              <Social />
            </div>
          )}
          <Link
            className="hover:underline font-medium text-sm"
            href={backButtonHref}
          >
            {backButtonLabel}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Wrapper;
