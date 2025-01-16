import Image from "next/image";
import img1 from '../../../../public/Landing/product-1.png';
import img2 from '../../../../public/Landing/product-img-2.png';

export const ProductsComponent = () => {

    return (
        <article className="bg-ct my-10 p-[5rem]">
            <div className="">
            <div className="flex justify-between items-center">
            <Image src={img1} width={900} height={1000} alt="wdswd"/>
            <div>
            <h2 className="mx-auto my-[3rem] text-[1.8rem] font-bold text-center">Products Component</h2>
                <p className="mx-auto text-center text-[1.1rem] mt-[1.1rem] leading-10 w-[80%]">Potencia tu barbería con nuestra línea de productos premium,
                     diseñados para profesionales que buscan calidad y resultados
                      excepcionales. Desde herramientas de precisión hasta
                       productos de cuidado especializados, en Elegance Studio
                        ofrecemos todo lo que necesitas para destacar en cada 
                        corte y afeitado.</p>
            </div>
            </div>

            <div className="flex justify-between items-center mt-[5rem]">
            <div>
            <h2 className="mx-auto my-[3rem] text-[1.8rem] font-bold text-center">Products Component</h2>
                <p className="mx-auto text-center text-[1.1rem] mt-[1.1rem] leading-10 w-[80%]">Potencia tu barbería con nuestra línea de productos premium,
                     diseñados para profesionales que buscan calidad y resultados
                      excepcionales. Desde herramientas de precisión hasta
                       productos de cuidado especializados, en Elegance Studio
                        ofrecemos todo lo que necesitas para destacar en cada 
                        corte y afeitado.</p>
            </div>
            <Image src={img2} width={900} height={1000} alt="wdswd"/>
            </div>
            </div>
        </article>
    );
};

export default ProductsComponent;