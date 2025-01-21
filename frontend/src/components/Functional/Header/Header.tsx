import Link from "next/link";
import Image from "next/image";
import Style from '../../../styles/Landing.module.css';

export const Header = () => {
    const logoSrc = '/Logo.png';

    return (
        <header className={`flex justify-between items-center p-2 px-14 fixed top-0 left-0 w-full z-[999] ${Style.bgScroll}`}>
            <Link href='/'>
            <Image src={logoSrc} width={35} height={42} alt="Elegance Studio" 
            className="ml-14 pt-4"/>
            </Link>


            <nav className="flex mr-10">
                <Link href='/' className="text-p-basico mx-6 my-auto hover:text-btR">Home</Link>
                {/*<Link href='/' className="text-p-basico mx-6 my-auto hover:text-btR">Tienda</Link>*/}
                <Link href='/' className="text-p-basico mx-6 my-auto hover:text-btR">Nosotros</Link>
                <Link href='/' className="text-p-basico mx-6 my-auto hover:text-btR">Citas</Link>
                <Link href='/login' 
                className="text-p-basico mx-6 my-auto bg-btR p-1 px-4 rounded-[0.25rem] hover:bg-ct transition duration-[200ms]">Acceso</Link>
            </nav>
        </header>
    )
}

export default Header;