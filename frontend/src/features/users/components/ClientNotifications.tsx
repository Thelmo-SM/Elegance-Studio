'use client';

import {  useState } from "react";
import Image from "next/image";
import { NotificationTypes } from "@/types/notification";
import notification from '../../../../public/Icons/notificationsIcon.webp';
import Link from "next/link";

interface ClientNotificationsProps {
  notifications: NotificationTypes[];  // Recibiendo la propiedad notifications
}

const ClientNotifications = ({ notifications }: ClientNotificationsProps) => {
  const [showList, setShowList] = useState(false);

  const unreadNotifications = notifications.filter((notif) => !notif.read);

  return (
    <div className="relative">
      {/* Botón con el número de notificaciones */}
      <button onClick={() => setShowList(!showList)} className=" text-white rounded-lg">
        <Image src={notification} width={26} height={26} alt="notifications"/>
        {unreadNotifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-[.8rem] rounded-full w-[.9rem] h-[.9rem] flex items-center justify-center transition-all ease-in-out duration-200">
            {unreadNotifications.length}
          </span>
        )}
      </button>

      {/* Lista de notificaciones */}
      {showList && (
        <div className="absolute top-10 right-0 bg-main rounded shadow-lg w-72 p-4 z-10">
          <h3 className="font-semibold text-lg mb-2">{notifications.length === 0 ? 'No hay notificaciones' : 'Notificaciones'}</h3>
          <ul className="space-y-2">
            {notifications.map((notif) => (
              <li
                key={notif.id}
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
      )}
    </div>
  );
};

export default ClientNotifications;
