"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupSchema } from "@/schemas/validate";

import * as z from "zod";
import { signup } from "@/actions/actions";
import Wrapper from "@/components/auth/card-wrap";
import FormError from "@/components/auth/error";
import FormSuccess from "@/components/auth/success";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";

function SignUpForm() {
  const [isError, setError] = useState<string | undefined>("");
  const [isSuccess, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await signup(values);
      setError(result.error);
      setSuccess(result.success);
    });
  };

  return (
    <Wrapper
      headerLabel="Make your Account!"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/sign-in"
      socialTag="sign up with"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Your full name"
                      className="bg-transparent border-0 rounded-lg focus-visible:ring-2 focus-visible:ring-sky-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          <FormError message={isError} />
          <FormSuccess message={isSuccess} />
          <Button
            type="submit"
            className="w-full mt-6 cursor-pointer rounded-lg bg-sky-400 hover:bg-sky-500"
          >
            Sign up
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
}

export default SignUpForm;
