import { db } from '@/utils/firebase'; // Asegúrate de importar tu configuración de Firebase
import { doc, deleteDoc } from 'firebase/firestore';

export const removeAppointmentFromDB = async (appointmentId: string) => {
    if (!appointmentId) {
      console.error("ID de cita inválido:", appointmentId);
      return false; // Si el ID no es válido, evita la eliminación
    }
  
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId); // Referencia del documento en Firestore
      await deleteDoc(appointmentRef); // Eliminar el documento
      return true; // Retornar true si la eliminación es exitosa
    } catch (error) {
      console.error('Error al eliminar la cita de la base de datos:', error);
      return false;
    }
  };