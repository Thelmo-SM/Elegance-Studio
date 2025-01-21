import Link from "next/link";
import { InputForm, LabelForm, ButtonForm } from "../ui";

export const RegisterClient = () => {
    return (
        <article>
            <div className="bg-black h-[16rem] relative">
                <h1 className="text-[3rem] font-bold text-white absolute bottom-[2rem] left-[7rem] sm:bg-red-300 md:bg-black">¡Registrate!</h1>
            </div>

            <div className="w-[45rem] mx-auto mt-[1rem]"> 
                <p className="bg-caja2 p-[1rem] text-p-basico leading-6 text-[1.2rem] rounded-[.2rem]">Regístrate y accede a una experiencia personalizada:
                     reserva tus citas con facilidad, compra productos exclusivos
                      para el cuidado de tu estilo y recibe ofertas únicas diseñadas
                       especialmente para ti</p>

                <form action="" className="flex flex-col sm:flex-row p-2 w-full mx-auto mt-4">
                    <div className="w-full mr-4 ">


                    {/*Name*/}
                    <div className=" my-2 flex flex-col">
                        <LabelForm>Nombre</LabelForm>
                        <InputForm />
                    </div>

                    {/*Email*/}
                    <div className="my-2 flex flex-col">
                        <LabelForm>Correo electrónico</LabelForm>
                        <InputForm />
                    </div>

                    {/*Password*/}
                    <div className="my-2 flex flex-col">
                        <LabelForm>Contraseña</LabelForm>
                        <InputForm />
                    </div>

                    {/*Confirm Password*/}
                    <div className="my-2 flex flex-col">
                        <LabelForm>Confirmar contraseña</LabelForm>
                        <InputForm />
                    </div>
                    </div>



                    <div className="flex flex-col w-full ml-4">
                    {/*last name*/}
                    <div className="my-2 flex flex-col">
                        <LabelForm>Apellido</LabelForm>
                        <InputForm />
                    </div>

                    {/*Phone*/}
                    <div className="my-2 flex flex-col">
                        <LabelForm>Teléfono</LabelForm>
                        <InputForm />
                    </div>
                    <ButtonForm>Registrarse</ButtonForm>
                    </div>
                </form>
                <p className="text-caja3 text-center text-[1.8rem] pb-[4.4rem] pt-4">
                ¿ya tienes cuenta? <Link href='/login' className="text-p-basico font-bold">Inicia sesión</Link>
                </p>
            </div>
        </article>
    )
};

export default RegisterClient;