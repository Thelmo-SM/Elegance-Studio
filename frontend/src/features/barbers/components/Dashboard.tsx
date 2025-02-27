'use client';

import { getAppointmentsBarbers, obtenerNombreCliente } from "../services/appointments.barber";
import { useState, useEffect } from "react";
import { useAuth } from "@/store/User.context";
import { appointmentsTypes } from "@/types/appointmentsTypes";
import { approveAppointment, cancelAppointment } from "@/features/apointments/services/cancel.appointments";
import { hiddenBarberAppointments } from "@/features/apointments/services/hidden.appointments";

export const DashboardBarbers = () => {
    const [appointmets, setAppointments] = useState<appointmentsTypes[]>([]);
    const [clientNames, setClientNames] = useState<Record<string, string>>({});
    const [verMas, setVerMas] = useState<Record<string, boolean>>({});
    const [activeTab, setActiveTab] = useState("pendiente");
    const [searchTerm, setSearchTerm] = useState("");
    const {user} = useAuth();

    const toggleVerMas = (id: string) => {
      setVerMas(prev => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    //Citas de clientes
  useEffect(() => {
    const BarberAppointmets = async () => {
      try {
        if (user?.uid) {
        const data = await getAppointmentsBarbers(user.uid);
        setAppointments(data);

        const names: Record<string, string> = {};
                    for (const cita of data) {
                        const nombre = await obtenerNombreCliente(cita.userId || '');
                        names[cita.userId || ''] = nombre;
                    }
                    setClientNames(names); 
                    console.log("Datos obtenidos del backend:", data);
      } else {
        console.log('El userId no es válido');
      }
      } catch (error) {
        console.log('El userId no es válido', error);
      }
    };
  
    BarberAppointmets();
  }, [user]);

  //Ver citas conrrespondiente al nav
  const filteredAppointments = appointmets.filter((cita) => {
    const isMatchingStatus = cita.status === activeTab;
    const citaFecha = new Date(cita.date).toLocaleDateString();
    const isMatchingDate = !searchTerm || citaFecha.includes(searchTerm);
  
    return (
      (isMatchingStatus || activeTab === "todos") &&
      isMatchingDate
    );
  });
  //Aprobar cita
  const handleApproveAppointment = async (appointmentId: string) => {
      const result = await approveAppointment(appointmentId);
      if (result.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status: "Aprobada" }
              : appointment
            )
          );
          console.log('CANCELAR: ', result.success);
        } else {
          console.error("No se pudo cancelar la cita:", result.error);
      }
    };

    //Cancelar cita
    const handleCancelAppointment = async (appointmentId: string) => {
        const result = await cancelAppointment(appointmentId);
        if (result.success) {
          setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment.id === appointmentId
                ? { ...appointment, status: "Cancelada" }
                : appointment
              )
            );
            console.log('CANCELAR: ', result.success);
          } else {
            console.error("No se pudo cancelar la cita:", result.error);
        }
      };

    //Ocultar cita aprobada
    const handleHiddenAppointments = async (id: string) => {
      try {
        const hidden = await hiddenBarberAppointments(id);
        if (hidden.success) {
          setAppointments(prevAppointments =>
            prevAppointments.map(app =>
              app.id === id ? { ...app, hiddenBarbers: true } : app
            )
          );
        } else {
          console.error("No se pudo ocultar la cita:", hidden);
        }
      } catch (error) {
        console.error("Error al ocultar cita:", error);
      }
    };

    return (
        <article className="">
            <nav className=" ">
                <ul className="flex justify-center bg-buscador p-[0rem]">
                <li

                className={`cursor-pointer mx-[5rem] px-[1rem] py-[2rem] hover:bg-caja2 transition-colors duration-500 ${activeTab === "pendiente" ? "bg-btR" : 'text-p-basico'}`}
                onClick={() => setActiveTab("pendiente")}
                >
                  Citas Pendientes

                </li>
                <li 
                className={`cursor-pointer mx-[5rem] px-[1rem] py-[2rem] hover:bg-caja2 transition-colors duration-500 ${activeTab === "Aprobada" ? "bg-btR" : 'text-p-basico'}`}
                onClick={() => setActiveTab("Aprobada")}
                >
                  Citas Aprobadas

                </li>
                <li 
                className={`cursor-pointer mx-[5rem] px-[1rem] py-[2rem] hover:bg-caja2 transition-colors duration-500 ${activeTab === "Cancelada" ? "bg-btR" : "text-p-basico"}`}
                onClick={() => setActiveTab("Cancelada")}
                >
                  Citas Canceladas

                </li>
                <li 
                className={`cursor-pointer mx-[5rem] px-[1rem] py-[2rem] hover:bg-caja2 transition-colors duration-500 ${activeTab === "Realizada" ? "bg-btR" : "text-p-basico"}`}
                onClick={() => setActiveTab("Realizada")}
                >
                  Citas Realizadas

                </li>
                </ul>
                  <h1 className="text-[1.8rem] my-[1.3rem]">Mis Citas</h1>

                <div className="my-4">
                    <input
                        type="search"
                        placeholder="Buscar por fecha (dd/mm/yyyy)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-buscador w-[50%] p-[.5rem] pl-[4rem] text-p-basico rounded-[.3rem]"
                    />
                </div>
            </nav>

      <div className="">
      <ul className="w-full flex flex-wrap gap-4">
        {
        filteredAppointments.length === 0 ? (
          <p className="text-center text-caja3">Aún los clientes no han reservado citas contigo</p>
        ) :
        filteredAppointments.filter(cita => !cita.hiddenBarbers)
        .map(cita => (
           <li key={cita.id} className="shadow-md hover:shadow-lg transition-all duration-300 bg-buscador flex flex-wrap w-[40%] m-auto p-4 my-10">
            <div className="m-auto">
            <p className="text-btR font-bold"><span className="text-[1.2rem] my-[.5rem] text-p-basico">{clientNames[cita.userId || '']}</span> ha reservado una cita contigo</p>
            <p className="text-btR font-bold">para el: {new Date(cita.date).toLocaleDateString()} a las {cita.hour}</p>
            {cita.status === 'Aprobada'  ? <p className=" my-3 text-green-600">Acceptada</p>
            :cita.status === 'Cancelada' ? <p className=" my-3 text-pendiente">Cancelada</p> : ''}
            </div>
            {cita.status === 'pendiente' && (
              <div className="my-auto">
                 <button 
                 onClick={() => {
                  if(cita.id) handleApproveAppointment(cita.id)
                }}
                 className="mx-[1rem] my-auto rounded-sm bg-green-600 px-5 py-1 text-p-basico font-bold hover:bg-green-500 transition-colors duration-300"
                 >
                  Aceptar
                 </button>
                 <button 
                 onClick={() => {
                  if(cita.id) handleCancelAppointment(cita.id)
                 }}
                 className="ml-2 my-auto rounded-sm bg-error px-5 py-1 text-p-basico font-bold hover:bg-red-400 transition-colors duration-300"
                 >
                  Rechazar

                 </button>
              </div>
            )}
           { !(cita.status == 'Aprobada' || cita.status == 'Cancelada') && <button 
                className="text-p-basico font-bold ml-[2rem] my-auto border-b"
                onClick={() => {if(cita.id) toggleVerMas(cita.id)}}
                >
                {verMas[cita.id || ""] ? "Ver menos" : "Ver detalles"}
                </button>}

              {(cita.status === 'Aprobada' || cita.status === 'Cancelada') && <button
              onClick={() => {
                if(cita.id) handleHiddenAppointments(cita.id);
              }}
              className="ml-2 rounded-sm bg-btR px-5 py-1 text-p-basico font-bold hover:bg-red-400 transition-colors duration-300"
              >
                Ocultar
              </button>}

              {verMas[cita.id || ""] && (
                <div className="m-auto my-[1rem]">
                  <p className="text-btR font-bold my-[1rem]">Corte: {cita.haircut}</p>
                  <p className="text-btR font-bold my-[1rem]">Sucursal: {cita.branch}</p>
                  <p className="text-btR font-bold my-[1rem]">Estado: <span className="text-pendiente">{cita.status}</span></p>
                </div>
              )}
          </li>

        ))}
      </ul>
    </div>
        </article>
    );
};

export default DashboardBarbers;