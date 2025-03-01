"use client";

import { useSearchUsers } from "../hooks/search.users";
import userIcon from "../../../../public/Icons/user-icon.svg";
import Image from "next/image";

export const SearchUsers = () => {
  const { search, users, userDetail, tempRole, handleOnChange, setUserDetail, handleNewRole, setTempRole } = useSearchUsers();

  const result = search
    ? users.filter((data) => data.email.toLowerCase().includes(search.toLowerCase()))
    : []; // 🔹 Se asigna correctamente el resultado de filter()

  console.log(search);

  return (
    <article className="flex flex-col lg:flex-row justify-center">
      <div className="lg:w-[30%] lg:mr-[3rem]">
        <p className="bg-caja p-[2rem] mb-4 text-p-basico leading-6 rounded-[.3rem]">
          Aquí podrá usted contratar barberos, para ello, busque el usuario por correo y selecciónelo para cambiarle el Rol
        </p>
        <div className="relative border-2 border-p-basico rounded-[.3rem]">
          <Image
            src={userIcon}
            width={35}
            height={35}
            alt="Usuarios Ícono"
            className="absolute bg-caja2 top-[] rounded-[.3rem]"
          />
          <input
            type="search"
            value={search}
            onChange={handleOnChange}
            placeholder="Buscar usuarios"
            className="bg-buscador w-full p-[.5rem] pl-[4rem] text-p-basico rounded-[.3rem]"
          />
        </div>
        <div>
          {result.length > 0 ? (
            result.map((user) => (
              <div key={user.uid} className="my-5 bg-p-basico p-2 text-center rounded-[.3rem]">
                <button onClick={() => setUserDetail(user)}>
                  {user.name} - {user.email}
                </button>
              </div>
            ))
          ) : (
            <p className="my-5 bg-caja2 text-p-basico p-2 text-center rounded-[.3rem]">
              {search ? "No se encontraron usuarios" : "Escribe para buscar usuarios"}
            </p>
          )}
        </div>
      </div>

      {userDetail && (
        <div className="flex flex-col md:flex-row  justify-center p-[2rem] lg:w-[30%] bg-caja2">
          <div className="mr-[1.5rem] text-center p-2 md:text-left md:p-0">
            <p className="lg:text-[1.3rem] md:ml-2 lg:ml-0 mb-[.1rem] font-bold">ID:</p>
            <span className="ml-2 lg:ml-0">{userDetail.uid}</span>

            <p className="lg:text-[1.3rem] md:ml-2 lg:ml-0 mt-[1.4rem] mb-[.1rem] font-bold">Nombre:</p>
            <span className="ml-2 lg:ml-0">{userDetail.name}</span>

            <p className="lg:text-[1.3rem] md:ml-2 lg:ml-0 mt-[1.4rem] mb-[.1rem] font-bold">Apellido:</p>
            <span className="ml-2 lg:ml-0">{userDetail.lastName}</span>

            <p className="lg:text-[1.3rem] md:ml-2 lg:ml-0 mt-[1.4rem] mb-[.1rem] font-bold">Correo Eletrónico:</p>
            <span className="ml-2 lg:ml-0">{userDetail.email}</span>

            <p className="lg:mt-[1.4rem] m md:ml-2 lg:ml-0b-[.1rem] font-bold">Teléfono:</p>
            <span className="ml-2 lg:ml-0">{userDetail.phone}</span>

            <p className="lg:text-[1.3rem] md:ml-2 lg:ml-0 mt-[1.4rem] mb-[.1rem] font-bold">Rol:</p>
            <span className="ml-2 lg:ml-0 text-green-500">{userDetail.role}</span>
          </div>

          <div className="flex flex-col p-2 shadow-sombra mr-2 lg:mr-0">
            <Image
              src={userIcon}
              width={100}
              height={100}
              alt="Foto del usuario"
              className="m-auto bg-p-basico rounded-[.3rem]"
            />

            <label htmlFor="role" className="text-center md:text-left mt-2 md:mt-0 text-[1.4rem]">Cambiar Rol</label>
            <select
              name="role"
              id="role"
              onChange={(e) => setTempRole(e.target.value)}
              value={tempRole}
              className="bg-btR text-center p-[.4rem] rounded-[.3rem] my-[1rem]"
            >
              <option value="cliente">cliente</option>
              <option value="barber">barber</option>
            </select>
            <button
              onClick={() => handleNewRole(tempRole)}
              className="text-[1.3rem] lg:text-[1rem] text-p-basico mx-6 mt-[1rem] bg-btR p-1 px-4 rounded-[0.25rem] hover:bg-ct transition duration-[200ms] mb-[2rem]"
            >
              Cambiar
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default SearchUsers;
