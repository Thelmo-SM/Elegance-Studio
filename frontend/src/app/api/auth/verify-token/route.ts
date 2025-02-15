import { NextRequest, NextResponse } from "next/server";
import { authAdmin } from "../../../../../lib/firebase.admin";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      console.error("❌ No se proporcionó un token.");
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
      // **Decodificar el token**
      const decodedToken = await authAdmin.verifyIdToken(token);
      const { uid } = decodedToken;

      // **Buscar el usuario en Firestore**
      const db = getFirestore();
      const userDoc = await db.collection("users").doc(uid).get();

      if (!userDoc.exists) {
        console.error("⚠️ Usuario no encontrado en la base de datos.");
        return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
      }

      const userData = userDoc.data();

      return NextResponse.json({
        uid,
        role: userData?.role || "client", // Si no tiene rol, por defecto es cliente
        dni: userData?.dni || null,
        location: userData?.location || null,
      }, { status: 200 });

    } catch (error) {
      console.error("⛔ Error al verificar el token:", error);
      return NextResponse.json({ error: "Token inválido" }, { status: 403 });
    }
  } catch (error) {
    console.error("⛔ Error inesperado en la verificación del token:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud de verificación del token" },
      { status: 500 }
    );
  }
}
