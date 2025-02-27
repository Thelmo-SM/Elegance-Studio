'use client';

import { useEffect, useState } from "react";
import AppointmentsForm from "./Appointments.form";
import { useModalApointments } from "../hooks/Modal.apointments";
import { appointmentsTypes } from "@/types/appointmentsTypes";
import DetailsAppointmets from "./Details.appointments";
import { getAppointmentsForUser } from "../services/get.appointments";
import { useAuth } from "@/store/User.context";
import { getBarbers } from "@/features/barbers/services/get.barbers";
import { barbersTypes } from "../hooks/useForm.appointments";
import { cancelAppointment } from "../services/cancel.appointments";
import { createAppointment } from "../services/create.appointments";
import { hiddenAppointments } from "../services/hidden.appointments";

export const AppointmentsComponent = () => {
  const [isOpen, openModal, closeModal] = useModalApointments();
  const [appointments, setAppointments] = useState<appointmentsTypes[]>([]);
  const [barber, setBarber] = useState<barbersTypes[]>([]);
  const [cancel, setCancel] = useState<{ [key: string]: boolean }>({});
  const {user} = useAuth();
  
/////////////////////////////

    // Cargar las citas al montar el componente
    const loadAppointments = () => {
      const cachedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      setAppointments(cachedAppointments);
    };

    useEffect(() => {
      loadAppointments();
    }, []);
    
    const handleCreateAppointment = async (newAppointment: appointmentsTypes) => {
      if (!newAppointment.branch || !newAppointment.date || !newAppointment.haircut || !newAppointment.hour || !newAppointment.barber) {
        return; // Validar datos antes de continuar
      }
    
      try {
        // Llamar a la función de creación de cita
        const createdAppointment = await createAppointment(newAppointment);
    
        // Si la cita fue creada correctamente, actualizamos el estado
        setAppointments((prevAppointments) => {
          // Verificar si createdAppointment es un objeto de tipo appointmentsTypes
          if ("branch" in createdAppointment) {
            const updatedAppointments = [...prevAppointments, createdAppointment];
            localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
            return updatedAppointments; // Solo actualizamos el estado si la cita es válida
          } else {
            // Si el objeto no es una cita válida, no actualizamos el estado
            return prevAppointments;
          }
        });
      } catch (error) {
        console.error("Error al crear la cita:", error);
      }
    };


  //Metodo para cancelar citas
  const handleCancelAppointment = async (appointmentId: string) => {
    
    setCancel(prev => ({ ...prev, [appointmentId]: true }));
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
    setCancel(prev => ({ ...prev, [appointmentId]: false }));
  };
//Ocultar citas
const handleHiddenAppointments = async (id: string) => {
  try {
    const hidden = await hiddenAppointments(id);
    if (hidden.success) {
      setAppointments(prevAppointments =>
        prevAppointments.map(app =>
          app.id === id ? { ...app, hidden: true } : app
        )
      );
      // Actualiza el almacenamiento local al ocultar la cita
      const updatedAppointments = appointments.map(app =>
        app.id === id ? { ...app, hidden: true } : app
      );
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    } else {
      console.error("No se pudo ocultar la cita:", hidden);
    }
  } catch (error) {
    console.error("Error al ocultar cita:", error);
  }
};

  useEffect(() => {
    const getAppointmets = async () => {
      try {
        if (user?.uid) {
        const data = await getAppointmentsForUser(user.uid);
        setAppointments(data);
      } else {
        console.log('El userId no es válido');
      }
      } catch (error) {
        console.log('El userId no es válido', error);
      }
    };
  
    getAppointmets();
  }, [user]);

  useEffect(() => {
    const fetchBarbers = async () => {
      const data = await getBarbers();
      setBarber(data);
    };

    fetchBarbers();
  }, []);

  return (
    <section>
      <article className="h-[30rem] relative w-full bg-[url('/portada-citas.webp')] bg-cover bg-center">
        <div className="lg:w-[52%] absolute lg:top-1/1 lg:left-1/3 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/5 overlay mt-[15rem] lg:mt-0 md:-translate-x-1/2 md:left-1/2">
          <h2 className="text-p-basico lg:pt-[10rem] text-center lg:text-left font-bold text-[2.25rem] mb-10">
            Citas
          </h2>
          <p className="text-p-basico text-[1.1rem] text-center lg:text-left">
            Elige el día y hora que mejor se adapte a ti y disfruta de nuestros
            servicios exclusivos. ¡Te esperamos!
          </p>
          <button
            onClick={openModal}
            className="shadow-sombra text-p-basico bg-btR py-3 px-8 rounded-[0.25rem] mt-[1rem] md:mt-[5rem] hover:bg-ct transition duration-[200ms] flex items-center justify-center mx-auto lg:mx-0"
          >
            Agenda tu cita
          </button>
        </div>
      </article>
      <article className="w-[90%] flex flex-col items-center mx-auto pb-20">
        <h2 className="mt-5 self-start text-[2rem] font-bold">Mis citas</h2>

      
      <div className="flex flex-wrap justify-between gap-6 mx-auto">
      {/* El formulario de citas recibe el handleCreateAppointment */}
      {appointments.length === 0 ? (
      <p className="text-[1.8rem]">No tienes citas pendientes</p>
      ) : (
        appointments
        .filter(appointment => !appointment.hidden) // Filtra las visibles
        .map((appointment, index) => {
          const barberData = barber.find(b => b.id === appointment.barber);

      return (
      <div key={`${appointment.id} || ${index}`} 
      className={`p-2 
                  sm:w-full md:w-[48%] lg:w-[30%] mt-[1rem] bg-buscador rounded-sm shadow-sombra ${appointment.status === 'Cancelada' && 'bg-red-950'}`}
      >
        <DetailsAppointmets
          id={appointment.id}
          barber={barberData ? barberData.name : "Barbero no encontrado"}
          branch={appointment.branch}
          date={appointment.date}
          haircut={appointment.haircut}
          hour={appointment.hour}
          status={appointment.status}
          createdAt={appointment.createdAt}
          cancelAppointment={handleCancelAppointment} 
          cancel={cancel}
          hdden={handleHiddenAppointments}
        />
      </div>
          );
        })
      )}
      </div>
        <AppointmentsForm isOpens={isOpen} closeModal={closeModal} onCreate={handleCreateAppointment} />
      </article>
    </section>
  );
};

export default AppointmentsComponent;
