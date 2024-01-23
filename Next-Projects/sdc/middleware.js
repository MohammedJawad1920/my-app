import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const libraryToken = request.cookies.get("libraryToken");
    const festToken = request.cookies.get("festToken");

    const isSdcDashBoard = request.url.startsWith(
      `${process.env.BASE_URL}/sdc-dashboard`
    );

    const isMeeladFest = request.url.startsWith(
      `${process.env.BASE_URL}/meelad-fest`
    );

    if ((!libraryToken && isSdcDashBoard) || (!festToken && isMeeladFest)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    let token;
    if (isSdcDashBoard) {
      token = libraryToken?.value;
    } else {
      token = festToken?.value;
    }

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
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
      (payload.accessLocation === "Library" && !isSdcDashBoard) ||
      (payload.accessLocation === "Meelad Fest" && !isMeeladFest)
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      (request.url.startsWith(
        `${process.env.BASE_URL}/sdc-dashboard/user-management`
      ) &&
        !administrator) ||
      (subscriber &&
        (request.url.startsWith(
          `${process.env.BASE_URL}/sdc-dashboard/books`
        ) ||
          request.url.startsWith(
            `${process.env.BASE_URL}/sdc-dashboard/rental`
          ) ||
          request.url.startsWith(
            `${process.env.BASE_URL}/sdc-dashboard/students`
          )))
    ) {
      return NextResponse.redirect(new URL("/404", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);

    if (error instanceof jwt.errors.JWTError) {
      // Handle JWT errors, such as invalid or expired tokens
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      // Handle other errors, such as network issues or missing env variables
      return NextResponse.redirect(new URL("/500", request.url), {
        status: 500,
      });
    }
  }
}

export const config = {
  matcher: [
    "/sdc-dashboard/:path*",
    "/meelad-fest/:path*",
    "/sdc-dashboard/books/book-details:path*",
  ],
};
