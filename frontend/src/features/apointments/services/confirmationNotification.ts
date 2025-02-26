import { appointmentsTypes } from "@/types/appointmentsTypes";


// Notificación (esto podría ser un mensaje de correo electrónico, una notificación push, etc.)
export const sendConfirmationNotification = async (userId: string, barberId: string, appointmentData: appointmentsTypes) => {
    try {
      // Aquí va el código para enviar una notificación (puede ser un correo, mensaje dentro de la app, etc.)
      console.log(`Notificación enviada a ${userId} y ${barberId}: Cita confirmada para ${appointmentData.date} a las ${appointmentData.hour}`);
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
    }
  };
  