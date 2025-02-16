'use client';

// AppointmentsComponent.tsx
import { useEffect, useState } from "react";
import AppointmentsForm from "./Appointments.form";
import { useModalApointments } from "../hooks/Modal.apointments";
import { appointmentsTypes } from "@/types/appointmentsTypes";
import DetailsAppointmets from "./Details.appointments";
import { getAppointmentsForUser } from "../services/get.appointments";
import { useAuth } from "@/store/User.context";
import { getBarbers } from "@/features/barbers/services/get.barbers";
import { barbersTypes } from "../hooks/useForm.appointments";

export const AppointmentsComponent = () => {
  const [isOpen, openModal, closeModal] = useModalApointments();
  const [appointments, setAppointments] = useState<appointmentsTypes[]>([]);
  const [barber, setBarber] = useState<barbersTypes[]>([]);
  const {user} = useAuth();


  const handleCreateAppointment = (newAppointment: appointmentsTypes) => {
    // Validar que no haya campos vacíos
    if (!newAppointment.branch || !newAppointment.date || !newAppointment.haircut || !newAppointment.hour || !newAppointment.barber) {
      return; // No actualiza el estado si faltan datos
    }
    const appointmentWithStatusAndDate = {
      ...newAppointment,
      status: 'Pendiente',  // O el estado que desees asignar
      createdAt: new Date().toLocaleDateString() // Fecha de creación
    };
  
    setAppointments((prevAppointments) => {
      const updatedAppointments = [...prevAppointments, appointmentWithStatusAndDate];
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      return updatedAppointments;
    });
  };

  useEffect(() => {
    const getAppointmets = async () => {
      if (user?.uid) {
        const data = await getAppointmentsForUser(user.uid);
        setAppointments(data);
      } else {
        console.log('El userId no es válido');
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

  //Fecha de realización
  const formatDate = (isoDate: string | undefined) => {
    const date = isoDate ? new Date(isoDate) : null;
  
    if (!date || isNaN(date.getTime())) {
      return 'Fecha no disponible';
    }
  
    return date.toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

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
      appointments.map((appointment, index) => {
      // Buscar el barbero correspondiente
      const barberData = barber.find(b => b.id === appointment.barber);

      return (
      <div key={`${appointment.id} || ${index}`} 
      className="p-2 
                  sm:w-full md:w-[48%] lg:w-[30%] mt-[1rem] bg-buscador rounded-sm shadow-sombra"
      >
        <p className="text-p-basico font-bold text-[1.2rem] pb-[1rem]">¡Cita agendada!</p>
        <DetailsAppointmets 
          barber={barberData ? barberData.name : "Barbero no encontrado"}
          branch={appointment.branch}
          date={appointment.date}
          haircut={appointment.haircut}
          hour={appointment.hour}
          status={appointment.status}
          createdAt={appointment.createdAt ? formatDate(appointment.createdAt): 'Fecha no disponible'}
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
