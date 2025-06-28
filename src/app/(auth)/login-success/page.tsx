import dynamic from "next/dynamic";
import { Suspense } from "react";

const LoginComponent = dynamic(() => import("@/components/LoginComponent"), {
  ssr: false, 
});

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
  );
}
