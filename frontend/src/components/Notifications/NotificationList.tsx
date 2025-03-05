'use client';

import { NotificationTypes } from "@/types/notification"; 
import { markNotificationAsRead } from "@/features/apointments/services/confirmationNotification"; 
import Link from "next/link";

interface NotificationListProps {
  notifications: NotificationTypes[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  const handleNotificationClick = async (notifId: string) => {
    await markNotificationAsRead(notifId);
  };

  return (
    <div className="absolute top-10 right-0 bg-main rounded shadow-lg w-72 p-4 z-10">
      <h3 className="font-semibold text-lg mb-2">{notifications.length === 0 ? 'No hay notificaciones' : 'Notificaciones'}</h3>
      <ul className="space-y-2">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            onClick={() => handleNotificationClick(notif.id)}
            className={`flex items-center p-2 border-b last:border-b-0 cursor-pointer ${notif.read ? "bg-btR shadow-sombra" : "bg-p-basico hover:bg-caja3"}`}
          >
            <span className={`text-sm ${notif.read ? "text-gray-700 bg-btR" : "text-black"}`}>
              {notif.message}
              <Link href='/appointments' className="ml-[1rem] border-b text-buscador border-buscador">Ver citas</Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;