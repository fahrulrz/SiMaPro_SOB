"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { register as registerUser, googleLogin, getUser } from "@/api/auth";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => void;
  googleLogin: () => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  getUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser); // atau parsedUser tergantung struktur object-nya
    }
  }, []);

  const getUserData = async () => {
    try {
      const res = await getUser();
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/home";
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(url + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login gagal");
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data));
    document.cookie = `auth-token=${data.data.token}; path=/`;
    window.location.href = "/home";
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      document.cookie =
        "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      console.log("Logout success");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const userData = await registerUser(name, email, password);
      setUser(userData.name);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const handleGoogleLogin = async () => {
    try {
      googleLogin();
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        googleLogin: handleGoogleLogin,
        logout,
        register,
        getUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
