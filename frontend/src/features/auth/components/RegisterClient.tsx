'use client';

import { useCreateUser } from "../hooks/useCreateUser";
import Link from "next/link";
import { InputForm, LabelForm, ButtonForm } from "../ui";
import { userTypes } from "@/types/userTypes";
import { velidateCreateUser } from "../helpers/validateForm";


const initialValue: userTypes = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
}

export const RegisterClient = () => {
    const {
        form,
        errors,
        handleChange,
        handleBlur
    } = useCreateUser(initialValue, velidateCreateUser);

    return (
        <article>
            <div className="bg-black h-[16rem] relative">
                <h1 className="text-[2.25rem] lg:text-[3rem] font-bold text-white absolute bottom-[2rem] lg:left-[7rem] left-[1rem]">
                    ¡Registrate!
                </h1>
            </div>

            <div className="md:w-[50%] mx-auto mt-[1rem]"> 
                <p className="bg-caja2 p-[1rem] text-p-basico md:leading-6 leading-10 md:text-[1.2rem] text-[1.2rem] text-center md:text-left rounded-[.2rem]">Regístrate y accede a una experiencia personalizada:
                     reserva tus citas con facilidad, compra productos exclusivos
                      para el cuidado de tu estilo y recibe ofertas únicas diseñadas
                       especialmente para ti</p>

                <form action="" className="flex flex-col md:flex-row p-2 md:w-full w-[89%] mx-auto mt-4">
                    <div className="w-full mr-4 ">


                    {/*Name*/}
                    <div className=" my-2 flex flex-col">
                        <LabelForm>Nombre</LabelForm>
                        <InputForm
                        name = 'name'
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.name && <p className="text-error">{errors.name}</p> }
                    </div>

                    {/*Email*/}
                    <div className="md:my-2 flex flex-col">
                        <LabelForm>Correo electrónico</LabelForm>
                        <InputForm
                        name = 'email'
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         />
                         {errors.email && <p className="text-error">{errors.email}</p> }
                    </div>

                    {/*Password*/}
                    <div className="my-2 flex flex-col">
                        <LabelForm>Contraseña</LabelForm>
                        <InputForm 
                        name = 'password'
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.password && <p className="text-error">{errors.password}</p> }
                    </div>

                    {/*Confirm Password*/}
                    <div className="my-2 flex flex-col">
                        <LabelForm>Confirmar contraseña</LabelForm>
                        <InputForm 
                        name = 'confirmPassword'
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.confirmPassword && <p className="text-error">{errors.confirmPassword}</p> }
                    </div>
                    </div>



                    <div className="flex flex-col w-full md:ml-4">
                    {/*last name*/}
                    <div className="my-2 flex flex-col">
                        <LabelForm>Apellido</LabelForm>
                        <InputForm 
                        name = 'lastName'
                        value={form.lastName}
                        onChange={handleChange}
                        />
                        {errors.lastName && <p className="text-error">{errors.lastName}</p> }
                    </div>

                    {/*Phone*/}
                    <div className="my-2 flex flex-col">
                        <LabelForm>Teléfono</LabelForm>
                        <InputForm 
                        name = 'phone'
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.phone && <p className="text-error">{errors.phone}</p> }
                    </div>
                    <ButtonForm
                        type="submit"
                        disabled={
                            !form.name.trim() ||
                            !form.lastName.trim() ||
                            !form.email.trim() ||
                            !form.password.trim() ||
                            !form.confirmPassword.trim() ||
                            !form.phone.trim()
                        }
                        customClass={
                            Object.values(form).every((value) => value.trim() !== "") && Object.keys(errors).length > 0
                            ? 'bg-caja2'
                            : 'cursor-not-allowed bg-desabilited'
                        }
                    >
                        Registrarse
                    </ButtonForm>
                    </div>
                </form>
                <p className="text-caja3 text-center text-[1.2rem] lg:text-[2rem] pb-[4.4rem] pt-4">
                ¿ya tienes cuenta? <Link href='/login' className="text-p-basico font-bold border-b-2">Inicia sesión</Link>
                </p>
            </div>
        </article>
    )
};

export default RegisterClient;