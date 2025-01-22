import { useState } from "react";
import { loginTypes, loginErrors } from "@/types/userTypes";

export const useLogin = (initialForm: loginTypes, validateForm:(values:loginTypes) => loginErrors) => {
const [form, setForm] = useState(initialForm);
const [errors, setErrors] = useState<loginErrors>({});  

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value
        })

        console.log('valores del login: ', value);
    };

    const handleBlur = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof loginTypes; value: string };

        const fieldError = validateForm({...form,[name]:value});

        setErrors((unError) => ({
            ...unError,
            [name]:fieldError[name]
        })
    )
    }
    
    return {
        form,
        errors,
        handleChange,
        handleBlur
    }
};