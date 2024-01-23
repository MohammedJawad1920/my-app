import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const libraryToken = request.cookies.get("libraryToken");
  const festToken = request.cookies.get("festToken");

  const books = request.url.startsWith(
    `${process.env.BASE_URL}/sdc-dashboard/books`
  );
  const rental = request.url.startsWith(
    `${process.env.BASE_URL}/sdc-dashboard/rental`
  );
  const students = request.url.startsWith(
    `${process.env.BASE_URL}/sdc-dashboard/students`
  );
  const userManagement = request.url.startsWith(
    `${process.env.BASE_URL}/sdc-dashboard/user-management`
  );

  const isSdcDashBoard = request.url.startsWith(
    `${process.env.BASE_URL}/sdc-dashboard`
  );

  const isMeeladFest = request.url.startsWith(
    `${process.env.BASE_URL}/meelad-fest`
  );

  if ((!libraryToken && isSdcDashBoard) || (!festToken && isMeeladFest)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  try {
    const { payload } = await jwtVerify(
      isSdcDashBoard ? libraryToken.value : festToken.value,
      key,
      { algorithms: ["HS256"] }
    );

    const administrator = payload.role === "Administrator";
    const subscriber = payload.role === "Subscriber";
    const library = payload.accessLocation === "Library";
    const meeladFest = payload.accessLocation === "Meelad Fest";
    const attendance = payload.accessLocation === "Attendance";

    if ((library && !isSdcDashBoard) || (meeladFest && !isMeeladFest)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      (userManagement && !administrator) ||
      ((books || userManagement || rental || students) && subscriber)
    ) {
      return NextResponse.redirect(new URL("/404", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/sdc-dashboard/:path*",
    "/meelad-fest/:path*",
    "/sdc-dashboard/books/book-details/:path*",
  ],
};
