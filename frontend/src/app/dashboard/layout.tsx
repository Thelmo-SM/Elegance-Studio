'use client';

import Link from 'next/link';
import { useAuth } from '@/store/User.context';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();

    return (
            <div className="">
                <header className="bg-black h-[16rem] flex flex-col items-center justify-center">
                    <h2 className='mt-[4rem] text-p-basico text-center text-[2.25rem] font-bold'>Panel de administración</h2>
                    <span className='text-p-basico my-[1.5rem] text-[1.4rem]'>Administrador: {auth.user?.email}</span>
                    <div>
                        <nav className='mt-[1.2rem]'>
                           { auth.user?.role === 'admin' && <Link href='/dashboard/users' className='text-p-basico mx-[1.5rem]'>
                            Usuarios
                            </Link>}
                            <Link href='' className='text-p-basico mx-[1.5rem]'>Citas</Link>
                            {auth.user?.role === 'admin' && <Link href='' className='text-p-basico mx-[1.5rem]'>Barberos</Link>}
                        </nav>
                    </div>
                </header>
                
                {/* Contenido principal */}
                <main className="p-4 overflow-auto">
                    {children}
                </main>
            </div>
    );
};

export default AdminLayout;

