import { useState } from "react";
import { loginTypes, loginErrors } from "@/types/userTypes";
import { loginUser } from "../services/loginUser";
import { useRouter } from "next/navigation";

export const useLogin = (initialForm: loginTypes, validateForm:(values:loginTypes) => loginErrors) => {
const [form, setForm] = useState(initialForm);
const [errors, setErrors] = useState<loginErrors>({});
const [loading, setLoading] = useState(false);

const router = useRouter();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value
        })

        //console.log('valores del login: ', value);
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
        setLoading(true)
        console.log('Enviando datos...');
        console.log(response);
        
        router.push('/');
    }
    
    return {
        form,
        errors,
        loading,
        handleChange,
        handleBlur,
        handleSubmit
    }
};