import { db } from '@/utils/firebase';
import { doc, updateDoc } from "firebase/firestore";

/**
 * Cancela una cita en Firebase actualizando su estado a "Cancelada".
 * @param appointmentId - ID de la cita a cancelar.
 */
export const cancelAppointment = async (appointmentId: string) => {
  try {
    if (!appointmentId) throw new Error("ID de cita inválido");

    const appointmentRef = doc(db, "appointments", appointmentId);

    await updateDoc(appointmentRef, { status: "Cancelada" });

    console.log(`Cita ${appointmentId} cancelada correctamente.`);
    return { success: true };
  } catch (error) {
    console.error("Error al cancelar la cita:", error);
    return { success: false, error };
  }
};
