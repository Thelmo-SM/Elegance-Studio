'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, getIdTokenResult, getIdToken } from "firebase/auth";
import { auth, db } from '@/utils/firebase'; 
import { doc, getDoc, Timestamp } from "firebase/firestore";

type MinimalUser = {
  uid: string;
  email: string | null;
  photoURL?: string | null;
  role?: string;
  name: string;
  lastName: string;
  phone: string;
  createdAt: Timestamp | null;
  location?: string;
  dni?: string;
};

type AuthContextType = {
  user: MinimalUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, logout: async () => {}, refreshUser: async () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MinimalUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para renovar el token si está cerca de expirar
  const renewTokenIfNecessary = async () => {
    if (user) {
      try {
        const tokenResult = await getIdTokenResult(auth.currentUser!, true);
        const expirationTimeInMs = new Date(tokenResult.expirationTime).getTime();

        // Si el token está a punto de expirar (menos de 5 minutos antes), lo renovamos
        if (new Date().getTime() > expirationTimeInMs - 5 * 60 * 1000) {
          await getIdToken(auth.currentUser!, true); // Renovar el token
          console.log("Token renovado");
        }
      } catch (error) {
        console.error("Error al renovar el token:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            role: userData.role || 'client',
            name: userData.name || 'Desconocido',
            lastName: userData.lastName || 'Desconocido',
            phone: userData.phone || 'Ninguno',
            createdAt: userData.createdAt instanceof Timestamp ? userData.createdAt : null,
            location: userData.location || 'Ninguna',
            dni: userData.dni || 'Ninguno',
          });
        }

        // Renovar el token cada minuto (esto se puede ajustar según tus necesidades)
        const tokenInterval = setInterval(renewTokenIfNecessary, 60 * 1000);
        
        // Limpiar intervalo al desmontar el componente
        return () => clearInterval(tokenInterval);

      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      setLoading(true);
      // Realizamos la solicitud POST al API de logout
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        // Redirigir al login después de cerrar sesión
        window.location.href = '/login';
        signOut(auth);
        setUser(null);
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const refreshUser = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", user?.uid || ""));
      if (userDoc.exists()) {
        setUser(userDoc.data() as MinimalUser);
      }
    } catch (error) {
      console.error("Error al refrescar usuario:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
