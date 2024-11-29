// import { createContext, useContext, useState } from 'react';
// import { useRouter } from 'next/router';

// interface User {
//     email: string;
// }


// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const AuthContext = createContext<any>(null);


// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();

//   const login = async (email: string, password: string) => {
//     const response = await fetch('http://127.0.0.1:8000/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       localStorage.setItem('token', data.token);
//       setUser({ email });
//       router.push('/');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// "use client";

// import React, { createContext, useState, useContext } from "react";
// import { register as registerUser } from "@/api/auth";

// interface AuthContextProps {
//   user: string | null;
//   login: (username: string) => void;
//   logout: () => void;
//   register: (name: string, email: string, password: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<string | null>(null);

//   const login = (username: string) => setUser(username);
//   const logout = () => setUser(null);
  
//   const register = async (name: string, email: string, password: string) => {
//     try {
//       const data = await registerUser(name, email, password); // Memanggil fungsi `register`
//       setUser(data.messages.name); // Menyimpan nama pengguna ke dalam state
//     } catch (error) {
//       console.error("Registration failed:", error);
//       throw error; // Lemparkan error agar bisa ditangani oleh komponen yang memanggilnya
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };



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
