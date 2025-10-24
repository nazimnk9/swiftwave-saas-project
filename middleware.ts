import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value
  const pathname = request.nextUrl.pathname

  if (pathname === "/" || pathname.startsWith("/password/")) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/dashboard")) {
    
    if (!authToken) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
}
