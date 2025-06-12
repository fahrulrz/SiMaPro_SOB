import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/authMiddleware"; // Pastikan path ini benar

export function middleware(request: NextRequest) {
    // Log ini akan muncul di terminal tempat Next.js dev server berjalan
    // console.log(`🚀 Root middleware: Dipanggil untuk rute: ${request.nextUrl.pathname}`);

    const authResult = authMiddleware(request);

    if (authResult) {
        // Jika authMiddleware mengembalikan sebuah response (misalnya redirect),
        // maka kembalikan response tersebut.
        // console.log(`🚀 Root middleware: Menerima hasil dari authMiddleware, status: ${authResult.status}, lokasi redirect: ${authResult.headers.get('location') || 'Tidak ada redirect'}`);
        return authResult;
    }

    // Jika authMiddleware mengembalikan null, lanjutkan ke rute yang diminta.
    // console.log(`🚀 Root middleware: Melanjutkan dengan NextResponse.next() untuk: ${request.nextUrl.pathname}`);
    return NextResponse.next();
}

export const config = {
    /*
     * Matcher ini akan menjalankan middleware untuk semua path KECUALI:
     * - Path yang dimulai dengan `/api/` (rute API)
     * - Path yang dimulai dengan `/_next/static/` (file statis Next.js)
     * - Path yang dimulai dengan `/_next/image/` (file optimasi gambar Next.js)
     * - Path yang dimulai dengan `/assets/` (file di dalam folder public/assets Anda)
     * - Path yang diakhiri dengan `.ico`, `.png`, `.jpg`, dll. (file aset spesifik)
     * Ini penting agar middleware tidak mengganggu pemanggilan aset statis.
     */
    matcher: [
        '/((?!api|_next/static|_next/image|assets|.*\\.(?:ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)).*)',
    ],
};
