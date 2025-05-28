import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register", "/reset-password"];
const DEFAULT_AUTHENTICATED_REDIRECT = "/home";

export function authMiddleware(request: NextRequest): NextResponse | null {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("auth-token")?.value;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (token) {
        if (isPublicRoute) {
            const redirectUrl = new URL(DEFAULT_AUTHENTICATED_REDIRECT, request.url);
            return NextResponse.redirect(redirectUrl);
        }
        return null;
    } else {
        if (isPublicRoute) {
            return null;
        }
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }
}
