import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No se proporcionó un token" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    console.log('ESTAS SON LAS COOKIES: ', cookieStore);

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error al guardar el token" },
      { status: 500 }
    );
  }
}
