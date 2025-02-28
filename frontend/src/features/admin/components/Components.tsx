'use client';

import Loading from "@/components/Ui/Loading/loading"; 
//import AppointmentsAdmin from "./AppointmentsAdmin";
//import DashboardBarbers from "@/features/barbers/components/Dashboard";
import { useAuth } from "@/store/User.context";
import dynamic from "next/dynamic";

const AppointmentsAdmin = dynamic(() => import('./AppointmentsAdmin'), {
    ssr: false,
    loading: () => <div className=' flex flex-col justify-center'>
        <p className='text-center text-[1.5rem] text-p-basico p-5'>Cargando</p> <Loading />
    </div> 
})

const DashboardBarbers = dynamic(() => import('@/features/barbers/components/Dashboard'),{
    ssr: false,
    loading: () => <div className=' flex flex-col justify-center'>
    <p className='text-center text-[1.5rem] text-p-basico p-5'>Cargando</p> <Loading />
    </div> 
})

export const Components = () => {

    const { user } = useAuth();


    return (
        <>
        {user?.role === 'admin' ? <AppointmentsAdmin /> :
        <DashboardBarbers />}
        </>
    );
}

export default Components;