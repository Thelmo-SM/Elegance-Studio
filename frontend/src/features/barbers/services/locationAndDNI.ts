import { db } from "@/utils/firebase"; // Asegúrate de importar la configuración de Firebase
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
    // Ruta del documento del usuario
    const path = `users/${uid}`;
    const docRef = doc(db, path);
    
    // Actualización solo de los campos location y dni
    await updateDoc(docRef, {
      location,
      dni,
    });

    console.log("Campos location y dni actualizados correctamente.");
  } catch (error) {
    console.error("Error al actualizar location y dni:", error);
  }
};
