// app/api/image-proxy/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("Missing URL", { status: 400 });
  }

  try {
    const res = await fetch(url);
    const contentType =
      res.headers.get("content-type") || "application/octet-stream";
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Image proxy error:", err);
    return new Response("Failed to fetch image", { status: 500 });
  }
}
