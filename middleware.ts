import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next()

    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: response.headers })
    }

    return response
  }

  // Admin route protection (in a real app, you'd verify JWT token)
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // This is a simplified check - in production, verify actual authentication
    const userAgent = request.headers.get("user-agent") || ""
    if (!userAgent.includes("Chrome") && !userAgent.includes("Firefox") && !userAgent.includes("Safari")) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
}
