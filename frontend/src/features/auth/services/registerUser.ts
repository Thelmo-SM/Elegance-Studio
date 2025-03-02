import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';



export const registerUser = async (user: { email: string; password: string }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    return { success: true, user: userCredential.user }; // ✅ Siempre retorna 'user'
  } catch (error: unknown) {
    let message = "Ocurrió un error inesperado. Inténtalo más tarde.";
    
    if (error instanceof Error && "code" in error) {
      const registerError = error as { code: string };

      if (registerError.code === "auth/email-already-in-use") {
        message = "El correo ya está registrado. Intenta con otro.";
      }
    }

    return { success: false, message }; // ✅ No retorna 'user' aquí
  }
};

  export const updateUser = (user: {displayName?: string | null | undefined; photoURL?: string | null | undefined;}) => {
    if(auth.currentUser) return updateProfile(auth.currentUser, user);
  }
  