"use client";

import { useAuth } from "@/store/User.context";
import Image from "next/image";
import userImg from "../../../../public/Icons/user-icon.svg";
import CompleteProfile from "./CompleteProfile";
import { uploadProfilePicture } from "@/features/users/services/file.users";
import { useState } from "react";

export const Account = () => {
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const usuario = user?.uid;
  const isBarber = user?.role === "barber";

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !usuario) return;
  
    setLoading(true); // Marca como cargando
    try {
      const newPhotoURL = await uploadProfilePicture({
        uid: usuario,
        file,
        setProgress,
      });
      setPhotoURL(newPhotoURL); // Actualiza la URL de la foto
      console.log('Foto de perfil: ', newPhotoURL);
    } catch (error) {
      console.error("Error al subir la foto", error);
    } finally {
      setLoading(false); // Marca como no cargando
    }
  };

  return (
    <article className="pt-28 pb-6 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center sm:text-left">
        ¡Hola <span className="text-primary">{user?.name}</span>!
      </h2>

      <div className="bg-caja2 shadow-lg rounded-xl w-full mt-6 p-6 flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-start">
      <div>
      <Image 
      src={photoURL || userImg} 
      alt="Foto de perfil" 
      width={128}
      height={128} 
      className="rounded-full border" 
       />
       <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="profile-upload" />
       <label htmlFor="profile-upload" className="bg-btR shadow-sombra hover:bg-caja2 text-white px-4 py-2 rounded cursor-pointer">
        {loading ? "Subiendo..." : "Cambiar foto"}
      </label>
      <div>
    {loading && (
    <div>
      <progress value={progress} max={100}></progress>
      <span>{Math.round(progress)}%</span>
    </div>
    )}
    </div>

      
      </div>
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
