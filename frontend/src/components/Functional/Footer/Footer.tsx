import Image from 'next/image';
import GitHub from '../../../../public/GitHub.webp';
import Linkedin from '../../../../public/Linkedin.webp';
import Link from "next/link";

export const Footer = () => {
    const logoSrc = '/Logo.png';
    return (
        <footer className='flex flex-col items-center bg-black py-9 w-full'>
            <Image src={logoSrc} width={50} height={60} alt='Elegance Studio' className='mb-10' loading="lazy"/>
            <p className='text-p-basico text-center w-[85%]'>
                <span className='font-bold'>Elegance Studio –</span> Donde estilo 
                y cuidado personal se unen. Nos apasiona brindar una experiencia única a cada 
                cliente, con servicios exclusivos que elevan tu imagen y bienestar. Síguenos en
                 redes sociales para mantenerte al tanto de nuestras novedades y promociones.
            </p>
            <hr className='border-t-4 border-p-basico w-[85%] my-8'/>
            <div className='flex flex-col lg:flex-row'>
                <div className='mt-3 lg:mr-10 flex flex-col  items-center'>
                <Link href='https://github.com/Thelmo-SM' className='m-auto' target="_blank" rel="noopener noreferrer">
                <Image src={GitHub} width={100} height={100} alt='GitHub'className='m-auto'/>
                <p className='text-p-basico text-center mt-2 border-b'>GitHub</p>
                </Link>
                
                </div>
                <div className='mt-3 lg:ml-10 flex flex-col  items-center'>
                <Link href='https://www.linkedin.com/in/thelmo-sm/' className='m-auto' target="_blank" rel="noopener noreferrer">
                <Image src={Linkedin} width={100} height={100} alt='GitHub'className='m-auto'/>
                <p className='text-p-basico text-center mt-2 border-b'>Linkedin</p>
                </Link>
                
                </div>
            </div>
            <p className='text-p-basico my-8 text-2xl text-center'>Elegance Studio | Todos los derechos reservados © 2025</p>
        </footer>
    )
}

export default Footer;