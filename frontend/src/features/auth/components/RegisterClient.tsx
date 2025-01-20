export const RegisterClient = () => {
    return (
        <article >
            <div className="bg-black h-[16rem] relative">
                <h1 className="text-[3rem] font-bold text-white absolute bottom-[2rem] left-[7rem]">¡Registrate!</h1>
            </div>

            <div className="w-[45rem] mx-auto mt-[44px]"> 
                <p className="bg-caja2 p-[1rem] text-p-basico leading-6 text-[1.2rem]">Regístrate y accede a una experiencia personalizada:
                     reserva tus citas con facilidad, compra productos exclusivos
                      para el cuidado de tu estilo y recibe ofertas únicas diseñadas
                       especialmente para ti</p>

                <form action="" className="flex p-2 w-[100%] mx-auto">
                    <div className="w-full mr-4">


                    {/*Name*/}
                    <div className=" my-2 flex flex-col">
                        <label htmlFor="" className="text-p-basico text-[2rem] mt-[2.4rem]">Nombre</label>
                        <input type="text" name="" id="" className="bg-p-basico w-full mt-[0.5rem] h-[2rem]"/>
                    </div>

                    {/*Email*/}
                    <div className="my-2 flex flex-col">
                        <label htmlFor="" className="text-p-basico text-[2rem] mt-[2.4rem]">Correo electrónico</label>
                        <input type="text" name="" id="" className="bg-p-basico w-full mt-[0.5rem] h-[2rem]"/>
                    </div>

                    {/*Password*/}
                    <div className="my-2 flex flex-col">
                        <label htmlFor="" className="text-p-basico text-[2rem] mt-[2.4rem]">Contraseña</label>
                        <input type="text" name="" id="" className="bg-p-basico w-full mt-[0.5rem] h-[2rem]"/>
                    </div>

                    {/*Confirm Password*/}
                    <div className="my-2 flex flex-col">
                        <label htmlFor="" className="text-p-basico text-[2rem] mt-[2.4rem]">Confirmar contraseña</label>
                        <input type="text" name="" id="" className="bg-p-basico w-full mt-[0.5rem] h-[2rem]"/>
                    </div>
                    </div>



                    <div className="flex flex-col w-full ml-4">
                    {/*last name*/}
                    <div className="my-2 flex flex-col">
                        <label htmlFor="" className="text-p-basico text-[2rem] mt-[2.4rem]">Apellido</label>
                        <input type="text" name="" id="" className="bg-p-basico w-full mt-[0.5rem] h-[2rem]"/>
                    </div>

                    {/*Phone*/}
                    <div className="my-2 flex flex-col">
                        <label htmlFor="" className="text-p-basico text-[2rem] mt-[2.4rem]">Telefono</label>
                        <input type="text" name="" id="" className="bg-p-basico w-full mt-[0.5rem] h-[2rem]"/>
                    </div>
                    <button className="bg-caja2 text-p-basico text-[2.2rem] py-[1rem] w-full mt-auto">Registrarse</button>
                    </div>
                </form>
            </div>
        </article>
    )
};

export default RegisterClient;