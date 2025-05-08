"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "../types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import AuthLayout from "@/app/components/AuthLayout";
import { z } from "zod";
import Link from "next/link";

type SigninFormData = z.infer<typeof SigninSchema>;

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(SigninSchema),
  });

  const { login, loading } = useAuth();

  const onSubmit = (data: SigninFormData) => {
    login(data.email, data.password);
  };

  return (
    <AuthLayout title="Sign In to Your Account">
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
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline ml-3">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
