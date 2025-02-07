'use client';
import serviceCarrusel from "@/services/serviceCarrusel";
import { useState, useEffect, useCallback } from "react";
import ServiceComponent from "./ServiceComponent";
import PorqueNosotrosComponent from "./PorqueNosotrosComponent";
import BranchesComponent from "./BranchesComponent";
import ProductsComponent from "./ProductInfoComponent";
import Style from '../../../styles/Landing.module.css'

export const HomeComponent = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const totalSlides = serviceCarrusel.length;


    const moveCarousel = useCallback((direction: number) => {
        let newIndex = currentIndex + direction;


        if (newIndex < 0) newIndex = totalSlides - 1; 
        if (newIndex >= totalSlides) newIndex = 0;  

        setCurrentIndex(newIndex);  
    }, [currentIndex, totalSlides]);  // Dependencias para que se recalculen correctamente

    useEffect(() => {
        const interval = setInterval(() => {
            moveCarousel(1);  // Mover hacia el siguiente índice
        }, 3000);  // Cambiar cada 3 segundos (ajusta el tiempo según sea necesario)

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [moveCarousel]);  // 'moveCarousel' está en las dependencias

    return (
        <div className={`lg:w-[90%] mx-auto ${Style.sombras} z-10 lg:px-[5rem] px-[0.3rem]`}>
        <article className="py-10">
            <h2 className="text-[1.8rem] font-bold text-center lg:text-left">Servicios</h2>

            <div className="relative">
                <div className="overflow-hidden rounded-lg">
                    {/* Aplicando la transformación aquí usando el índice */}
                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {
                            serviceCarrusel.map((data) => (
                                <div key={data.id} className="w-full flex-shrink-0 text-center bg-cover bg-center  p-10 my-10"
                                style={{
                                    backgroundImage: `url(${data.img})`,
                                }}
                                >
                                    <h3 className="text-p-basico my-[1.8rem] text-[1.8rem] font-bold">{data.title}</h3>
                                    <p className="text-p-basico my-[1.8rem] text-[1.25rem]">{data.discription}</p>
                                    <p className="text-p-basico my-[1.8rem] text-[1.25rem]">{data.details}</p>
                                    <p className="text-p-basico my-[1.8rem] text-[1.25rem]">{data.information}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Botones de navegación */}
                <button onClick={() => moveCarousel(1)} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">❮</button>
                <button onClick={() => moveCarousel(-1)} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">❯</button>
            </div>
        </article>
      <ServiceComponent />
        <ProductsComponent />
        <BranchesComponent />
        <PorqueNosotrosComponent />
        </div>
    );
};

export default HomeComponent;
