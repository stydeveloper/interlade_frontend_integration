// middleware.js

import { NextResponse } from "next/server";
// termsAcknowledged
export default function middleware(req) {
  let loggedin;
  if (req.cookies.get("isAuthenticated")?.value === "true") {
    loggedin = true;
  } else {
    loggedin = false;
  }
  const protectedRoutes = [
    "/activebols",
    "/bol",
    "/carriers",
    "/completedbols",
    "/createbol",
    "/drivers",
    "/shippers",
    "/driverLogs",
  ];
  // http://localhost:3000/login
  const { pathname } = req.nextUrl;
  // https://interlade.netlify.app hosted url

  if (loggedin && pathname === "/login") {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
    );
  }
  if (loggedin && pathname === "/signup") {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app=", req.url)
    );
  }
  if (loggedin && pathname === "/forgot-password") {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
    );
  }
  if (loggedin && pathname.startsWith("/reset-password")) {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
    );
  }
  // Check if the pathname starts with any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!loggedin && isProtectedRoute) {
    console.log(req.url);
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app/login", req.url)
    );
  }
  if (!loggedin && pathname === "/") {
    console.log(req.url);
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app/login", req.url)
    );
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/activebols",
    "/bol/:path*",
    "/carriers/:path*",
    "/completedbols",
    "/createbol",
    "/drivers/:path*",
    "/shippers/:path*",
    "/forgot-password",
    "/reset-password",
  ],
};
