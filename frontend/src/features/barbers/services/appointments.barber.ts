import { db } from '@/utils/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';


export const getAppointmentsBarbers = async (barberId: string) => {
    const appointmentsRef = collection(db, 'appointments');
    const q = query(appointmentsRef, where('barber', '==', barberId), where('hidden', '==', false));
    
    try {
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
      id: doc.id,  // El id lo agregamos desde Firestore
      branch: doc.data().branch || '',  // Si no existe, se usa un valor predeterminado
      haircut: doc.data().haircut || '',
      date: doc.data().date || '',
      hour: doc.data().hour || '',
      barber: doc.data().barber || '',
      status: doc.data().status || 'pendiente', // Valor predeterminado para status
      createdAt: doc.data().createdAt || '', // Valor predeterminado para createdAt
      userId: doc.data().userId || '',  // Valor predeterminado para userId
      hidden: doc.data().hidden || false,
      hiddenBarbers: doc.data().hiddenBarbers || false,
      }));
    } catch (error) {
      console.error('Error obteniendo citas:', error);
      throw new Error('Error obteniendo citas');
    }
  };
  

  export const obtenerNombreCliente = async (userId: string) => {
    if (!userId) {
      console.error("Error: userId es inválido:", userId);
      return "ID de usuario no válido";
    }
    try {
      const userDocRef = doc(db, 'users', userId);  // Referencia al documento del usuario
      const userDoc = await getDoc(userDocRef);  // Obtener el documento
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData?.name || 'Nombre no disponible'; // Asumiendo que el campo de nombre es 'name'
      } else {
        return 'Usuario no encontrado';
      }
    } catch (error) {
      console.error('Error obteniendo el nombre del cliente:', error);
      throw new Error('Error obteniendo el nombre del cliente');
    }
  };