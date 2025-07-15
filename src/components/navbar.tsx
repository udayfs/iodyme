"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MenuSquare,
  Briefcase,
  Building2,
  User,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const navigations = [
  { name: "Find Jobs", href: "/jobs" },
  { name: "organisation", href: "/orgs" },
  { name: "AI Guide", href: "/guide" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Auth state (from clerk)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 dark:backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-primary">iodyme</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigations.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-bold text-gray-600 transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex lg:flex-1 lg:max-w lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs, companies..."
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* navigation rhs */}
          <div className="flex items-center space-x-4">
            {/* Post Job Button */}
            <Button
              variant="outline"
              className="hidden sm:inline-flex bg-transparent hover:cursor-pointer"
            >
              <Building2 className="mr-2 h-4 w-4" />
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
              <div className="hidden lg:flex lg:items-center lg:space-x-2">
                <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>
                  Sign In
                </Button>
                <Button onClick={() => setIsLoggedIn(true)}>Sign Up</Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="lg:hidden" size="icon">
                  <MenuSquare className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search jobs, companies..."
                      className="pl-10 pr-4"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-2">
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
                  </div>

                  <div className="border-t pt-4">
                    <Button className="w-full mb-2">
                      <Building2 className="mr-2 h-4 w-4" />
                      Post Job
                    </Button>

                    {!isLoggedIn && (
                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => setIsLoggedIn(true)}
                        >
                          Sign In
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => setIsLoggedIn(true)}
                        >
                          Sign Up
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
