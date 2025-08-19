"use client";

import * as z from "zod";
import Wrapper from "@/components/auth/card-wrap";
import FormError from "@/components/auth/error";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signinSchema } from "@/schemas/validate";
import { signin } from "@/actions/actions";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";

function SignInForm() {
  const [isError, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Please link your account with different email address!"
      : "";

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    setError("");

    startTransition(async () => {
      const result = await signin(values);
      setError(result?.error);
    });
  };

  return (
    <Wrapper
      headerLabel="Sign in with your email!"
      backButtonLabel="Don't have an account? Make one!"
      backButtonHref="/auth/sign-up"
      socialTag="sign in with"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                      className="bg-transparent border-0 rounded-lg focus-visible:ring-2 focus-visible:ring-sky-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      className="bg-transparent border-0 rounded-lg focus-visible:ring-2 focus-visible:ring-sky-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={isError || urlError} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 cursor-pointer rounded-lg bg-sky-400 hover:bg-sky-500"
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : "Sign in"}
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
}

export default SignInForm;
