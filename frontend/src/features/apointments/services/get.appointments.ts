import { db } from '@/utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AppointmentDetails } from '@/types/appointmentsTypes';


export const getAppointmentsForUser = async (userId: string): Promise<AppointmentDetails[]> => {
    if (!userId) {
      console.error("El userId no es válido.");
      return []; // Devuelve un array vacío si el userId no es válido
    }
  
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(appointmentsRef, where('userId', '==', userId), where('hidden', '==', false));  // Filtrar por userId
      const querySnapshot = await getDocs(q);
  
      const appointments: AppointmentDetails[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        barber: doc.data().barber,
        branch: doc.data().branch || '',
        createdAt: doc.data().createdAt?.toDate().toISOString() || "",
        date: doc.data().date,
        haircut: doc.data().haircut,
        hour: doc.data().hour,
        userId: doc.data().userId,
        status: doc.data().status,
        hidden: doc.data().hidden,
      }));
  
      return appointments;
    } catch (error) {
      console.error("Error obteniendo las citas: ", error);
      return [];
    }
  };
  