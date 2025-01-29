import { useState } from "react"
import { appointmentsTypes, validateValueType } from "@/types/appointmentsTypes";
import { createAppointment } from "../services/create.appointments";
//import { validateFormAppointments } from "../helpers/validateForm.appointments";
import { useAuth } from "@/store/User.context";

 

export const useFormAppointments = (initielValue: appointmentsTypes, validateValue:validateValueType) => {
const [form, setForm] = useState(initielValue);
const [errors, setErrors] = useState<Partial<appointmentsTypes>>({})
const [loading, setLoading] = useState(true);
const {user} = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm((newForm) => ({
        ...newForm,
        [name]: value
    }));
    console.log("Valor del campo actualizado:", { [name]: value });
    }

    const handleBlur = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target;

        const validationErrors = validateValue({...form, [name]: value});

        setErrors((unError) => ({
            ...unError,
            [name as keyof appointmentsTypes]: validationErrors[name as keyof appointmentsTypes]
        }))
        

    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const appointmentData = {
            branch: form.branch,
            haircut: form.haircut,
            BeardTrimming: form.BeardTrimming,
            date: form.date,
            hour: form.hour,
            barber: form.barber,
            dyeHair: form.dyeHair,
            userId: user?.uid
        }

        try {
            const response = await createAppointment(appointmentData);
            setLoading(true);
            console.log('Datos enviados: ', response);
        } catch (error) {
            console.log('Error al enviar los datos: ', error);
        } finally {
            setLoading(false);
        }

    }
    
    return {
        form,
        errors,
        loading,
        handleChange,
        handleBlur,
        handleSubmit
    }
 }