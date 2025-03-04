import { db } from '@/utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const hiddenAppointments = async (appointmentId: string) => {
  try {
    const appointmentRef = doc(db, "appointments", appointmentId);
    await updateDoc(appointmentRef, { hidden: true });

    return { success: true };
  } catch (error) {
    console.error('Error actualizando la visibilidad de la cita:', error);
    return { success: false };
  }
};

//Ocultar para el barbero y el administrador

export const hiddenBarberAppointments = async (appointmentId: string) => {
  try {
    const appointmentRef = doc(db, "appointments", appointmentId);
    await updateDoc(appointmentRef, { hiddenBarbers: true });

    return { success: true };
  } catch (error) {
    console.error('Error actualizando la visibilidad de la cita:', error);
    return { success: false };
  }
};

