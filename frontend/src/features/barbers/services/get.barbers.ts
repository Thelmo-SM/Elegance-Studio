import { db } from '@/utils/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getBarbers() {
    const barbersRef = collection(db, "users");
    const q = query(barbersRef, where("role", "==", "barber"));
  
    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
  
        return {
          id: doc.id,
          name: data.name ?? "Desconocido",
          location: data.location ?? "Sin ubicación",
        };
      });
    } catch (error) {
      console.error("Error obteniendo barberos:", error);
      return [];
    }
  }
  