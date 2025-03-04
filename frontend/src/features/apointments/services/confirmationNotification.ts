import { db } from "@/utils/firebase";
import { collection, addDoc, Timestamp, query, where, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { appointmentsTypes } from "@/types/appointmentsTypes";
import { NotificationTypes } from '@/types/notification';

export const sendConfirmationNotification = async (
  userId: string,
  barberId: string,
  appointmentData: appointmentsTypes
) => {
  try {
    const notificationRef = collection(db, "notifications");
    await addDoc(notificationRef, {
      barberId,
      clientId: userId,
      appointmentId: appointmentData.id || 'id3452354235',
      message: `Cita confirmada para ${appointmentData.date} a las ${appointmentData.hour}`,
      timestamp: Timestamp.now(),
      read: false, // Para marcar si el barbero ya la vio
    });

    console.log(`✅ Notificación almacenada en Firestore para ${barberId}`);
  } catch (error) {
    console.error("❌ Error al enviar la notificación:", error);
  }
};

export const listenNotifications = (barberId: string, callback: (notifications: NotificationTypes[]) => void) => {
  const notificationsRef = collection(db, "notifications");
  const q = query(
    notificationsRef,
    where("barberId", "==", barberId),
    orderBy("timestamp", "desc") // Ordenar por fecha de la más reciente a la más antigua
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notifications: NotificationTypes[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      const appointmentId = data.appointmentId || "defaultAppointmentId"; 
      return {
        id: doc.id || 'id3452354235',
        barberId: data.barberId,
        clientId: data.clientId,
        appointmentId: appointmentId,
        message: data.message,
        timestamp: data.timestamp.toDate().toISOString(), // Convertimos a string
        read: data.read,
      };
    });

    callback(notifications);
  });

  return unsubscribe; // Permite cancelar la suscripción cuando no sea necesaria
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, {
      read: true,
    });

    console.log(`✅ Notificación ${notificationId} marcada como leída.`);
  } catch (error) {
    console.error("❌ Error al marcar la notificación como leída:", error);
  }
};