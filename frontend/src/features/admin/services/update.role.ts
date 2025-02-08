import { db } from '@/utils/firebase';
import { doc, updateDoc } from "firebase/firestore";

export const updateRole = async (userId: string, newRole: string) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role: newRole });
    return true;
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    throw new Error("Error al actualizar el rol");
  }
};
