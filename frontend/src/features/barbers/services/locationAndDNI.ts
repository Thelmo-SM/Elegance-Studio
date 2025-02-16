import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";


export const updateLocationAndDni = async (
  uid: string,
  location: string,
  dni: string
) => {
  if (!uid) {
    console.error("No se proporcionó un UID");
    return;
  }

  try {
    const path = `users/${uid}`;
    const docRef = doc(db, path);
    
    await updateDoc(docRef, {
      location,
      dni,
    });

    console.log("Campos location y dni actualizados correctamente.");
  } catch (error) {
    console.error("Error al actualizar location y dni:", error);
  }
};
