'use client';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef } from 'react';
import { BranchesService } from '@/services/branchesService';

export const BranchesComponent = () => {
    const mapRef = useRef<maplibregl.Map | null>(null);
    const { branch } = BranchesService();
    
    useEffect(() => {
        // Inicializar el mapa
        const map = new maplibregl.Map({
            container: 'map',
            style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
            center: [-70.5170, 19.2212],
            zoom: 5,
        });

        // Asignar el mapa a mapRef
        mapRef.current = map;

        // Agregar marcadores para cada sucursal
        branch.forEach((branch) => {
            new maplibregl.Marker()
                .setLngLat(branch.coordinates as [number, number])
                .setPopup(
                    new maplibregl.Popup({ offset: 25 })
                        .setHTML(`<h3>${branch.name}</h3><p>${branch.description}</p>
                            <p>Telefono: ${branch.phone}</p>`)
                )
                .addTo(map);
        });

        // Limpiar el mapa al desmontar el componente
        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [branch]);

    // Manejar clic en las tarjetas
    const handleBranchClick = (coordinates: [number, number]) => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: coordinates,
                zoom: 14,
                essential: true,
            });
        }
    };

    return (
<article className="relative w-full py-10 my-1  p-4 shadow-sombra">
    <h2 className="text-[1.8rem] font-bold mb-[2rem]">Sucursales</h2>
    <p className="bg-ct text-p-basico p-[1.8rem] text-[1.1rem] m-0 leading-6">
        Visita cualquiera de nuestras sucursales y vive la experiencia Elegance Studio: estilo, 
        cuidado y excelencia en cada detalle. Encuentra tu sucursal más cercana y reserva tu cita hoy mismo.
    </p>
    {/* Contenedor del mapa */}
    <div id="map" className="w-full h-[40vh] my-[0.8rem] relative"></div>

    {/* Tarjetas de sucursales */}
    <div className="lg:absolute lg:bottom-[-8rem] 2xl:bottom-[-7rem] lg:left-1/2 lg:transform lg:-translate-x-1/2 z-20 w-[100%]">
        <div className="lg:flex flex-wrap justify-center xl:py-4 xl:px-6 xl:space-x-4">
            {branch.map((branch) => (
                <div
                    key={branch.id}
                    onClick={() => handleBranchClick(branch.coordinates as [number, number])}
                    className="lg:w-[40%] xl:w-[21%] lg:m-[.5rem] 2xl:p-4  lg:p-[.2rem] p-1 bg-ct cursor-pointer hover:bg-main transition lg:rounded-lg shadow-sombra"
                >
                    <h3 className="xl:my-2 lg:p-[.2rem]  text-lg font-bold text-p-basico text-center lg:text-left">{branch.name}</h3>
                    <p className="xl:my-2 lg:p-[.2rem]  text-sm text-p-basico text-center lg:text-left">{branch.description}</p>
                    <p className="xl:my-2 lg:p-[.2rem]  text-sm text-p-basico text-center lg:text-left">Teléfono: {branch.phone}</p>
                </div>
            ))}
        </div>
    </div>
</article>

    );
};

export default BranchesComponent;
