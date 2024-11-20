// src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      {/* Layout khusus untuk halaman utama */}
      
      {/* navbar start */}
        

      {/* navbar end */}

      {children}
    </div>
  );
}
