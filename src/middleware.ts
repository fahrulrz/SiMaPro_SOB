import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/authMiddleware"; // Pastikan path ini benar
import { adminMiddleware } from "./middlewares/adminMiddleware";

export function middleware(request: NextRequest) {
  const authResult = authMiddleware(request);
  const adminResult = adminMiddleware(request)

  if (authResult) {
    return authResult;
  }

  if (adminResult) {
    return adminResult;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|.*\\.(?:ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)).*)",
  ],
};
