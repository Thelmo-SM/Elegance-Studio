import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Definir la interfaz para un servicio
interface Service {
  id: string;
  name: string;
  price: number;
}

interface dyeType {
    id: string;
    name:string
}

const useGetServices = () => {
  const [haircut, setHaircut] = useState<Service[]>([]);
  const [beard, setBeard] = useState<Service[]>([]);
  const [dye, setDye] = useState<dyeType[]>([]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const haircutRef = collection(db, "haircut_styles");
        const beardRef = collection(db, "beard_styles");
        const dyeRef = collection(db, "dye_hair");

        const [haircutShap, beardShap, dyeShap] = await Promise.all([
          getDocs(haircutRef),
          getDocs(beardRef),
          getDocs(dyeRef),
        ]);

        setHaircut(
          haircutShap.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price,
          }))
        );

        setBeard(beardShap.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price
        })));

        setDye(dyeShap.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name
        })));


      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    getServices();
  }, []);

  return {
    haircut,
    beard,
    dye,
  };
};

export default useGetServices;

