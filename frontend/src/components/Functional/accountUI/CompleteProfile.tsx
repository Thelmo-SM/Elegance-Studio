'use client';

import Image from 'next/image';
import alert from '../../../../public/Icons/messageLogo/errorIcon.svg';
import { BranchesService } from "@/services/branchesService";
import { useUpdateBarber } from '@/features/barbers/hooks/useBarber';
import { useAuth } from '@/store/User.context';

export const CompleteProfile = () => {
  const { branch } = BranchesService();
  const { user } = useAuth();

  // Inicializar el hook con los valores del usuario
  const { form, errors, loading, success, handleChange, handleBlur, handleSubmit } = useUpdateBarber({
    uid: user?.uid || "",
    location: "",
    dni: "",
  });

  return (
    <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-caja3 shadow-sombra rounded">
      {!success ? <Image src={alert} width={70} height={70} alt="Alerta" className="mx-auto m-4" /> : ''}

      {!success ? <p className="bg-red-600 p-[1rem] text-p-basico">
        Antes de continuar, debes completar tu perfil. Ahora eres barbero en esta aplicación y, por tanto, tendrás acciones que los clientes no pueden realizar.
      </p> : <p className="bg-green-700 p-[1rem] text-p-basico leading-6">
      Los cambios se han realizado correctamente. Ahora puedes ejercer tu rol como <span>Barbero.</span>
      </p>}

      <form onSubmit={handleSubmit} className="mt-4 rounded">
        {/* Ubicación */}
        <label className="block mb-2 font-semibold text-p-basico">Ubicación</label>
        <select
          name="location"
          className="bg-caja2 py-[.5rem] px-[2rem] text-p-basico rounded w-full"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.location}
        >
          <option value="">Seleccionar</option>
          {branch.map((b) => (
            <option value={b.name} key={b.id}>{b.name}</option>
          ))}
        </select>
        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}

        {/* DNI */}
        <label className="block mt-4 mb-2 font-semibold text-p-basico">DNI</label>
        <input
          type="text"
          name="dni"
          className="w-full p-2 border rounded bg-caja2"
          placeholder="Ej: 001-1234567-8"
          value={form.dni}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-btR text-white py-2 rounded hover:bg-p-basico hover:text-black"
        >
          {loading ? "Guardando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
