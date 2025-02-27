import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard", "/profile", "/appointments"];
const authRoutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Middleware ejecutado en:", req.url);

  // Obtener el token de las cookies solo una vez
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Si la ruta es de login o registro y el usuario está autenticado, redirigir a la página principal
  if (authRoutes.includes(pathname) && token) {
    console.log("❌ Usuario ya autenticado, redirigiendo a la página principal");
    return NextResponse.redirect(new URL("/", req.url)); // Redirigir a la página principal si está autenticado
  }

  // Si la ruta está protegida (dashboard, perfil, citas), asegurarnos de que el usuario esté autenticado
  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      console.log("❌ No hay token, redirigiendo a login");
      return NextResponse.redirect(new URL("/login", req.url)); // Redirigir a login si no hay token
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

      // Si el usuario es cliente y está intentando acceder al dashboard, redirigir a la página principal
      const isClient = role === 'client';
      const isDashboard = pathname.startsWith("/dashboard");
      if (isClient && isDashboard) {
        return NextResponse.redirect(new URL("/", req.url)); // Redirigir a la página principal si es cliente
      }

      const isBarber = role === 'barber';
      const isAppointments = pathname.startsWith("/appointments");
      if (isBarber && isAppointments) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // Si el usuario es barbero y le faltan datos, redirigir a perfil
      if (role === "barber" && (!dni || dni.trim() === "" || !location || location.trim() === "")) {
        console.log("🔄 Redirigiendo a /profile por datos incompletos");
        return NextResponse.redirect(new URL("/profile", req.url)); // Redirigir a perfil si le faltan datos
      }

      return NextResponse.next(); // Si todo está bien, continuar con la solicitud

    } catch (error) {
      console.error("⛔ Error al verificar el token:", error);
      return NextResponse.redirect(new URL("/login", req.url)); // Si hay un error al verificar el token, redirigir a login
    }
  }

  return NextResponse.next(); // Continuar con la solicitud si no es ninguna de las rutas protegidas o de login/registro
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/appointments/:path*", "/login", "/register"], // Rutas a proteger
};
