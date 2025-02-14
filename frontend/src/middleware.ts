import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard", "/profile", "/appointments"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Middleware ejecutado en:", req.url);

  // Si la ruta no está protegida, continuar sin hacer nada
  if (!protectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Si no hay token, redirigir a login
  if (!token) {
    console.log("❌ No hay token, redirigiendo a login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verificamos el token con la API
    const response = await fetch(new URL("/api/auth/verify-token", req.nextUrl.origin), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    console.log("Código de respuesta de la API:", response.status);

    if (!response.ok) {
      throw new Error(`Error en la verificación del token: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Datos de verificación del token:", data);

    const { role, dni, location } = data;

    const isClient = data.role === 'client';
    const isDashboard = pathname.startsWith("/dashboard");;
    if(isClient && isDashboard) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // **Si el usuario es barbero y le faltan datos, redirigir a profile**
    if (role === "barber" && (!dni || dni.trim() === "" || !location || location.trim() === "")) {
      console.log("🔄 Redirigiendo a /profile por datos incompletos");
      if (pathname !== "/profile") {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("⛔ Error al verificar el token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/appointments/:path*"], // Rutas a proteger
};
