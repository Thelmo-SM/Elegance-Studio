

import { appointmentsTypes } from '@/types/appointmentsTypes';

const DetailsAppointmets = ({ barber, branch,  createdAt, date, haircut, hour, status }: appointmentsTypes) => {

  return (
    <div>
        <ul>
              <li className="border-4 p-4 m-4 flex">
                <p><strong>Sucursal:</strong> {branch}</p>
                <p><strong>Corte:</strong> {haircut}</p>
                <p><strong>Fecha:</strong> {date}</p>
                <p><strong>Hora:</strong> {hour}</p>
                <p><strong>Barbero:</strong> {barber} </p>
                <p><strong>Realizaste esta cita el:</strong> {createdAt}</p>
                <p><strong>Estado:</strong> {status}</p>
              </li>
        </ul>
    </div>
  );
};

export default DetailsAppointmets;
