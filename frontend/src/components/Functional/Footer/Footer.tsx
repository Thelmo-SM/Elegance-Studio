import Image from 'next/image';

export const Footer = () => {
    const logoSrc = '/Logo.png';
    return (
        <footer className='flex flex-col items-center bg-black py-9'>
            <Image src={logoSrc} width={50} height={60} alt='Elegance Studio' className='mb-10'/>
            <p className='text-p-basico text-center w-[85%]'>
                <span className='font-bold'>Elegance Studio –</span> Donde estilo 
                y cuidado personal se unen. Nos apasiona brindar una experiencia única a cada 
                cliente, con servicios exclusivos que elevan tu imagen y bienestar. Síguenos en
                 redes sociales para mantenerte al tanto de nuestras novedades y promociones.
            </p>
            <hr className='border-t-4 border-p-basico w-[85%] my-8'/>
            <div className='flex '>
                <h3 className='text-p-basico mx-2 text-3xl font-bold'>linkedin</h3>
                <h3 className='text-p-basico mx-2 text-3xl font-bold'>Instagram</h3>
                <h3 className='text-p-basico mx-2 text-3xl font-bold'>GitHub</h3>
            </div>
            <p className='text-p-basico my-8 text-2xl text-center'>Elegance Studio | Todos los derechos reservados © 2025</p>
        </footer>
    )
}

export default Footer;