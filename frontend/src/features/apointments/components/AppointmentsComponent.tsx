


export const AppointmentsComponent = () => {

    return (
        <section>
            <article className="h-[30rem] relative w-full bg-[url('/portada-citas.webp')] bg-cover bg-center">
            <div className="lg:w-[52%] absolute lg:top-1/1 lg:left-1/3 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/5 overlay mt-[15rem] lg:mt-0 md:-translate-x-1/2 md:left-1/2">
                <h2 className="text-p-basico lg:pt-[10rem] text-center lg:text-left font-bold text-[2.25rem] mb-10">Citas</h2>
                <p className="text-p-basico text-[1.1rem] text-center lg:text-left">
                    Elige el día y hora que mejor se adapte a ti y disfruta de 
                    nuestros servicios exclusivos. ¡Te esperamos!
                </p>
                <button
                        className="shadow-sombra text-p-basico bg-btR py-3 px-8 rounded-[0.25rem] mt-[1rem] md:mt-[5rem] hover:bg-ct transition duration-[200ms] flex items-center justify-center mx-auto lg:mx-0"
                        >
                        Agenda tu cita
                </button>
            </div>
            </article>
            <article>
                <p className="text-center pt-10">No tienes citas pendientes</p>
            </article>
        </section>
    )
}

export default AppointmentsComponent;