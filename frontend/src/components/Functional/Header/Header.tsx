'use client';

import Link from "next/link";
import Image from "next/image";
import menuImg from '../../../../public/Icons/lista.svg'
import Style from '../../../styles/Landing.module.css';
import { useState } from "react";

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const logoSrc = '/Logo.png';

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    return (
        <header className={`flex  flex-col lg:flex-row lg:justify-between items-center lg:px-14 fixed top-0 left-0 w-full z-[999] ${Style.bgScroll}`}>
            <Link href='/'>
            <Image src={logoSrc} width={35} height={42} alt="Elegance Studio" 
            className="lg:ml-14 lg:pt-4 py-4"/>
            </Link>

            <button className="lg:hidden text-p-basico font-bold absolute right-0 p-[2rem]"
            onClick={toggleMenu}
            >
                {menuOpen ? <h5 className="text-[2rem]">x</h5> : <Image src={menuImg} width={35} height={20} alt="Menú"/>}
            </button>

            <nav
                className={`${
                    menuOpen ? "block" : "hidden"
                } lg:flex flex flex-col lg:flex-row items-center justify-center w-full lg:w-auto py-4 lg:py-0 lg:mr-10 transition-all duration-300`}
            >
                <Link href='/' className="text-p-basico mx-6 lg:my-auto my-[2rem] text-[2rem] lg:text-[1rem] hover:text-btR">Home</Link>
                {/*<Link href='/' className="text-p-basico mx-6 my-auto hover:text-btR">Tienda</Link>*/}
                <Link href='/' className="text-p-basico mx-6 lg:my-auto my-[2rem] text-[2rem] lg:text-[1rem] hover:text-btR">Nosotros</Link>
                <Link href='/' className="text-p-basico mx-6 lg:my-auto my-[2rem] text-[2rem] lg:text-[1rem] hover:text-btR">Citas</Link>
                <Link href='/login' 
                className="text-[2rem] lg:text-[1rem] text-p-basico mx-6 my-auto bg-btR p-1 px-4 rounded-[0.25rem] hover:bg-ct transition duration-[200ms]">Acceso</Link>
            </nav>
        </header>
    )
}

export default Header;