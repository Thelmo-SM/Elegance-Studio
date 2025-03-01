'use client';

import Image from "next/image";
import Link from "next/link";
import googleLogo from '../../../../public/Icons/google-logo-9834.png';
import { LabelUi, InputUi, ButtonForm } from "@/components/Ui";
import { useLogin } from "../hooks/useLogin";
import { loginTypes } from "@/types/userTypes";
import { validateLogin } from "../helpers/validateForm";
import Loading from "@/components/Ui/Loading/loading";



const initialForm: loginTypes = {
    email: '',
    password: ''
}

export const LoginClient = () => {
    const {
        form,
        errors,
        loading,
        errorMessage,
        success,
        handleChange,
        handleBlur,
        handleSubmit
    } = useLogin(initialForm, validateLogin);
    return (
        <article className="mx-auto">
        <div className="bg-black h-[10rem] lg:h-[16rem] relative">
            <h1 className="text-[2.25rem] lg:text-[3rem] font-bold text-p-basico absolute bottom-[2rem] lg:left-[7rem] left-[1rem]">¡Inicia Sesión!</h1>
        </div>

        <div className="xl:w-[50%]  mx-auto mt-[1rem] lg:w-[70%]"> 
            {errorMessage && <h3 className="bg-red-600 text-p-basico p-[2rem] text-center text-[1.5rem] rounded">{errorMessage}</h3>}
            {success && <div className=' flex flex-col justify-center bg-green-600'>
                    <p className='text-center text-[1.5rem] text-p-basico p-5'>¡Inicio de sesión exitoso! Redirigiendo</p> <Loading />
                </div>}
            <p className="bg-caja2 p-0 md:p-[1rem] text-p-basico md:leading-6 leading-7 md:text-[1.2rem] text-[1rem] text-center md:text-left trounded-[.2rem] m-0 md:m-auto  w-[100%]">
                Accede a tu cuenta para gestionar tus citas, revisar tus pedidos y descubrir nuestras últimas ofertas
            </p>

            <form action="" className="flex p-2 w-[90%] md:w-[100%] mx-auto flex-col" onSubmit={handleSubmit}>
            <div className="w-full mr-4">
                <div className="flex flex-col md:flex-row">


                {/*Email*/}
                <div className="m-0 md:my-2 flex flex-col w-full md:mr-[1rem]">
                    <LabelUi>Correo electrónico</LabelUi>
                    <InputUi 
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ej. ejemplo@correo.com"
                    />
                    {errors.email && <p className='bg-red-600 text-p-basico w-[100%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.email}</p> }
                    
                </div>

                    {/*Password*/}
                    <div className="m-0 md:my-2 flex flex-col w-full md:ml-[1rem]">
                    <LabelUi>Contraseña</LabelUi>
                    <InputUi 
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••••••••••"
                    />
                    {errors.password && <p className='bg-red-600 text-p-basico w-[100%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.password}</p> }
                </div>
            </div>
            </div>


            <div className="w-full mr-4">
            <div className="flex flex-col md:flex-row">
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
                {loading ? <Loading /> : 'Iniciar Seción'}
                </ButtonForm>

                <button className="h-[3rem] md:h-[5rem] lg:py-[1.5rem] mb-[1rem] lg:mb-0 bg-caja2 text-[2.2rem] py-[1rem] w-full rounded-[.2rem] mt-auto md:ml-[1rem] flex items-center justify-center">
                     <Image 
                       src={googleLogo} 
                       width={90} 
                       height={20} 
                       alt="Google"
                       className="w-[6rem] h-auto" 
                       loading="lazy"
                     />
            </button>
            </div>
            </div>



            </form>
            <p className="text-caja3 text-center text-[1rem] pb-[3rem] lg:text-[2rem] md:text-[1.8rem] mt-[2.4rem] w-[80%] mx-auto md:w-full leading-10">
        ¿Aún no tienes cuenta? <Link href='/register' className="text-p-basico font-bold border-b-2 ">Regístrate aquí </Link> 
        y comienza tu experiencia en Elegance Studio
        </p>
        </div>
    </article>
    )
}

export default LoginClient;