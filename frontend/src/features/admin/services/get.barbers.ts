import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { userData } from "@/types/userTypes";
//import { userData } from "@/types/userTypes";

export const getBarber = async () => {
    try {
      // Crear una referencia a la colección de usuarios
      const usersRef = collection(db, "users");
  
      // Crear una consulta para filtrar los usuarios con rol 'barber'
      const q = query(usersRef, where("role", "==", "barber"));
  
      // Obtener los documentos que coincidan con la consulta
      const querySnapshot = await getDocs(q);
  
      // Mapear los resultados para obtener los datos de los usuarios
      const usuariosBarber: userData[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
  
        // Asegúrate de que todos los campos necesarios están presentes
        return {
          uid: doc.id,
          name: data.name || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          createdAt: data.createdAt || new Date(),
          role: data.role || '',
          location: data.location || '',
          dni: data.dni || '',
        };
      });
  
      return usuariosBarber;  // Devuelve los usuarios con rol "barber"
    } catch (error) {
      console.error("Error obteniendo usuarios con rol barber:", error);
      throw new Error("Error al obtener los usuarios con rol barber");
    }
  };