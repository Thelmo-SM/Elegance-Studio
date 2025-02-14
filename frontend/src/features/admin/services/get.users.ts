import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { userData } from "@/types/userTypes";

export const getUsers = async (): Promise<userData[]> => {
    try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);

        const users: userData[] = snapshot.docs.map(doc => {
            const data = doc.data();
            
            return {
                uid: doc.id,
                name: data.name || "", 
                lastName: data.lastName || "", 
                email: data.email || "",
                phone: data.phone || "",
                createdAt: data.createdAt,
                role: data.role || "client",
                dni: data.dni || "",
                location: data.location || ''
            };
        });

        return users;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return [];
    }
};
