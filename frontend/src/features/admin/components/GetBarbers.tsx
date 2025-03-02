'use client';

import { getBarber } from "../services/get.barbers";
import { useAuth } from "@/store/User.context";
import { useEffect, useState } from "react";
import { userData } from "@/types/userTypes";
import { getAppointmentsForBarber } from "../services/get.barbers";
import { appointmentsTypes } from "@/types/appointmentsTypes";
import dynamic from "next/dynamic";
import Loading from "@/components/Ui/Loading/loading";

const BarberCard = dynamic(() => import('./barberCard'), {
    ssr: false,
    loading: () => <div className=' flex flex-col justify-center'>
            <p className='text-center text-[1.5rem] text-p-basico p-5'>Cargando</p> <Loading />
        </div>
})

export const GetBarbersComponente = () => {
    const [barbers, setBarbers] = useState<userData[]>([]);
    const [filteredBarbers, setFilteredBarbers] = useState<userData[]>([]); // Nuevo estado para los barberos filtrados
    const [appointments, setAppointments] = useState<{ [key: string]: appointmentsTypes[] }>({});
    const [dni, setDni] = useState('');
    const { user } = useAuth();

    
    const fetchBarbers = async () => {
        if (user) {
            try {
                const data = await getBarber();
               // await getAppointmentsForBarber(user?.uid)
                setBarbers(data); // Guardamos todos los barberos
                setFilteredBarbers(data); // Establecemos los barberos filtrados inicialmente

                const barberAppointments = await Promise.all(
                    data.map(async (barber) => {
                        const appointmentsData = await getAppointmentsForBarber(barber.uid);
                        return { uid: barber.uid, appointments: appointmentsData };
                    })
                );
    
                // Convertirlo en un objeto donde las claves sean los `uid` de los barberos
                const appointmentsMap: { [key: string]: appointmentsTypes[] } = barberAppointments.reduce((acc, barber) => {
                    acc[barber.uid] = barber.appointments;
                    return acc;
                }, {} as { [key: string]: appointmentsTypes[] });
    
                setAppointments(appointmentsMap);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchBarbers();
    }, [user]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value.toLowerCase();
        setDni(searchQuery); // Actualizamos el valor del DNI en el estado

        // Filtramos los barberos por DNI
        const filtered = barbers.filter((barber) =>
            barber.dni.toLowerCase().includes(searchQuery)
        );
        setFilteredBarbers(filtered); // Actualizamos los barberos filtrados
    };

    const countAppointmentsByStatus = (barberUid: string, status: string) => {
        const filteredAppointments = Object.values(appointments).flat().filter(app => app.userId === barberUid && app.status === status);
        console.log(`Citas para el barbero ${barberUid} con estado ${status}:`, filteredAppointments);
        return filteredAppointments.length;
    };

    return (
        <section>
            <h2 className="text-center text-[1.8rem] my-[1.3rem]">Barberos de <strong>Elegance Studio</strong></h2>
            <p className="text-center text-[1.2rem] my-[1.3rem]">Cantidad de barberos - <span className="text-green-700 bg-p-basico p-[.5rem] rounded">{barbers.length}</span></p>
           {/* Buscador */}
        <div className="my-4 flex justify-center">
            <input
                type="number"
                placeholder="Buscar por DNI"
                value={dni}
                onChange={handleSearchChange}
                className="bg-buscador w-full sm:w-[70%] md:w-[50%] lg:w-[30%] p-2 pl-4 rounded-md text-p-basico border-2 border-p-basico 
                focus:outline-none focus:ring-2 focus:ring-caja"
            />
        </div>
            <div className="flex flex-wrap gap-5 justify-center">
                {filteredBarbers.length === 0 ? <p>Barbero no encontrado</p>: filteredBarbers.map((barber) => (
                    <BarberCard
                        key={barber.uid}
                        name={barber.name}
                        lastName={barber.lastName}
                        email={barber.email}
                        phone={barber.phone}
                        dni={barber.dni}
                        location={barber.location}
                        role={barber.role}
                        uid={barber.uid}
                        createdAt={barber.createdAt}
                        totalAppointments={() => countAppointmentsByStatus(barber.uid, 'aprobada')} 
                    />
                ))}
            </div>
        </section>
    );
};

export default GetBarbersComponente;
