'use client';

import { obtenerNombreCliente } from "@/features/barbers/services/appointments.barber";
import { useState, useEffect } from "react";
import { useAuth } from "@/store/User.context";
import { appointmentsTypes } from "@/types/appointmentsTypes";
import { approveAppointment, cancelAppointment } from "@/features/apointments/services/cancel.appointments";
import { hiddenBarberAppointments } from "@/features/apointments/services/hidden.appointments";
import { getAppointments } from "../services/get.appointments";

export const AppointmentsAdmin = () => {
    const [appointmets, setAppointments] = useState<appointmentsTypes[]>([]);
    const [clientNames, setClientNames] = useState<Record<string, string>>({});
    const [activeTab, setActiveTab] = useState("pendiente");
    const [searchTerm, setSearchTerm] = useState("");
    const {user} = useAuth();
    const [appointmentsCount, setAppointmentsCount] = useState({
      pendiente: 0,
      Aprobada: 0,
      Cancelada: 0,
      Realizada: 0
    });

    //Citas de clientes
    useEffect(() => {
      if (user) {
        const fetchAppointments = async () => {
          try {
            const data = await getAppointments(); // Obtiene todas las citas
            setAppointments(data);
      
            // Obtener nombres de clientes
            const names: Record<string, string> = {};
            for (const cita of data) {
              if (cita.userId) {
                const nombre = await obtenerNombreCliente(cita.userId); // Ahora estamos seguros de que el userId existe
                names[cita.userId] = nombre;
              }
            }
            setClientNames(names);

            const newAppointmentsCount = {
              pendiente: data.filter(cita => cita.status === "pendiente").length,
              Aprobada: data.filter(cita => cita.status === "Aprobada").length,
              Cancelada: data.filter(cita => cita.status === "Cancelada").length,
              Realizada: data.filter(cita => cita.status === "Realizada").length,
            };
            setAppointmentsCount(newAppointmentsCount);
          } catch (error) {
            console.error("Error al obtener citas", error);
          }
        };
        fetchAppointments();
      } else {
        console.warn("No hay usuario autenticado");
      }
    }, [user]); 

  //Ver citas conrrespondiente al nav
  const filteredAppointments = appointmets.filter((cita) => {
    const isMatchingStatus = cita.status === activeTab;
  
    // Convierte la fecha de la cita a una cadena
    const citaFecha = new Date(cita.date).toLocaleDateString();
  
    // Verifica si el término de búsqueda está contenido en la fecha de la cita
    const isMatchingDate = !searchTerm || citaFecha.includes(searchTerm);
  
    return (
      (isMatchingStatus || activeTab === "todos") &&
      isMatchingDate // Filtra si el término está en la fecha de la cita
    );
  });

  useEffect(() => {
    const newAppointmentsCount = {
      pendiente: appointmets.filter(cita => cita.status === "pendiente").length,
      Aprobada: appointmets.filter(cita => cita.status === "Aprobada").length,
      Cancelada: appointmets.filter(cita => cita.status === "Cancelada").length,
      Realizada: appointmets.filter(cita => cita.status === "Realizada").length,
    };
    setAppointmentsCount(newAppointmentsCount);
  }, [appointmets]);

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
            <ul className="flex flex-col lg:flex-row lg:justify-center bg-buscador p-0">
  <li
    className={`cursor-pointer mx-2 lg:mx-5 px-4 py-5 hover:bg-caja2 transition-colors duration-500 ${activeTab === "pendiente" ? "bg-btR" : "text-p-basico"}`}
    onClick={() => setActiveTab("pendiente")}
  >
    Citas Pendientes ({appointmentsCount.pendiente})
  </li>

  <li
    className={`cursor-pointer mx-2 lg:mx-5 px-4 py-5 hover:bg-caja2 transition-colors duration-500 ${activeTab === "Aprobada" ? "bg-btR" : "text-p-basico"}`}
    onClick={() => setActiveTab("Aprobada")}
  >
    Citas Aprobadas ({appointmentsCount.Aprobada})
  </li>

  <li
    className={`cursor-pointer mx-2 lg:mx-5 px-4 py-5 hover:bg-caja2 transition-colors duration-500 ${activeTab === "Cancelada" ? "bg-btR" : "text-p-basico"}`}
    onClick={() => setActiveTab("Cancelada")}
  >
    Citas Canceladas ({appointmentsCount.Cancelada})
  </li>

  <li
    className={`cursor-pointer mx-2 lg:mx-5 px-4 py-5 hover:bg-caja2 transition-colors duration-500 ${activeTab === "Realizada" ? "bg-btR" : "text-p-basico"}`}
    onClick={() => setActiveTab("Realizada")}
  >
    Citas Realizadas ({appointmentsCount.Realizada})
  </li>
</ul>
                  <h1 className="text-[1.8rem] my-[1.3rem]">Mis Citas</h1>

                <div className="md:my-4">
                    <input
                        type="search"
                        placeholder="Buscar por fecha (dd/mm/yyyy)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-buscador w-full md:w-[50%] p-[.5rem] pl-[4rem] text-p-basico rounded-[.3rem]"
                    />
                </div>
            </nav>

      <div className="">
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
  {
    filteredAppointments.length === 0 ? (
      <p className="text-center text-caja3">No hay citas.</p>
    ) :
    filteredAppointments.filter(cita => !cita.hiddenBarbers)
    .map(cita => (
       <li key={cita.id} className="shadow-md hover:shadow-lg transition-all duration-300 bg-buscador flex flex-wrap w-full  m-auto p-4 my-10 min-h-[250px]">
        <div className="">
          <p className="text-btR font-bold"><span className="text-[1.2rem] my-[.5rem] text-p-basico">{clientNames[cita.userId || '']}</span> ha reservado una cita contigo</p>
          <p className="text-btR font-bold">para el: {new Date(cita.date).toLocaleDateString()} a las {cita.hour}</p>
          <p className="text-btR font-bold my-[1rem]">Corte: {cita.haircut}</p>
          <p className="text-btR font-bold my-[1rem]">Sucursal: {cita.branch}</p>
          {/* {<p className="text-btR font-bold my-[1rem]">Estado: <span className="text-pendiente">{cita.status}</span></p>} text-green-600*/}
          {cita.status === 'Aprobada'  ? <p className="text-btR font-bold my-[1rem]">Estado: <span className="text-green-600">{cita.status}</span></p>
          :cita.status === 'Cancelada' ? <p className="text-btR font-bold my-[1rem]">Estado: <span className="text-error">{cita.status}</span></p> : ''}
          {cita.status === 'pendiente' && <p className="text-btR font-bold my-[1rem]">Estado: <span className="text-pendiente">{cita.status}</span></p>}
          

          {(cita.status === 'Aprobada' || cita.status === 'Cancelada') && <button
          onClick={() => {
            if(cita.id) handleHiddenAppointments(cita.id);
          }}
          className="rounded-sm bg-btR px-5 py-1 text-p-basico font-bold hover:bg-red-400 transition-colors duration-300"
          >
            Ocultar
          </button>}
        </div>
            
            {cita.status === 'pendiente' && (
          <div className="my-auto">
             <button 
             onClick={() => {
              if(cita.id) handleApproveAppointment(cita.id)
            }}
             className="my-auto rounded-sm bg-green-600 px-5 py-1 text-p-basico font-bold hover:bg-green-500 transition-colors duration-300"
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
          
      </li>
    ))
  }
</ul>

    </div>
        </article>
    );
};

export default AppointmentsAdmin;