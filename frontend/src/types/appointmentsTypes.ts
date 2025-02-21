export type appointmentsTypes = {
  id?: string;      // Este campo no se envía desde el formulario.
  branch: string;
  haircut: string;
  date: string;
  hour: string;
  barber: string;
  status?: string;
  createdAt?: string; // Este campo tampoco se envía.
  userId?: string;    // Este campo tampoco se envía.
  hidden?: boolean;
  hiddenBarbers?: boolean;
};


export interface AppointmentDetails {
    id: string;
    barber: string;
    branch: string;
    createdAt: string;
    date: string;
    haircut: string;
    hour: string;
    userId: string;
    status: string
    hidden?: boolean;
  }
  

export type validateValueType = (form: appointmentsTypes) => Partial<appointmentsTypes>;