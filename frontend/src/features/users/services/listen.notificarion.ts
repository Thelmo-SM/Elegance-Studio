import { db } from "@/utils/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { NotificationTypes } from "@/types/notification";

export const listenClientNotifications = (clientId: string, callback: (notifications: NotificationTypes[]) => void) => {
  const notificationsRef = collection(db, "notifications");
  const q = query(
    notificationsRef,
    where("clientId", "==", clientId), // Solo notificaciones para el cliente actual
    orderBy("timestamp", "desc") // Ordenar por fecha, de la más reciente a la más antigua
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notifications: NotificationTypes[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      console.log('cliente' , data)
      return {
        id: doc.id,
        barberId: data.barberId,
        clientId: data.clientId,
        appointmentId: data.appointmentId,
        message: data.message,
        timestamp: data.timestamp.toDate().toISOString(),
        read: data.read,
      };
    });

    callback(notifications);
  });
  return unsubscribe;
};
