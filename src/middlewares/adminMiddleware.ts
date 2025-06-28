import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/middlewares/utils";

const UNAUTHORIZED_REDIRECT = "/home";
const ADMIN_REOUTES = [
  "/home/project/add-project",
  "/mahasiswa/add-mahasiswa",
  "/team/add-profile-team",
  "/stakeholder/add-stakeholder",
  "/home/project/edit-project",
  "/mahasiswa/edit-mahasiswa",
  "/stakeholder/edit-stakeholder",
  "/team/edit-profile-team",
];

export function adminMiddleware(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  if (!token) return null;
  const adminRoute = ADMIN_REOUTES.includes(pathname);

  try {
    const decoded = decodeToken(token);
    if (adminRoute) {
      if (decoded.role !== "admin") {
        return NextResponse.redirect(
          new URL(UNAUTHORIZED_REDIRECT, request.url)
        );
      }
    }

    return null;
  } catch (err) {
    console.error("adminMiddleware decode error:", err);
    return NextResponse.redirect(new URL(UNAUTHORIZED_REDIRECT, request.url));
  }
}
