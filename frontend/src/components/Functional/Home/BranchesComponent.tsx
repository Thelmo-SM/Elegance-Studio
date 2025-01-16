'use client';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef } from 'react';
import { branchesData } from '@/services/branchesData';

export const BranchesComponent = () => {
    const mapRef = useRef<maplibregl.Map | null>(null);

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
        branchesData.forEach((branch) => {
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
    }, []);

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
    <p className="bg-ct text-p-basico p-[1.8rem] text-[1.1rem] m-0">
        Visita cualquiera de nuestras sucursales y vive la experiencia Elegance Studio: estilo, 
        cuidado y excelencia en cada detalle. Encuentra tu sucursal más cercana y reserva tu cita hoy mismo.
    </p>
    {/* Contenedor del mapa */}
    <div id="map" className="w-full h-[40vh] my-[0.8rem] relative"></div>

    {/* Tarjetas de sucursales */}
    <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 z-20 w-[90%]">
        <div className="flex flex-wrap justify-center py-4 px-6 space-x-4">
            {branchesData.map((branch) => (
                <div
                    key={branch.id}
                    onClick={() => handleBranchClick(branch.coordinates as [number, number])}
                    className="p-4 bg-ct cursor-pointer hover:bg-main transition rounded-lg shadow-sombra"
                >
                    <h3 className="my-2 text-lg font-bold text-p-basico">{branch.name}</h3>
                    <p className="my-2 text-sm text-p-basico">{branch.description}</p>
                    <p className="my-2 text-sm text-p-basico">Teléfono: {branch.phone}</p>
                </div>
            ))}
        </div>
    </div>
</article>

    );
};

export default BranchesComponent;
