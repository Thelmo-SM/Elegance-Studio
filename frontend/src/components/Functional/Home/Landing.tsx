'use client';


import HomeComponent from "@/components/Functional/Home/HomeComponent";
import Style from '../../../styles/Landing.module.css'
import StyleMobile from '../../../styles/Landing.mobile.module.css';
import GlobalModal from "@/components/Ui/Modals/Global.modal";
import { useModalContext } from "@/store/Modal.context";
import ErrorIcon from '../../../../public/Icons/messageLogo/errorIcon.svg';
import Image from "next/image";
import { useEffect, useState } from "react";

const Landing = () => {
    const { isOpen, openModal, closeModal } = useModalContext();
    const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Establece el ancho de la ventana en el estado solo cuando el componente se haya montado en el cliente
    setWindowWidth(window.innerWidth);

    // Agrega un event listener para actualizar el ancho de la ventana cuando cambie
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Limpia el event listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <section className="relative">
      <article className={`bg-black p-6 min-h-[95vh] w-full flex flex-col justify-center relative background-container 
      ${
        windowWidth >= 1024 ? Style.backgroundContainer : StyleMobile.backgroundMobileContainer
      }
        `}>
        <div className={`lg:w-[52%] absolute lg:top-1/1 lg:left-1/3 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/5 overlay`}>
            <h1 className="text-p-basico text-[3.25rem] font-bold mb-10 lg:text-left text-center">Elegance Studio</h1>
            <p className="text-p-basico text-[1.3rem] lg:w-[80%] lg:text-left text-center w-[95%] m-auto lg:m-0">Nos esforzamos por crear un ambiente cómodo y acogedor, donde puedas
              relajarte y disfrutar de un servicio de calidad superior</p>
              <button
               className=" text-p-basico bg-btR py-3 px-8 rounded-[0.25rem] mt-[10rem] hover:bg-ct transition duration-[200ms] flex items-center justify-center mx-auto lg:mx-0"
               onClick={openModal}
               >Agenda tu cita</button>
         </div>
      </article>
      <HomeComponent />
      <GlobalModal isOpens={isOpen} closeModal={closeModal}>
      <div className="flex flex-col justify-center items-center h-[100%]">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-p-basico text-[3.25rem]">Debes <span  className="text-error font-bold">Iniciar Sesión</span> o <span className="text-error font-bold">Registrarte</span></h2>
          <p className="text-[1.8rem] w-[90%] text-center mt-[1.5rem]">Para agendar una cita, es necesario que estés registrado o inicies sesión
             en tu cuenta. Si aún no tienes una cuenta, regístrate en unos simples pasos</p>
          <Image src={ErrorIcon} width={150} height={150} alt="" className="mt-[2rem]"/>
        </div>
        </div>
      </GlobalModal>
    </section>
  );
};

export default Landing;