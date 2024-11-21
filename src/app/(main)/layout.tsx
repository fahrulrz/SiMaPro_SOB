// src/app/(auth)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout bg-[#E5E1DA]">
      {/* Layout khusus untuk main page */}

      {/* navbar start */}
      <div className="sticky top-0 left-0 right-0 z-40">
        <Navbar  />
      </div>

      {/* navbar end */}
      {children}
      <div className="mt-10 max-sm:mt-5">
        <Footer />
      </div>
    </div>
  );
}
