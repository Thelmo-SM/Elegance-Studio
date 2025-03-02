import { userData } from "@/types/userTypes"

type totalAppointments = {
  totalAppointments: (status: string) => number;
};

type stadisticsBarbers = userData & totalAppointments;

export const BarberCard: React.FC<stadisticsBarbers> = (
    { 
    uid,
    name,
    lastName,
    email,
    phone,
    role,
    location,
    dni,
    totalAppointments
    }: stadisticsBarbers
) => {


    return(
<article className="bg-buscador p-6 rounded-lg w-full sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-[400px] mx-auto space-y-4 my-6 shadow-sombra">
            <div className="text-center font-semibold text-lg sm:text-xl text-btR">Detalles del Barbero</div>
            <p className="text-caja mt-6"><strong>Identificador:</strong> {uid}</p>

            <div className="space-y-2">
                <p className="flex flex-col sm:flex-row justify-between border-b border-caja3">
                    <span className="text-p-basico font-medium">Nombre</span>
                    <span className="text-btR sm:m-[.5rem]">{name}</span>
                </p>
                <p className="flex flex-col sm:flex-row justify-between border-b border-caja3">
                    <span className="text-p-basico font-medium">Apellido</span>
                    <span className="text-btR sm:m-[.5rem]">{lastName}</span>
                </p>
                <p className="flex flex-col sm:flex-row justify-between border-b border-caja3">
                    <span className="text-p-basico font-medium">Correo electrónico</span>
                    <span className="text-btR sm:m-[.5rem]">{email}</span>
                </p>
                <p className="flex flex-col sm:flex-row justify-between border-b border-caja3">
                    <span className="text-p-basico font-medium">Teléfono</span>
                    <span className="text-btR sm:m-[.5rem]">{phone}</span>
                </p>
                <p className="flex flex-col sm:flex-row justify-between border-b border-caja3">
                    <span className="text-p-basico font-medium">Sucursal</span>
                    <span className="text-btR sm:m-[.5rem]">{location}</span>
                </p>
                <p className="flex flex-col sm:flex-row justify-between border-b border-caja3">
                    <span className="text-p-basico font-medium">DNI</span>
                    <span className="text-btR sm:m-[.5rem]">{dni}</span>
                </p>
                <p className="flex flex-col sm:flex-row justify-between border-b border-caja3">
                    <span className="text-p-basico font-medium">Ocupación</span>
                    <span className="text-btR sm:m-[.5rem]">{role}</span>
                </p>
                
                {/* Sección de estadísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-caja3 pb-3">
                    <p className="text-p-basico font-medium text-center sm:text-left">
                        <strong>Aprobadas:</strong> {totalAppointments("aprobada")}
                    </p>
                    <p className="text-p-basico font-medium text-center sm:text-left">
                        <strong>Canceladas:</strong> {totalAppointments("cancelada")}
                    </p>
                    <p className="text-p-basico font-medium text-center sm:text-left">
                        <strong>Realizadas:</strong> {totalAppointments("realizada")}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default BarberCard;