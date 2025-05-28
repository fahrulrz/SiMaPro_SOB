// src/app/(auth)/layout.tsx
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const path = pathname.split("/");

  let isAbout = false;

  if (path[path.length - 1] == "about") {
    isAbout = true;
  } else {
    isAbout = true;
  }

  return (
    <div className="auth-layout bg-[#E5E1DA]">
      {/* Layout khusus untuk main page */}

      {/* navbar start */}
      <div className="sticky top-0 left-0 right-0 z-40">
        <Navbar />
      </div>

      {/* navbar end */}
      {children}
      <div className={`mt-10 max-sm:mt-5 ${isAbout ? "mt-0 max-sm:mt-0" : ""}`}>
        <Footer />
      </div>
    </div>
  );
}
