'use client';

import Link from 'next/link';
import { useAuth } from '@/store/User.context';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();

    return (
            <div className="">
                <header className="bg-black h-[14rem] lg:h-[16rem] flex flex-col items-center justify-center">
                    <h2 className='mt-[4rem] text-p-basico text-center text-[1.5rem] md:text-[2.25rem] font-bold'>Panel de administración</h2>
                    <span className='text-p-basico md:my-[1.5rem] md:text-[1.4rem]'>Administrador: 
                        <strong className='text-pendiente'>{auth.user?.email}</strong>
                        </span>
                    <div>
                        { auth.user?.role === 'admin' && <nav className='mt-[1.2rem] border p-2'>
                            <Link href='/dashboard' className='text-p-basico mx-[1.5rem] p-2 hover:bg-caja3'>Citas</Link>
                           <Link href='/dashboard/users' className='text-p-basico mx-[1.5rem] p-2 hover:bg-caja3'>Usuarios</Link>
                            <Link href='/dashboard/barbers' className='text-p-basico mx-[1.5rem] p-2 rounded hover:bg-caja3'>Barberos</Link>
                        </nav>}
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

