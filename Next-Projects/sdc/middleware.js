import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const libraryToken = request.cookies.get("libraryToken");
  const festToken = request.cookies.get("festToken");

  const isSdcDashBoard = request.url.endsWith(`/sdc-dashboard`);

  const isMeeladFest = request.url.endsWith(`/meelad-fest`);

  if ((!libraryToken && isSdcDashBoard) || (!festToken && isMeeladFest)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (festToken && isMeeladFest) {
    return NextResponse.redirect(new URL("/meelad-fest", request.url));
  }

  if (libraryToken && isSdcDashBoard) {
    return NextResponse.redirect(new URL("/sdc-dashboard", request.url));
  }

  const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const tokenToVerify = isSdcDashBoard ? libraryToken?.value : festToken?.value;

  try {
    const { payload } = await jwtVerify(tokenToVerify, key, {
      algorithms: ["HS256"],
    });

    const { role, accessLocation } = payload;

    if (
      (accessLocation === "Library" && !isSdcDashBoard) ||
      (accessLocation === "Meelad Fest" && !isMeeladFest)
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      (role !== "Administrator" &&
        request.url.startsWith(
          `${process.env.BASE_URL}/sdc-dashboard/user-management`
        )) ||
      ((request.url.startsWith(`${process.env.BASE_URL}/sdc-dashboard/books`) ||
        request.url.startsWith(
          `${process.env.BASE_URL}/sdc-dashboard/rental`
        ) ||
        request.url.startsWith(
          `${process.env.BASE_URL}/sdc-dashboard/students`
        )) &&
        role === "Subscriber")
    ) {
      return NextResponse.redirect(new URL("/404", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/sdc-dashboard/:path*", "/meelad-fest/:path*"],
};
