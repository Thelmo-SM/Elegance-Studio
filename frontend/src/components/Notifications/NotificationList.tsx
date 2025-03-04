import { NotificationTypes } from "@/types/notification"; 
import { markNotificationAsRead } from "@/features/apointments/services/confirmationNotification"; 

interface NotificationListProps {
  notifications: NotificationTypes[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  const handleNotificationClick = async (notifId: string) => {
    // Marcar la notificación como leída en la base de datos
    await markNotificationAsRead(notifId);

    // Opcional: Puedes actualizar el estado local si estás utilizando useState
    // Para mejorar la UX, puedes actualizar el estado para que la notificación cambie a "leída" instantáneamente en la interfaz.
  };

  return (
    <div className="absolute top-10 right-0 bg-main rounded shadow-lg w-72 p-4 z-10">
      <h3 className="font-semibold text-lg mb-2">{notifications.length === 0 ? 'No hay notificaciones' : 'Notificaciones'}</h3>
      <ul className="space-y-2">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            onClick={() => handleNotificationClick(notif.id)}
            className={`flex items-center p-2 border-b last:border-b-0 cursor-pointer ${notif.read ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`}
          >
            <span className={`text-sm ${notif.read ? "text-gray-500" : "text-black"}`}>
              {notif.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
