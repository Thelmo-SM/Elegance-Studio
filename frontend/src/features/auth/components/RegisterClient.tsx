'use client';

import { useCreateUser } from "../hooks/useCreateUser";
import Link from "next/link";
import { ButtonForm, InputUi, LabelUi } from "@/components/Ui";
import { userTypes } from "@/types/userTypes";
import { velidateCreateUser } from "../helpers/validateForm";
import Loading from "@/components/Ui/Loading/loading";


const initialValue: userTypes = {
    uid: '',
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
        loading,
        handleChange,
        handleBlur,
        handleSubmit
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

                <form action="" className="flex flex-col md:flex-row p-2 md:w-full w-[89%] mx-auto mt-4" onSubmit={handleSubmit}>
                    <div className="w-full mr-4 ">


                    {/*Name*/}
                    <div className=" my-2 flex flex-col">
                        <LabelUi>Nombre</LabelUi>
                        <InputUi
                        name = 'name'
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.name && <p className='bg-red-600 text-p-basico w-[100%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.name}</p> }
                    </div>

                    {/*Email*/}
                    <div className="md:my-2 flex flex-col">
                        <LabelUi>Correo electrónico</LabelUi>
                        <InputUi
                        type="email"
                        name = 'email'
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         />
                         {errors.email && <p className='bg-red-600 text-p-basico w-[100%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.email}</p> }
                    </div>

                    {/*Password*/}
                    <div className="my-2 flex flex-col">
                        <LabelUi>Contraseña</LabelUi>
                        <InputUi 
                        type="password"
                        name = 'password'
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.password && <p className='bg-red-600 text-p-basico w-[100%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.password}</p> }
                    </div>

                    {/*Confirm Password*/}
                    <div className="my-2 flex flex-col">
                        <LabelUi>Confirmar contraseña</LabelUi>
                        <InputUi 
                        type="password"
                        name = 'confirmPassword'
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.confirmPassword && <p className='bg-red-600 text-p-basico w-[100%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.confirmPassword}</p> }
                    </div>
                    </div>



                    <div className="flex flex-col w-full md:ml-4">
                    {/*last name*/}
                    <div className="my-2 flex flex-col">
                        <LabelUi>Apellido</LabelUi>
                        <InputUi 
                        name = 'lastName'
                        value={form.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.lastName && <p className='bg-red-600 text-p-basico w-[100%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.lastName}</p> }
                    </div>

                    {/*Phone*/}
                    <div className="my-2 flex flex-col">
                        <LabelUi>Teléfono</LabelUi>
                        <InputUi
                        name = 'phone'
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.phone && <p className='bg-red-600 text-p-basico w-[100%] pl-[2rem] py-[.2rem] my-[.2rem] rounded'>{errors.phone}</p> }
                    </div>
                    <ButtonForm
                            type="submit"
                            disabled={
        // Deshabilitar si algún campo está vacío o si hay errores
                             !form.name.trim() ||
                             !form.lastName.trim() ||
                             !form.email.trim() ||
                             !form.password.trim() ||
                             !form.confirmPassword?.trim() ||
                             !form.phone.trim() ||
                             Object.values(errors).some((error) => error) // Deshabilitar si hay errores
                            }
                            customClass={
        // Activar si todos los campos están completos y no hay errores
                             Object.values(form).every((value) => value.trim() !== "") &&
                             Object.values(errors).every((error) => !error)
                             ? 'cursor-not-allowed bg-desabilited' // Deshabilitado si algún campo está vacío o hay errores
                             : 'bg-caja2' // Activo si todos los campos están completos y no hay errores
                            }
                        >
                        {loading ? <Loading /> : 'Registrarse'}
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