"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Search, Menu, Briefcase, Building2, User, Bell } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const navigations = [
  { name: "Find Jobs", href: "/jobs" },
  { name: "Organisation", href: "/orgs" },
  { name: "Guide", href: "/guide" },
];

function Navbar({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Auth state (will be using clerk).
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                className="pl-10 pr-4 rounded-xl"
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

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    3
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="User"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          John Doe
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>My Applications</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              //  Auth Buttons
              <div className="hidden lg:flex items-center ml-4 space-x-2">
                <Button
                  variant="outline"
                  className="rounded-xl hover:cursor-pointer"
                  onClick={() => setIsLoggedIn(true) /* TODO: remove this. */}
                >
                  Sign In
                </Button>
                <Button
                  className="rounded-xl hover:cursor-pointer"
                  onClick={() => setIsLoggedIn(true) /* TODO: remove this. */}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Desktop theme toggle */}
            <ThemeToggle />
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile theme toggle */}
            <ThemeToggle />

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
                        className="pl-10 font-light rounded-xl"
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
                    {!isLoggedIn && (
                      <div className="grid gap-2">
                        <Button
                          className="mt-1 ml-2 rounded-xl hover:cursor-pointer"
                          onClick={() => setIsLoggedIn(true)}
                        >
                          Sign In
                        </Button>
                      </div>
                    )}
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
