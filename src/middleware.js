// middleware.js

import { NextResponse } from "next/server";

// termsAcknowledged
export default function middleware(req, res) {
  let response = NextResponse.next();
  let loggedin;
  let role_id;
  let status;

  console.log("012", req.cookies.get("isAuthenticated"));
  if (req.cookies.get("isAuthenticated")?.value === "true") {
    loggedin = true;
    role_id = req.cookies.get("role_id")?.value;
    status = req.cookies.get("status")?.value;
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
  console.log(pathname);

  // If logged in and pathname is home, and status is 'Pending', delete cookies and redirect to signup

  if (loggedin && status === "Pending") {
    console.log("chal rha ye wala", status);
    response.cookies.set("isAuthenticated", "false", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
    });
  }

  // hello

  if (loggedin && pathname === "/login") {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
    );
  }
  if (loggedin && pathname === "/signup") {
    if (loggedin && status === "Pending") {
      response.cookies.set("isAuthenticated", "false", {
        path: "/",
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
      });
    }
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
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
  if (
    loggedin &&
    role_id.toString() !== "2" &&
    pathname.startsWith("/carriers")
  ) {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
    );
  }
  if (
    loggedin &&
    role_id.toString() !== "2" &&
    pathname.startsWith("/createbol")
  ) {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
    );
  }
  if (
    loggedin &&
    role_id.toString() !== "1" &&
    pathname.startsWith("/shippers")
  ) {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
    );
  }
  if (
    loggedin &&
    role_id.toString() !== "1" &&
    pathname.startsWith("/drivers")
  ) {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
    );
  }
  if (loggedin && pathname.startsWith("/public-url")) {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
    );
  }

  // Check if the pathname starts with any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (loggedin && status === "Blocked" && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("https://interlade.netlify.app", req.url)
    );
  }

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
  console.log(status);
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
    "/public-url",
  ],
};
