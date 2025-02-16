

import { appointmentsTypes } from '@/types/appointmentsTypes';

const DetailsAppointmets = ({ barber, branch,  createdAt, date, haircut, hour, status }: appointmentsTypes) => {

  return (
    <div>
        <ul>
              <li className="flex flex-wrap">
                <p className='my-[.5rem]  p-2 text-p-basico'><strong className='text-btR font-bold'>Sucursal:</strong> {branch}</p>
                <p className='my-[.5rem]  p-2 text-p-basico'><strong className='text-btR font-bold'>Barbero:</strong> {barber} </p>
                <p className='my-[.5rem]  p-2 text-p-basico'><strong className='text-btR font-bold'>Fecha:</strong> {date}</p>
                <p className='my-[.5rem]  p-2 text-p-basico'><strong className='text-btR font-bold'>Hora:</strong> {hour}</p>
                <p className='my-[.5rem]  p-2 text-p-basico'><strong className='text-btR font-bold'>Corte:</strong> {haircut}</p>
                <p className='my-[.5rem]  p-2 text-pendiente'><strong className='text-btR font-bold'>Estado:</strong> {status}</p>
                <p className='my-[.5rem]  p-2 text-p-basico'><strong className='text-btR font-bold'>Realizaste esta cita el:</strong> {createdAt}</p>
              </li>
        <button className='mr-2 rounded-sm bg-btR px-5 py-1 text-p-basico font-bold hover:bg-caja2 transition-colors duration-300'>Editar</button>
        <button className='ml-2 rounded-sm bg-error px-5 py-1 text-p-basico font-bold hover:bg-red-400 transition-colors duration-300'>Eliminar</button>
        <p className='text-p-basico bg-btR p-[1rem] mt-3 m-auto'><span className='font-bold'>Nota:</span>  Se dará una tolerancia de 10 minutos. Tras vencer este plazo, su cita será cancelada automáticamente.</p>
        </ul>
    </div>
  );
};

export default DetailsAppointmets;
