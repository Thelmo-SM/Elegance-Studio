import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Función para subir la foto de perfil
export async function uploadProfilePicture({
  uid,
  file,
  setProgress,
}: {
  uid: string;
  file: File;
  setProgress: (progress: number) => void;
}): Promise<string> { // Especificamos que esta función devuelve una URL de tipo string
  if (!uid || !file) throw new Error("Usuario o archivo no válido");

  const storage = getStorage();
  const storageRef = ref(storage, `profilePictures/${uid}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    // Seguimiento del progreso de la subida
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress); // Actualizamos el progreso
      },
      (error) => {
        console.error("Error al subir la imagen:", error);
        reject("Hubo un problema al subir la foto. Intenta de nuevo.");
      },
      async () => {
        try {
          // Correct usage of getDownloadURL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // No necesita los paréntesis
          const userDocRef = doc(db, "users", uid);
          await updateDoc(userDocRef, { photoURL: downloadURL });
          resolve(downloadURL); // Retornamos la URL
        } catch (error: unknown) {
          reject("Error al obtener la URL de la foto");
          console.log(error)
        }
      }
    );
  });
}
