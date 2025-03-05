import { db } from '@/utils/firebase';
import { doc, updateDoc } from "firebase/firestore";
import { approveAppointmentServices } from '@/features/barbers/services/approve.appointmens';

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


//Aprobar cita
export const approveAppointment = async (
  appointmentId: string,
  clientId: string,
  barberId: string
) => {
  try {
    if (!appointmentId) throw new Error("ID de cita inválido");

    const appointmentRef = doc(db, "appointments", appointmentId);

    // 1️⃣ Actualizar la cita como "aprobada"
    await updateDoc(appointmentRef, { status: "Aprobada" });

    // 2️⃣ Luego enviar la notificación al cliente
    await approveAppointmentServices(appointmentId, clientId, barberId);

    console.log(`✅ Cita ${appointmentId} aprobada correctamente y notificación enviada.`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error al aprobar la cita y enviar la notificación:", error);
    return { success: false, error };
  }
};
