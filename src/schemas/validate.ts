import * as z from "zod";

export const signinSchema = z.object({
  email: z.email({
    error: "Email is required!",
  }),
  password: z.string().min(1, {
    error: "Password is required!",
  }),
});

export const signupSchema = z.object({
  email: z.email({
    error: "Email is required!",
  }),
  password: z.string().min(6, {
    error: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    error: "Name is required"
  })
})