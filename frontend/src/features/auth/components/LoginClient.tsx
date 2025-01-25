'use client';

import Image from "next/image";
import Link from "next/link";
import googleLogo from '../../../../public/Icons/google-logo-9834.png';
import { InputForm, LabelForm, ButtonForm } from "../ui";
import { useLogin } from "../hooks/useLogin";
import { loginTypes } from "@/types/userTypes";
import { validateLogin } from "../helpers/validateForm";



const initialForm: loginTypes = {
    email: '',
    password: ''
}

export const LoginClient = () => {
    const {
        form,
        errors,
        handleChange,
        handleBlur
    } = useLogin(initialForm, validateLogin);
    return (
        <article className="mx-auto">
        <div className="bg-black h-[16rem] relative">
            <h1 className="text-[2.25rem] lg:text-[3rem] font-bold text-p-basico absolute bottom-[2rem] lg:left-[7rem] left-[1rem]">¡Inicia Sesión!</h1>
        </div>

        <div className="xl:w-[50%]  mx-auto mt-[1rem] border-4 lg:w-[70%]"> 
            <p className="bg-caja2 p-[1rem] text-p-basico md:leading-6 leading-10 md:text-[1.2rem] text-[1.2rem] text-center md:text-left trounded-[.2rem] m-auto  w-[100%]">
                Accede a tu cuenta para gestionar tus citas, revisar tus pedidos y descubrir nuestras últimas ofertas
            </p>

            <form action="" className="flex p-2 w-[90%] md:w-[100%] mx-auto flex-col">
            <div className="w-full mr-4">
                <div className="flex flex-col md:flex-row">


                {/*Email*/}
                <div className="my-2 flex flex-col w-full md:mr-[1rem]">
                    <LabelForm>Correo electrónico</LabelForm>
                    <InputForm 
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.email && <p className="text-error">{errors.email}</p> }
                    
                </div>

                    {/*Password*/}
                    <div className="my-2 flex flex-col w-full md:ml-[1rem]">
                    <LabelForm>Contraseña</LabelForm>
                    <InputForm 
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.password && <p className="text-error">{errors.password}</p> }
                </div>
            </div>
            </div>


            <div className="w-full mr-4">
            <div className="flex flex-col md:flex-row">

                <button className="lg:py-[1.5rem] mb-[1rem] lg:mb-0 bg-caja2 text-[2.2rem] py-[1rem] w-full rounded-[.2rem] mt-auto md:mr-[1rem]">
                    <Image 
                    src={googleLogo} 
                    width={100} 
                    height={20} 
                    alt="Google"
                    className="mx-auto"
                    />
                </button>
                <ButtonForm
                type="submit"
                disabled={
                    !form.email.trim() ||
                    !form.password.trim()
                }
                customClass={
                    Object.values(form).every((value) => value.trim() !== "") && Object.keys(errors).length > 0
                    ? 'bg-caja2'
                    : 'cursor-not-allowed bg-desabilited'
                }
                >
                    Iniciar Seción
                </ButtonForm>
            </div>
            </div>



            </form>
            <p className="text-caja3 text-center text-[1.2rem] pb-[3rem] lg:text-[2rem] md:text-[1.8rem] mt-[2.4rem] w-[80%] mx-auto md:w-full leading-10">
        ¿Aún no tienes cuenta? <Link href='/register' className="text-p-basico font-bold border-b-2 ">Regístrate aquí </Link> 
        y comienza tu experiencia en Elegance Studio
        </p>
        </div>
    </article>
    )
}

export default LoginClient;