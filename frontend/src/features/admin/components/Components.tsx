'use client';

import AppointmentsAdmin from "./AppointmentsAdmin";
import DashboardBarbers from "@/features/barbers/components/Dashboard";
import { useAuth } from "@/store/User.context";

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