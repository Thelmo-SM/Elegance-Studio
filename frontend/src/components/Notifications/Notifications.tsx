import { useState } from "react";
import { NotificationTypes } from "@/types/notification";
import NotificationList from "./NotificationList"; // Importar el componente de la lista
import notification from '../../../public/Icons/notificationsIcon.webp';
import Image from "next/image";

interface NotificationIconProps {
    notifications: NotificationTypes[];
  }
  
  const Notifications= ({ notifications }: NotificationIconProps) => {
    const [showList, setShowList] = useState(false);
  
    // Filtrar las notificaciones no leídas
    const unreadNotifications = notifications.filter((notif) => !notif.read);
  
    return (
      <div className="relative">
        {/* Botón con badge */}
        <button
          onClick={() => setShowList(!showList)}
          className=""
        >
          <Image src={notification} width={26} height={26} alt="notifications"/>
  
          {/* Badge con número de notificaciones no leídas */}
          {unreadNotifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-[.8rem] rounded-full w-[.9rem] h-[.9rem] flex items-center justify-center transition-all ease-in-out duration-200">
              {unreadNotifications.length}
            </span>
          )}
        </button>
  
        {/* Lista de notificaciones */}
        {showList && <NotificationList notifications={notifications} />}
      </div>
    );
  };
  
  export default Notifications;
