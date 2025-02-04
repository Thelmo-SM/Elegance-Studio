import { appointmentsTypes } from "@/types/appointmentsTypes";

export const validateFormAppointments = (form:appointmentsTypes)=> {
    const errors:Partial<appointmentsTypes> = {};

    if(!form.branch.trim()) {
        errors.branch = 'Este campo es obligatorio';
    }

   // if(!form.BeardTrimming.trim()) {
   //     errors.BeardTrimming = 'Este campo es obligatorio';
   // }

    if(!form.barber.trim()) {
        errors.barber = 'Este campo es obligatorio';
    }

    if(!form.date.trim()) {
        errors.date = 'Este campo es obligatorio';
    }

   // if(!form.dyeHair.trim()) {
   //     errors.dyeHair = 'Este campo es obligatorio';
   // }

    if(!form.haircut.trim()) {
        errors.haircut = 'Este campo es obligatorio';
    }

    if(!form.hour.trim()) {
        errors.hour = 'Este campo es obligatorio';
    }

    return errors;
}