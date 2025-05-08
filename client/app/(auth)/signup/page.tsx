"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import AuthLayout from "@/app/components/AuthLayout";
import { z } from "zod";
import Link from "next/link";

type SignupFormData = z.infer<typeof SignupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const { register: signUp, loading } = useAuth();

  const onSubmit = (data: SignupFormData) => {
    signUp(data.email, data.password);
  };
  return (
    <AuthLayout title="Create an Account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline ml-3">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
