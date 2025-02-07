import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { userData } from "@/types/userTypes";

export const getUsers = async (): Promise<userData[]> => {
    try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);

        const users: userData[] = snapshot.docs.map(doc => {
            const data = doc.data(); // 👀 Aquí `data` es `any`
            
            return {
                uid: doc.id, // 🔹 Cambia `id` por `uid` para coincidir con `userData`
                name: data.name || "", 
                lastName: data.lastName || "", 
                email: data.email || "",
                phone: data.phone || "",
                createdAt: data.createdAt, // Si `createdAt` es un `Timestamp`, deberíamos manejarlo
                role: data.role || "client", // Valor por defecto en caso de que no esté en la BD
            };
        });

        return users;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return [];
    }
};
