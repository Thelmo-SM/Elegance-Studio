'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/store/User.context"; // Hook para obtener usuario autenticado
import { listenClientNotifications } from "../services/listen.notificarion";
import { NotificationTypes } from "@/types/notification";
import ClientNotifications from "./ClientNotifications";

const NotificationsContainer = () => {
  const { user } = useAuth(); // Obtener el usuario actual
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  console.log('Notificaciones en NotificationsContainer:', notifications);

  useEffect(() => {
    if (!user) return;

    // Escuchar las notificaciones del cliente
    const unsubscribe = listenClientNotifications(user.uid, setNotifications);
    console.log('notificacion container', user)

    return () => unsubscribe(); // Limpiar la suscripción cuando el componente se desmonte
  }, [user]);

  return (
    <div>
      <ClientNotifications notifications={notifications} />
    </div>
  );
};

export default NotificationsContainer;
