"use client";

import { useAuth } from "@/store/User.context";
import Image from "next/image";
import userImg from "../../../../public/Icons/user-icon.svg";
import CompleteProfile from "./CompleteProfile";

export const Account = () => {
  const { user } = useAuth();
  const isBarber = user?.role === "barber";

  return (
    <article className="pt-28 pb-6 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center sm:text-left">
        ¡Hola <span className="text-primary">{user?.name}</span>!
      </h2>

      <div className="bg-caja2 shadow-lg rounded-xl w-full mt-6 p-6 flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-start">
        <Image
          src={userImg}
          width={150}
          height={150}
          alt="Foto de perfil"
          className="bg-p-basico rounded-full p-2"
          loading="lazy"
        />
        <div className="mt-4 sm:ml-6 sm:mt-0">
          <h3 className="text-2xl font-bold">{user?.name} {user?.lastName}</h3>
          {/* <p className="text-lg">{user?.email}</p> */}
          <ul className="flex justify-center sm:justify-start gap-4 mt-4 text-gray-700 text-sm">
            {user?.role === 'barber' && <li className="px-3 py-1 bg-main rounded-lg">Clientes</li>}
            {user?.role === 'barber' && <li className="px-3 py-1 bg-main rounded-lg">Citas realizadas</li>}
            {user?.role === 'barber' && <li className="px-3 py-1 bg-main rounded-lg">Citas pendientes</li>}
          </ul>
        </div>
      </div>

      {isBarber && (user?.location === "Ninguna" || user?.dni === "Ninguno") && (
        <div className="mt-6">
          <CompleteProfile />
        </div>
      )}

      <div className="mt-6 bg-caja2 shadow-lg rounded-xl p-6">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Teléfono:</span> {user?.phone || "No registrado"}
        </p>
        <p className="text-lg text-gray-700">
        <span className="font-semibold">Correo electrónico: </span>{user?.email}
       </p>

       {user?.role === 'admin' || user?.role === 'barber' && <p className="text-lg text-gray-700">
          <span className="font-semibold">DNI:</span> {user?.dni || "No registrado"}
        </p>}
        {user?.role === 'barber' && <p className="text-lg font-semibold">Actualmente eres Barbero</p>}
        {user?.role === 'barber' && <p className="text-lg">Trabajas con nosotros desde el: 04/06/2025</p>}
        <p className="text-lg text-main">Te uniste el 20/02/2025</p>
      </div>
    </article>
  );
};

export default Account;
