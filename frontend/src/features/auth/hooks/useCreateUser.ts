import { useState } from "react";
import { userTypes, FormErrors } from "@/types/userTypes";
{/*validateForm, hanledData*/}

export const useCreateUser = (initialForm: userTypes, validateForm:(values:userTypes) => FormErrors) => {
const [form, setForm] = useState(initialForm);;
const [errors, setErrors] = useState<FormErrors>({});
//console.log('capturas de datos: ', form);
console.log('errores: ', errors)
if(!errors) {
    console.log('no hay errores: ', errors)
}


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: keyof userTypes; value: string };

        const fieldError = validateForm({ ...form, [name]: value });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldError[name],
        }));
      };
      

    return {
        form,
        errors,
        handleChange,
        handleBlur
    }
}