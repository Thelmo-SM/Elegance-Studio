import { userData } from "@/types/userTypes"


export const BarberCard = (
    { 
    uid,
    name,
    lastName,
    email,
    phone,
    role,
    location,
    dni
    }: userData
) => {


    return(
<article className="bg-buscador p-6 rounded-lg w-[30%] mx-auto space-y-4 m-12 shadow-sombra">
      <div className="text-center font-semibold text-xl text-btR">Detalles del Barbero</div>
        <p className="text-caja mt-11"><strong>Identificador:</strong> {uid}</p>
      <div className="space-y-2">
        <p className="flex justify-between border-b border-caja3">
          <span className="text-p-basico font-medium">Nombre</span>
          <span className="text-btR m-[.5rem]">{name}</span>
        </p>
        <p className="flex justify-between border-b border-caja3">
          <span className="text-p-basico font-medium">Apellido</span>
          <span className="text-btR m-[.5rem]">{lastName}</span>
        </p>
        <p className="flex justify-between border-b border-caja3">
          <span className="text-p-basico font-medium">Correo electrónico</span>
          <span className="text-btR m-[.5rem]">{email}</span>
        </p>
        <p className="flex justify-between border-b border-caja3">
          <span className="text-p-basico font-medium">Teléfono</span>
          <span className="text-btR m-[.5rem]">{phone}</span>
        </p>
        <p className="flex justify-between border-b border-caja3">
          <span className="text-p-basico font-medium">Sucursal</span>
          <span className="text-btR m-[.5rem]">{location}</span>
        </p>
        <p className="flex justify-between border-b border-caja3">
          <span className="text-p-basico font-medium">DNI</span>
          <span className="text-btR m-[.5rem]">{dni}</span>
        </p>
        <p className="flex justify-between border-b border-caja3">
          <span className="text-p-basico font-medium">Ocupación</span>
          <span className="text-btR m-[.5rem]">{role}</span>
        </p>
      </div>
    </article>
    );
};

export default BarberCard;