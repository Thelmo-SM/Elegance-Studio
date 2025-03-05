import { db } from "@/utils/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const approveAppointmentServices = async (
  appointmentId: string,
  clientId: string,
  barberId: string
) => {
  try {
    // 2️⃣ Enviar notificación al cliente
    const notificationRef = collection(db, "notifications");
    await addDoc(notificationRef, {
      clientId, // Notificar al cliente
      barberId,
      appointmentId,
      message: "Tu cita ha sido aprobada por el barbero.",
      timestamp: Timestamp.now(),
      read: false, // Para saber si el cliente la vio o no
    });

    console.log(`✅ Notificación enviada al cliente por la cita ${appointmentId}.`);
  } catch (error) {
    console.error("❌ Error al enviar la notificación:", error);
  }
};