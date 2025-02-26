import { db } from "@/utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { appointmentsTypes, CreateAppointmentResponse } from "@/types/appointmentsTypes";
import { checkIfHourIsOccupied } from "./busy.appointments";
import { sendConfirmationNotification } from "./confirmationNotification";
//     , query, where, getDocs


export const createAppointment = async (appointmentData: appointmentsTypes): Promise<CreateAppointmentResponse> => {
  try {

    const isOccupied = await checkIfHourIsOccupied(appointmentData.barber, appointmentData.hour, appointmentData.date);
    if(isOccupied) {
      return { success: false, message: "La hora seleccionada ya está ocupada. Por favor, elige otra." };
    }

    // Verificar si ya existe una cita con los mismos detalles
    // const q = query(
    //   collection(db, "appointments"),
    //   where("barber", "==", appointmentData.barber),
    //   where("date", "==", appointmentData.date),
    //   where("hour", "==", appointmentData.hour)
    // );
    // const querySnapshot = await getDocs(q);

    // if (!querySnapshot.empty) {
    //   console.log("Ya existe una cita con estos detalles.");
    //   return {
    //     message: "Ya existe una cita con estos detalles.",
    //     existingAppointment: querySnapshot.docs[0].data(), // Información de la cita existente
    //   };
    // }

    // Agregar la cita si no existe una con los mismos detalles
    const docRef = await addDoc(collection(db, "appointments"), {
      ...appointmentData,
      status: 'pendiente',
      hidden: false,
      createdAt: Timestamp.now(),
    });

    console.log("Cita creada con ID:", docRef.id);

    await sendConfirmationNotification(appointmentData.userId || '', appointmentData.barber, appointmentData);
    // Retornar la cita con el id generado
    return {
      success: true,
      id: docRef.id,
      ...appointmentData,
      status: 'pendiente',
      createdAt: new Date().toLocaleDateString(), // Fecha actual
    };
  } catch (error) {
    console.error("Error al crear la cita:", error);
    return { success: false, message: "No se pudo crear la cita. Inténtalo nuevamente." };
  }
};
