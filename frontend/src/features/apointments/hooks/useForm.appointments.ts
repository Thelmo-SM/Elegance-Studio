import { useState } from "react"
import { appointmentsTypes, validateValueType } from "@/types/appointmentsTypes";
//import { validateFormAppointments } from "../helpers/validateForm.appointments";

 

export const useFormAppointments = (initielValue: appointmentsTypes, validateValue:validateValueType) => {
const [form, setForm] = useState(initielValue);
const [errors, setErrors] = useState<Partial<appointmentsTypes>>({})

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;

    setForm((newForm) => ({
        ...newForm,
        [name]: value
    }));
    console.log("Valor del campo actualizado:", { [name]: value });
    }

    const handleBlur = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;

        const validationErrors = validateValue({...form, [name]: value});

        setErrors((unError) => ({
            ...unError,
            [name as keyof appointmentsTypes]: validationErrors[name as keyof appointmentsTypes]
        }))
        

    }
    
    return {
        form,
        errors,
        handleChange,
        handleBlur
    }
 }