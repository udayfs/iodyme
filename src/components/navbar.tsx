"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Menu, Briefcase, Building2 } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navigations = [
  { name: "Find Jobs", href: "/jobs" },
  { name: "Organisations", href: "/orgs" },
  { name: "Guide", href: "/guide" },
];

function Navbar({ className }: { className?: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 dark:backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center pb-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-sky-500">iodyme</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 mr-auto ml-7">
            {navigations.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-muted-foreground hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            {/* Post Job Button */}
            <Button
              variant="outline"
              className="inline-flex bg-transparent hover:cursor-pointer mr-4 rounded-lg"
              onClick={() => router.push("/jobpost")}
            >
              <Building2 className="h-4 w-4" />
              Post Job
            </Button>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center ml-2 space-x-2">
              <Button
                variant="outline"
                className="rounded-lg hover:cursor-pointer"
                onClick={() => router.push("/auth/sign-in")}
              >
                Sign In
              </Button>
              <Button
                className="rounded-lg hover:cursor-pointer bg-sky-400"
                onClick={() => router.push("/auth/sign-up")}
              >
                Sign Up
              </Button>
            </div>

            {/* Desktop theme toggle */}
            <ThemeToggle />
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile theme toggle */}
            <ThemeToggle className="mr-3" />

            {/* Mobile Menu */}
            <Sheet modal open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="lg:hidden rounded-lg"
                  size="icon"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-[-10]">
                  <SheetTitle asChild>
                    <Link
                      href="/"
                      className="font-bold text-lg px-1"
                      onClick={() => setIsOpen(false)}
                    >
                      Iodyme
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation */}
                <div className="grid flex-1 auto-rows-min px-2">
                  <div className="grid gap-3">
                    {navigations.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Button
                      variant="outline"
                      className="mt-3 ml-2 rounded-lg hover:cursor-pointer"
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      Post Job
                    </Button>

                    {/* Auth Button */}

                    <div className="grid gap-2">
                      <Button
                        className="mt-1 ml-2 rounded-lg hover:cursor-pointer"
                        onClick={() => router.push("/auth/sign-in")}
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
