'use client';

import Link from "next/link";
import Image from "next/image";
import menuImg from '../../../../public/Icons/lista.svg'
import Style from '../../../styles/Landing.module.css';
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/store/User.context";
import AdminIcon from '../../../../public/Icons/Admin-icon.svg';
import UserIcon from '../../../../public/Icons/user-icon.svg';

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMenuNavOpen, setIsMenuNavOpen] = useState(false);
    const logoSrc = '/Logo.png';
    const auth = useAuth();
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Cerrar el menú cuando se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Cerrar el menú solo si el menú está abierto y se hace clic fuera de él
            if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false); // Cerrar el menú móvil
                setIsMenuNavOpen(false); // Cerrar el menú de navegación
            }
        };

        // Solo añadir el evento si el menú está abierto
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Limpiar el evento al desmontar
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    // Función para cerrar el menú al hacer clic en un enlace
    const handleLinkClick = () => {
        setMenuOpen(false); // Cerrar el menú en dispositivos móviles
        setIsMenuNavOpen(false); // Cerrar el menú desplegable
    };

    return (
        <header className={`flex flex-col lg:flex-row lg:justify-between items-center lg:px-14 fixed top-0 left-0 w-full z-[999] ${Style.bgScroll}`}>
            <Link href='/'>
                <Image src={logoSrc} width={35} height={42} alt="Elegance Studio" className="lg:ml-14 lg:pt-4 py-4" />
            </Link>

            <button
                className="lg:hidden text-p-basico font-bold absolute right-0 p-[2rem]"
                onClick={toggleMenu}
            >
                {menuOpen ? <h5 className="text-[2rem]">x</h5> : <Image src={menuImg} width={25} height={20} alt="Menú" />}
            </button>

            <nav
                className={`${
                    menuOpen ? "block" : "hidden"
                } lg:flex flex flex-col lg:flex-row items-center justify-center w-full lg:w-auto py-4 lg:py-0 lg:mr-10 transition-all duration-300`}
            >
                <Link href='/' onClick={handleLinkClick} className="text-p-basico mx-6 lg:my-auto my-[2rem] text-[1.3rem] lg:text-[1rem] hover:text-btR">Home</Link>
                <Link href='/' onClick={handleLinkClick} className="text-p-basico mx-6 lg:my-auto my-[2rem] text-[1.3rem] lg:text-[1rem] hover:text-btR">Nosotros</Link>
                {auth.user ? (
                    <Link href='/appointments' onClick={handleLinkClick} className="text-p-basico mx-6 lg:my-auto my-[2rem] text-[1.3rem] lg:text-[1rem] hover:text-btR">Citas</Link>
                ) : ''}
                {auth.user === null ? (
                    <Link
                        href='/login'
                        onClick={handleLinkClick}
                        className="text-[1.3rem] lg:text-[1rem] text-p-basico mx-6 my-auto bg-btR p-1 px-4 rounded-[0.25rem] hover:bg-ct transition duration-[200ms]"
                    >
                        Acceso
                    </Link>
                ) : (
                    <button
                        className="text-[1.3rem] lg:text-[1rem] text-p-basico mx-6 my-auto bg-btR p-1 px-4 rounded-[0.25rem] hover:bg-ct transition duration-[200ms]"
                        onClick={() => setIsMenuNavOpen(!isMenuNavOpen)} // Alterna el menú de navegación
                        >
                        {auth.user?.role === 'admin' && <Image src={AdminIcon} width={40} height={40} alt="Administrador" className="bg-btR rounded-[10%]" />}
                        {auth.user.role === 'client' && <Image src={UserIcon} width={40} height={40} alt="Administrador" className="bg-btR rounded-[10%]" />}
                    </button>
                )}

                {isMenuNavOpen && (
                    <div ref={menuRef} className="absolute right-0 bottom-[-3.5rem] mt-2 w-48 bg-btR text-gray-800 shadow-lg">
                        <ul>
                            <li>
                                <button
                                    onClick={() => {
                                        setIsMenuNavOpen(false); // Cierra el menú al hacer clic en "Perfil"
                                    }}
                                    className="w-full text-left p-2 hover:bg-caja hover:text-p-basico"
                                >
                                    Perfil
                                </button>
                            </li>
                            <li>
                            <button
                                    onClick={() => {
                                        setIsMenuNavOpen(false); // Cierra el menú al hacer clic en "Perfil"
                                    }}
                                    className="w-full text-left p-2 hover:bg-caja hover:text-p-basico"
                                >
                                    Dashboard
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        auth.logout();
                                        setIsMenuNavOpen(false); // Cierra el menú al hacer logout
                                    }}
                                    className="w-full text-left p-2 hover:bg-caja hover:text-p-basico"
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
