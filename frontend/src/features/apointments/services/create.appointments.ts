import { db } from "@/utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { appointmentsTypes } from "@/types/appointmentsTypes";

export const createAppointment = async (appointmentData: appointmentsTypes) => {
    try {
      const docRef = await addDoc(collection(db, "appointments"), {
        ...appointmentData,
        createdAt: Timestamp.now()
      });
      console.log('Servicios y los datos: ', docRef);
      return docRef.id;
    } catch (error) {
      console.error("Error al crear la cita:", error);
      throw new Error("No se pudo crear la cita");
    }
  };