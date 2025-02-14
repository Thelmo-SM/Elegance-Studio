import { useState, useCallback } from "react";
import { barberTypes, ServiceBarberFunction } from "@/types/userTypes";
import { updateLocationAndDni } from "@/features/barbers/services/locationAndDNI"; // Asegúrate de que la ruta sea correcta
import { validateUserFields } from "@/features/barbers/helpers/validate.form";
//import { useRouter } from "next/navigation";
import { useAuth } from "@/store/User.context";

export const useUpdateBarber = (initialForm: barberTypes & { uid: string }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<ServiceBarberFunction>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  //const router = useRouter();
  const { refreshUser } = useAuth();

  // Manejar cambios en los inputs
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  // Validación cuando el usuario sale del input
  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target as { name: keyof barberTypes; value: string };
      const validationErrors = validateUserFields({ ...form, [name]: value });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationErrors[name],
      }));
    },
    [form]
  );

  // Enviar datos a Firestore
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      const finalErrors = validateUserFields(form);
      setErrors(finalErrors);

      if (Object.keys(finalErrors).length > 0) return;

      setLoading(true);
      
      try {
        await updateLocationAndDni(form.uid, form.location, form.dni);
        console.log("Datos actualizados correctamente");
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
      } finally {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          //return router.push('/dashboard');
          refreshUser()
        }, 1000)
      }
    },
    [form]
  );

  return {
    form,
    errors,
    loading,
    success,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
