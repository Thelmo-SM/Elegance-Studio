import { serviceCarruselTypes } from "@/types/serviceCarruselTypes"

const serviceCarrusel: serviceCarruselTypes[] = [
    {
        id: 1,
        title: 'Corte de Cabello',
        discription: 'Corte clásico, moderno o a la medida',
        details: 'Asesoramiento profesional para encontrar el look ideal',
        information: 'Finalización con productos premium',
        img: '/Landing/Carrusel/img-1.jpg',
    },
    {
        id: 2,
        title: 'Afeitado Tradicional',
        discription: 'Una experiencia de lujo con técnicas tradicionales y productos de alta calidad',
        details: 'Toallas calientes para mayor comodidad, Espuma y aceites esenciales para piel sensible',
        information: 'Finalización con loción refrescante',
        img: '/Landing/Carrusel/img-2.jpg',
    },
    {
        id: 3,
        title: 'Tratamiento Capilar',
        discription: 'Cuida tu cabello con tratamientos personalizados',
        details: 'Hidratación profunda, Tratamiento para cabello dañado o cuero cabelludo sensible',
        information: 'Uso de productos profesionales',
        img: '/Landing/Carrusel/img-3.jpg',
    }
];

export default serviceCarrusel;