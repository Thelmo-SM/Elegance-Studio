import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Eliminar la cookie "token" en el cliente
    const headers = new Headers();
    headers.set(
      'Set-Cookie',
      `token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    );
    return NextResponse.json({ message: 'Logout exitoso' }, { headers });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return NextResponse.json({ error: 'Hubo un problema al cerrar sesión' }, { status: 500 });
  }
}
