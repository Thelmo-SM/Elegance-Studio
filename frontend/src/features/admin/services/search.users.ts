import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '@/utils/firebase'

export const searchUsers = async (searchTerm: string) => {
  if (!searchTerm) return [];

  try {
    const usersRef = collection(db, "users");
    
    // Realiza la consulta buscando en nombre o correo
    const q = query(
      usersRef,
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return users;
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    return [];
  }
};
