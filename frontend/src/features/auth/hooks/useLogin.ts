import { useState } from "react";
import { loginTypes, loginErrors } from "@/types/userTypes";
import { loginUser } from "../services/loginUser";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await loginUser(form);

        console.log('Enviando datos...');
        console.log(response)

        return response;
    }
    
    return {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    }
};