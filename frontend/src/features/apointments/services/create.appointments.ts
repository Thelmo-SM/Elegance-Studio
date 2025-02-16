import { db } from "@/utils/firebase";
import { collection, addDoc, Timestamp} from "firebase/firestore";
import { appointmentsTypes } from "@/types/appointmentsTypes";

export const createAppointment = async (appointmentData: appointmentsTypes) => {
  try {
    const docRef = await addDoc(collection(db, "appointments"), {
      ...appointmentData,
      status: 'pendiente',
      createdAt: Timestamp.now(),
    });

    console.log("Servicio y los datos: ", docRef);


    const cachedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    cachedAppointments.push({
      id: docRef.id,
      ...appointmentData,
      status: 'pendiente',
      createdAt: Timestamp.now(),
    });

    localStorage.setItem("appointments", JSON.stringify(cachedAppointments));

    return cachedAppointments;
  } catch (error) {
    console.error("Error al crear la cita:", error);
    throw new Error("No se pudo crear la cita");
  }
};
