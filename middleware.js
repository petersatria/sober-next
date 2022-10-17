import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  const PUBLIC_FILE = /\.(.*)$/;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static") || PUBLIC_FILE.test(pathname)) return NextResponse.next();

  let user = req.cookies.get("userCookie");
  let verify = "";

  if (pathname === "/login" || pathname === "/" || pathname === "/blogs") {
    return NextResponse.next();
  }

  if (user !== undefined) {
    user = JSON.parse(req.cookies.get("userCookie"));
    verify = user.token;
    if (!verify) {
      return NextResponse.redirect(`${origin}/login`);
    } else {
      if (user.role === "admin" && pathname === "/admin") {
        return NextResponse.next();
      }
      if (pathname !== "/admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(`${origin}`);
      }
    }
  } else {
    return NextResponse.redirect(`${origin}/login`);
  }
}
