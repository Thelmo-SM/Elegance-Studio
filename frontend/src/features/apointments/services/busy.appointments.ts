// services/appointmentsService.ts

import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// Verificar si el horario está ocupado
export const checkIfHourIsOccupied = async (barberId: string, selectedHour: string, selectedDate: string) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'appointments'),
        where('barber', '==', barberId),
        where('date', '==', selectedDate),
        where('hour', '==', selectedHour),
      )
    );

    // Si se encuentran citas con esa hora, está ocupada
    return querySnapshot.size > 0;
  } catch (error) {
    console.error('Error al verificar la hora:', error);
    return false;
  }
};