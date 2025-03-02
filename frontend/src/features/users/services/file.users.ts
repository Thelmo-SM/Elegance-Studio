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
}) {
  if (!uid || !file) throw new Error("Usuario o archivo no válido");

  const storage = getStorage();
  const storageRef = ref(storage, `profilePictures/${uid}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Seguimiento del progreso de la subida
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress); // Actualizamos el progreso
    },
    (error) => {
      console.error("Error al subir la imagen:", error);
      throw new Error("Hubo un problema al subir la foto. Intenta de nuevo.");
    },
    async () => {
      // Obtiene la URL de descarga
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, { photoURL: downloadURL });
      return downloadURL;
    }
  );
}
