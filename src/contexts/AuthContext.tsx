
"use client";

import React, { createContext, useState, useContext } from "react";
import { register as registerUser } from "@/api/auth"; // Pastikan path `auth` sesuai dengan lokasi fungsi register Anda

interface AuthContextProps {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => setUser(username);

  const logout = () => setUser(null);

  const register = async (name: string, email: string, password: string) => {
    try {
      const userData = await registerUser (name, email, password); // Memanggil fungsi `register`
      setUser (userData.name); // Menyimpan nama pengguna ke dalam state
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Lemparkan error agar bisa ditangani oleh komponen yang memanggilnya
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
