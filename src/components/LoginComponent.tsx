"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginComponent() {
  const searchParams = useSearchParams();
  const { getUserData } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const status = searchParams.get("status");

    if (status === "success" && token) {
      document.cookie = `auth-token=${token}; path=/`;
      localStorage.setItem("token", token);

      // Kasih delay sebentar buat pastiin cookie-nya udah keset
      setTimeout(() => {
        getUserData();
      }, 1000);
    }
  }, [searchParams]);

  return <div className="w-lvw h-lvh flex justify-center it">Loading...</div>;
}
