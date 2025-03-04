import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async (user: { email: string; password: string }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
    const userAuth = userCredential.user;

    const token = await userAuth.getIdToken();
    await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    console.log('token del usuario', token)
    
    return { success: true, user: userAuth };
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string };

      if (firebaseError.code === "auth/invalid-credential") {
        return { success: false, message: "Credenciales incorrectas. Verifica tus datos." };
      }
    }

    return { success: false, message: "Ocurrió un error inesperado. Inténtalo más tarde." };
  }
};
