import { useState, useEffect } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Definir la interfaz para un servicio
interface Service {
  id: string;
  name: string;
  price: number;
}

interface DyeType {
  id: string;
  name: string;
}

const useGetServices = () => {
  const [haircut, setHaircut] = useState<Service[]>([]);
  const [beard, setBeard] = useState<Service[]>([]);
  const [dye, setDye] = useState<DyeType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getServices = async () => {
      try {
        const cachedHaircut = localStorage.getItem("haircutStyles");
        const cachedBeard = localStorage.getItem("beardStyles");
        const cachedDye = localStorage.getItem("dyeHairStyles");

        if (cachedHaircut && cachedBeard && cachedDye) {
          setHaircut(JSON.parse(cachedHaircut));
          setBeard(JSON.parse(cachedBeard));
          setDye(JSON.parse(cachedDye));
        } else {
          const haircutRef = collection(db, "haircut_styles");
          const beardRef = collection(db, "beard_styles");
          const dyeRef = collection(db, "dye_hair");

          const [haircutShap, beardShap, dyeShap] = await Promise.all([
            getDocs(query(haircutRef, limit(10))), 
            getDocs(query(beardRef, limit(10))),
            getDocs(query(dyeRef, limit(10))),
          ]);

          const haircutData = haircutShap.docs.map((doc) => {
            const { name, price } = doc.data();
            return { id: doc.id, name, price };
          });
          const beardData = beardShap.docs.map((doc) => {
            const { name, price } = doc.data();
            return { id: doc.id, name, price };
          });
          const dyeData = dyeShap.docs.map((doc) => {
            const { name } = doc.data();
            return { id: doc.id, name };
          });

          setHaircut(haircutData);
          setBeard(beardData);
          setDye(dyeData);

          localStorage.setItem("haircutStyles", JSON.stringify(haircutData));
          localStorage.setItem("beardStyles", JSON.stringify(beardData));
          localStorage.setItem("dyeHairStyles", JSON.stringify(dyeData));
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Error fetching services.");
      }
    };

    getServices();
  }, []);

  return {
    haircut,
    beard,
    dye,
    error,
  };
};

export default useGetServices;
