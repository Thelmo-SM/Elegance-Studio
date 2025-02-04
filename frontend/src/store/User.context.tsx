'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '@/utils/firebase'

type MinimalUser = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
};

type AuthContextType = {
  user: MinimalUser | null;
  loading: boolean;
  logout: () => Promise<void>
};


const AuthContext = createContext<AuthContextType>({ user: null, loading: true, logout: async() => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MinimalUser | null>(null);
  const [loading, setLoading] = useState(true);

    // Escucha los cambios en el estado de autenticación
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
