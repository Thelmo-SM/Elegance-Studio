import { getIdToken, getIdTokenResult } from "firebase/auth"; 
import { auth } from "@/utils/firebase"; // Asegúrate de tener el archivo de configuración de Firebase correctamente importado

// Función para renovar el token si está cerca de expirar
async function renewTokenIfNecessary() {
    const user = auth.currentUser;
  
    if (user) {
      const tokenResult = await getIdTokenResult(user, true); // Obtener el token renovado si está por caducar
      const expirationTime = tokenResult.expirationTime; // Esto es un string
  
      // Convertir expirationTime a número (milisegundos desde la época de Unix)
      const expirationTimeInMs = new Date(expirationTime).getTime();
  
      // Si el token está a punto de expirar (menos de 5 minutos antes), lo renovamos
      if (new Date().getTime() > expirationTimeInMs - 5 * 60 * 1000) {
        await getIdToken(user, true); // Renovar el token
        console.log("Token renovado");
      }
    }
  }
  
  // Llamar a la función cada minuto para renovar el token si es necesario
  setInterval(renewTokenIfNecessary, 60 * 1000);