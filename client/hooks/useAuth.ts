import { useRouter } from "next/navigation";
import { useState } from "react";
import { Routes } from "@/routes/routes";
import api from "../lib/api";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/login", { email, password });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Login successful");
      router.push(Routes.TODO);
      router.refresh();
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };
  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/register", { email, password });
      alert("Registration successful");
      router.push(Routes.SIGNIN);
    } catch (err: any) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      router.push(Routes.SIGNIN);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return { login, register, logout, loading, error };
};
