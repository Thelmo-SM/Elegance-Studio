import { db } from "@/utils/firebase";
import { collection, addDoc, Timestamp} from "firebase/firestore";
import { appointmentsTypes } from "@/types/appointmentsTypes";



export const createAppointment = async (appointmentData: appointmentsTypes) => {
  try {
    // Agregar la cita a Firestore
    const docRef = await addDoc(collection(db, "appointments"), {
      ...appointmentData,
      status: 'pendiente',
      hidden: false,
      createdAt: Timestamp.now(),
    });

    console.log("Cita creada con ID:", docRef.id);

    // Retornar la cita con el id generado
    return {
      id: docRef.id,
      ...appointmentData,
      status: 'pendiente',
      createdAt: new Date().toLocaleDateString(), // Fecha actual
    };
  } catch (error) {
    console.error("Error al crear la cita:", error);
    throw new Error("No se pudo crear la cita");
  }
};
