"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Search, Menu, Briefcase, Building2 } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

const navigations = [
  { name: "Find Jobs", href: "/jobs" },
  { name: "Organisation", href: "/orgs" },
  { name: "Guide", href: "/guide" },
];

function Navbar({ className }: { className?: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 dark:backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center mr-8 pb-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-primary">iodyme</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3">
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

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w mx-10">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs, companies..."
                className="pl-10 pr-4 rounded-xl focus-visible:border-sky-500 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            {/* Post Job Button */}
            <Button
              variant="outline"
              className="inline-flex bg-transparent hover:cursor-pointer mr-4 rounded-xl"
            >
              <Building2 className="h-4 w-4" />
              Post Job
            </Button>

            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center ml-4 space-x-2">
                <Button
                  variant="outline"
                  className="rounded-xl hover:cursor-pointer"
                  onClick={() => router.push("/sign-in")}
                >
                  Sign In
                </Button>
                <Button
                  className="rounded-xl hover:cursor-pointer"
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </Button>
              </div>
            </SignedOut>

            {/* Desktop theme toggle */}
            <ThemeToggle />
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile theme toggle */}
            <ThemeToggle className="mr-3" />

            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Mobile Menu */}
            <Sheet modal open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="lg:hidden rounded-xl"
                  size="icon"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-[-10]">
                  <SheetTitle asChild>
                    {/* Mobile Search */}
                    <div className="relative top-[-6] mr-6">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search jobs, companies..."
                        className="pl-10 font-light rounded-xl text-sm focus-visible:border-sky-500 focus-visible:ring-0"
                      />
                    </div>
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
                      className="mt-3 ml-2 rounded-xl hover:cursor-pointer"
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      Post Job
                    </Button>

                    {/* Auth Button */}
                    <SignedOut>
                      <div className="grid gap-2">
                        <Button
                          className="mt-1 ml-2 rounded-xl hover:cursor-pointer"
                          onClick={() => router.push("/sign-in")}
                        >
                          Sign In
                        </Button>
                      </div>
                    </SignedOut>
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
