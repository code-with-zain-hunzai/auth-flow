import { useRouter } from "next/navigation";
import { useState } from "react";
import { Routes } from "@/routes/routes";
import { loginUser, registerUser, logoutUser } from "@/services/authService";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      console.log("Login response:", data);

      document.cookie = `jwt=${data.token}; path=/  `;

      alert("Login successful");
      router.push(Routes.TODO);
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
      await registerUser(email, password);
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

  return { login, register, loading, error };
};
