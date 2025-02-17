import { db } from '@/utils/firebase'; // Asegúrate de importar tu configuración de Firebase
import { doc, deleteDoc } from 'firebase/firestore';

export const removeAppointmentFromDB = async (appointmentId: string) => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId); // Asumiendo que la colección es 'appointments'
    await deleteDoc(appointmentRef); // Elimina el documento
    return true; // Retorna true si la operación fue exitosa
  } catch (error) {
    console.error('Error al eliminar la cita de la base de datos:', error);
    return false;
  }
};