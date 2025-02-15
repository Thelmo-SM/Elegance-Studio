"use client";

import { useAuth } from "@/store/User.context";
import Image from "next/image";
import userImg from "../../../../public/Icons/user-icon.svg";
import CompleteProfile from "./CompleteProfile";

export const Account = () => {
  const { user } = useAuth();
  const isBarber = user?.role === "barber";

  return (
    <article>
      <h2 className="pt-[7rem] pb-[1rem] ml-[15%] text-[2rem]">
        ¡Hola <span>{user?.name}</span>!
      </h2>

      <div className="shadow-sombra w-[70%] m-auto flex flex-col items-center p-[3rem]">
        <Image
          src={userImg}
          width={220}
          height={220}
          alt="Foto de perfil"
          className="bg-p-basico"
        />
        <h3 className="mt-[1rem] text-[2rem] font-bold">
          {user?.name} {user?.lastName}
        </h3>
        <p className="mb-3 mt-1 text-[1.4rem] text-caja3">{user?.email}</p>

        <ul className="flex">
          <li className="mx-[2rem] text-[1.2rem]">Clientes</li>
          <li className="mx-[2rem] text-[1.2rem]">Citas realizadas</li>
          <li className="mx-[2rem] text-[1.2rem]">Citas pendientes</li>
        </ul>

        {/* Mostrar el formulario si el barbero no tiene DNI o Location */}
        {isBarber && (user?.location === "Ninguna" || user?.dni === "Ninguno") && <CompleteProfile />}

        <p className="my-4 text-[1.2rem]">
          Teléfono: <span>{user?.phone || "No registrado"}</span>
        </p>
        <p className="my-4 text-[1.2rem]">
          DNI: <span>{user?.dni || "No registrado"}</span>
        </p>
        <p className="my-4 text-[1.2rem]">Actualmente eres Barbero</p>
        <p className="my-4 text-[1.2rem]">
          Trabajas con nosotros desde el: 04/06/2025
        </p>
        <p className="my-4 text-[1.2rem] text-caja3">
          Te uniste el 20/02/2025
        </p>
      </div>
    </article>
  );
};

export default Account;
