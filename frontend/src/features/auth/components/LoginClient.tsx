import Image from "next/image";
import Link from "next/link";
import googleLogo from '../../../../public/Icons/google-logo-9834.png';
import { InputForm, LabelForm, ButtonForm } from "../ui";

export const LoginClient = () => {
    return (
        <article >
        <div className="bg-black h-[16rem] relative">
            <h1 className="text-[3rem] font-bold text-white absolute bottom-[2rem] left-[7rem]">¡Inicia Sesión!</h1>
        </div>

        <div className="w-[45rem] mx-auto mt-[44px]"> 
            <p className="bg-caja2 p-[1rem] text-p-basico leading-6 text-[1.2rem] rounded-[.2rem]">
                Accede a tu cuenta para gestionar tus citas, revisar tus pedidos y descubrir nuestras últimas ofertas
            </p>

            <form action="" className="flex p-2 w-[100%] mx-auto">
            <div className="w-full mr-4">

                {/*Email*/}
                <div className="my-2 flex flex-col">
                    <LabelForm>Correo electrónico</LabelForm>
                    <InputForm />
                </div>
                <ButtonForm className="bg-caja2 text-p-basico py-[.8rem] w-full mt-[1rem] rounded-[.2rem]">
                    <Image 
                    src={googleLogo} 
                    width={100} 
                    height={20} 
                    alt="Google"
                    className="mx-auto"
                    />
                </ButtonForm>
            </div>

            <div className="w-full mr-4">
                 {/*Password*/}
                 <div className="my-2 flex flex-col">
                    <LabelForm>Contraseña</LabelForm>
                    <InputForm />
                </div>
                <ButtonForm className="bg-caja2 text-p-basico text-[2.2rem] py-[1rem] w-full mt-[1rem] rounded-[.2rem]">Registrarse</ButtonForm>
            </div>
            </form>
            <p className="text-caja3 text-center text-[1.8rem] mt-[2.4rem]">
        ¿Aún no tienes cuenta? <Link href='/register' className="text-p-basico font-bold">Regístrate aquí </Link> 
        y comienza tu experiencia en Elegance Studio
        </p>
        </div>
    </article>
    )
}

export default LoginClient;