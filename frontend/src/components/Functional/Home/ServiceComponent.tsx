import Image from "next/image";
import img1 from '../../../../public/Landing/nuestroCompromiso-img-1.webp';
import img2 from '../../../../public/Landing/nuestroCompromiso-img-2.webp';
//import img3 from '../../../public/Landing/nuestroCompromiso-img-3.jpg';
//import img4 from '../../../public/Landing/nuestroCompromiso-img-4.jpg';


export const ServiceComponent = () => {

    return (
        <article className=" mx-auto py-10">
        <h2 className="text-[1.8rem] font-bold text-center lg:text-left">Nuestro Compromiso</h2>
        <p className="text-[1.1rem] my-[1.8rem] leading-10 text-center lg:text-left">En <span className="font-bold">Elegance Studio</span>, nos dedicamos a ofrecer una experiencia única
             y personalizada. Cuidamos tu imagen con profesionalismo, adaptándonos
              a tu estilo con dos opciones perfectas para ti.</p>
              <div className="flex flex-col items-center lg:flex-row">
                <Image src={img1} width={400} height={400} alt="Nuestro Compromiso" loading="lazy" className="h-[20%]"/>
                <div className="lg:ml-[7rem] w-[90%] lg:w-[100%] text-center lg:text-left pt-[4rem] lg:pt-0">
                    <h3 className="text-[1.5rem] font-bold">Cortes Predefinidos</h3>

                    <p className="text-[1.1rem] mt-[1.1rem] mb-[3rem] leading-6">Para aquellos que prefieren opciones modernas y elegantes sin complicaciones
                        , hemos seleccionado cortes icónicos que garantizan resultados impecables.</p>

                    <h3 className="text-[1.5rem] font-bold">Cortes Personalizados</h3>

                    <p className="text-[1.1rem] mt-[1.1rem] mb-[3rem] leading-6">Si buscas un look exclusivo que refleje tu personalidad, trabajaremos contigo
                         para crear un estilo único y a medida.</p>

                         <h3 className="text-[1.5rem] font-bold">Profesionalismo y Experiencia</h3>

                    <p className="text-[1.1rem] mt-[1.1rem] leading-6">Contamos con un equipo de expertos altamente capacitados que trabajan con pasión y 
                        dedicación para ofrecer resultados impecables en cada visita.</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-[5rem] w-full h-[20rem]"
              style={{
                backgroundImage: "url('/Landing/nuestroCompromiso-img-5.webp')",
            }}>
                <h3 className="text-p-basico my-[1.8rem] text-[1.8rem] font-bold text-center">Responsabilidad y Confianza</h3>
               <p className="text-p-basico my-[1.8rem] text-[1.25rem] lg:w-[60%] text-center leading-10">Nos comprometemos a ser transparentes, cumplir con tus 
                expectativas y garantizar que cada experiencia sea memorable y sin preocupaciones.</p>
              </div>

              <div className="flex mt-[5rem] flex-col items-center lg:flex-row">
                <div className="lg:mr-[5rem] text-center lg:text-left mb-[5rem] lg:mb-0">
                    <h3 className="text-[1.5rem] font-bold">Calidad Inigualable</h3>

                    <p className="text-[1.1rem] mt-[1.1rem] mb-[3rem] leading-6">Nos esforzamos por ofrecer servicios d
                        e la más alta calidad utilizando productos premium y técnicas avanzadas. Cada detalle de tu experiencia está diseñado para superar tus expectativas.</p>

                    <h3 className="text-[1.5rem] font-bold">Innovación Constante</h3>

                    <p className="text-[1.1rem] mt-[1.1rem] mb-[3rem] leading-6">En Elegance Studio, estamos siempre actualizados con las últimas tendencias y técnicas para 
                        asegurarnos de que luzcas tu mejor versión.</p>
                </div>
               <Image src={img2} width={400} height={400} alt="Calidad Inigualable" loading="lazy"/>
                {/*<Image src={img3} width={400} height={400} alt="Responsabilidad y Confianza" loading="lazy" />*/}
              </div>
             
              <div className="flex mt-[5rem]">
                <div className="lg:mr-[5rem] text-center lg:text-left">
                    <h3 className="text-[1.5rem] font-bold"> Ambiente Cálido y Sofisticado</h3>

                    <p className="text-[1.1rem] mt-[1.1rem] mb-[3rem] leading-6 lg:w-[50rem]">Creamos un espacio donde puedes relajarte y disfrutar mientras 
                        te cuidamos. Elegance Studio es más que una barbería, es tu lugar para desconectar y renovar tu imagen.</p>

                        <h3 className="text-[1.5rem] font-bold">Atmósfera Acogedora</h3>

                    <p className="text-[1.1rem] mt-[1.1rem] leading-6">Música suave, iluminación cálida y un aroma característico que te invita a relajarte mientras te cuidamos.</p>
                </div>
                {/*<Image src={img4} width={550} height={750} alt="Ambiente Cálido y Sofisticado" 
                className="w-full" loading="lazy"/>*/}
              </div>
    </article>
    )
};

export default ServiceComponent;