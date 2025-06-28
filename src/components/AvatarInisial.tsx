"use client";

import React from "react";

type AvatarProps = {
  name: string;
  size?: number; // biar bisa diatur ukurannya
};

const getInitials = (name: string) => {
  const words = name.trim().split(" ");
  const initials = words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  return initials;
};

const getRandomColor = (name: string) => {
  // pake hashing biar warna konsisten buat nama yang sama
  const hash = Array.from(name).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-emerald-500",
  ];
  return colors[hash % colors.length];
};

export default function AvatarInisial({ name, size = 40 }: AvatarProps) {
  const initials = getInitials(name);
  const bgColor = getRandomColor(name);

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-bold ${bgColor}`}
      style={{
        width: size,
        height: size,
        fontSize: size / 2,
      }}
    >
      {initials}
    </div>
  );
}
