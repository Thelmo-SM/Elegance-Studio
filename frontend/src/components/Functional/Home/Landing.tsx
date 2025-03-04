'use client';

//import HomeComponent from "@/components/Functional/Home/HomeComponent";
import Style from '../../../styles/Landing.module.css'
import StyleMobile from '../../../styles/Landing.mobile.module.css';
import GlobalModal from "@/components/Ui/Modals/Global.modal";
import { useModalContext } from "@/store/Modal.context";
import ErrorIcon from '../../../../public/Icons/messageLogo/errorIcon.svg';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/store/User.context";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import Loading from '@/components/Ui/Loading/loading';


const HomeComponent = dynamic(() => import('@/components/Functional/Home/HomeComponent'), {
    ssr: false,
    loading: () => <div className=' flex flex-col justify-center'>
        <p className='text-center text-[1.5rem] text-p-basico p-5'>Cargando</p> <Loading />
    </div>
})

const Landing = () => {
    const { isOpen, openModal } = useModalContext();
    const [windowWidth, setWindowWidth] = useState(0);
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (auth.user === null && isOpen) {
            setTimeout(() => router.push('/login'), 1800);
        } else if(auth.user && isOpen){
            router.push('/appointments');
        }
    }, [auth.user, isOpen, router]);

    return (
        <section className="relative w-full">
            <article className={`bg-black p-6 min-h-[95vh] flex flex-col justify-center relative background-container 
            ${windowWidth >= 1024 ? Style.backgroundContainer : StyleMobile.backgroundMobileContainer}
            `}>
                <div className={`lg:w-[52%] absolute lg:top-1/1 lg:left-1/3 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/5 overlay mt-[15rem] lg:mt-0`}>
                    <h1 className="text-p-basico text-[2.25rem] md:text-[3.25rem] font-bold mb-10 lg:text-left text-center">Elegance Studio</h1>
                    <p className="text-p-basico text-[1.3rem] lg:w-[80%] lg:text-left text-center w-[95%] m-auto lg:m-0">Nos esforzamos por crear un ambiente cómodo y acogedor, donde puedas relajarte y disfrutar de un servicio de calidad superior</p>
                        <button
                            className="text-p-basico bg-btR py-3 px-8 rounded-[0.25rem] mt-[5rem] md:mt-[10rem] hover:bg-ct transition duration-[200ms] flex items-center justify-center mx-auto lg:mx-0"
                            onClick={openModal}
                        >
                            {auth.user?.role === 'barber' ? 'Ver citas' : 'Agenda tu cita'}
                        </button>

                </div>
            </article>
           <HomeComponent />
            {auth.user === null && isOpen && (
                <GlobalModal isOpens={isOpen}>
                    <div className="flex flex-col justify-center items-center h-[100%]">
                        <div className="flex flex-col justify-center items-center">
                            <h2 className="text-p-basico lg:text-[3.25rem] text-[1.5rem] text-center">Debes <span className="text-error font-bold">Iniciar Sesión</span> o <span className="text-error font-bold">Registrarte</span></h2>
                            <p className="lg:text-[1.8rem] w-[90%] text-center mt-[1.5rem]">Para agendar una cita, es necesario que estés registrado o inicies sesión en tu cuenta. Si aún no tienes una cuenta, regístrate en unos simples pasos</p>
                            <Image src={ErrorIcon} width={150} height={150} alt="" className="mt-[2rem]" loading="lazy"/>
                        </div>
                    </div>
                </GlobalModal>
            )}
        </section>
    );
};

export default Landing;
