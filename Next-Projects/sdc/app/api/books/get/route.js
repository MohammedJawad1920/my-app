import { connectToDB } from "@/libs/connectToDB";
import Book from "@/models/Book";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

connectToDB();

export async function GET() {
  try {
    // const secret = request.nextUrl.searchParams.get("secret");
    // const tag = request.nextUrl.searchParams.get("tag");

    // console.log(secret);

    // if (secret !== process.env.SECRET_KEY) {
    //   return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    // }

    // if (!tag) {
    //   return NextResponse.json(
    //     { message: "Missing tag param" },
    //     { status: 400 }
    //   );
    // }

    revalidateTag("collection");
    const books = await Book.find({});
    return NextResponse.json({ succes: true, books }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}
