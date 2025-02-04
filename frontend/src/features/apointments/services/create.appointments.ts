import { db } from "@/utils/firebase";
import { collection, addDoc, Timestamp} from "firebase/firestore";
import { appointmentsTypes } from "@/types/appointmentsTypes";

export const createAppointment = async (appointmentData: appointmentsTypes) => {
  try {
    const docRef = await addDoc(collection(db, "appointments"), {
      ...appointmentData,
      createdAt: Timestamp.now(),
    });

    console.log("Servicio y los datos: ", docRef);

    // Agregar la nueva cita al cache local (localStorage en este caso)
    const cachedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    cachedAppointments.push({
      id: docRef.id,
      ...appointmentData,
      createdAt: Timestamp.now(),
    });

    // Guardar las citas actualizadas en el cache local
    localStorage.setItem("appointments", JSON.stringify(cachedAppointments));

    return docRef.id;
  } catch (error) {
    console.error("Error al crear la cita:", error);
    throw new Error("No se pudo crear la cita");
  }
};
