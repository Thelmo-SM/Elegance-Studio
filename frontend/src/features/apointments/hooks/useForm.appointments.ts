// hooks/useForm.appointments.ts
import { useState } from "react";
import { appointmentsTypes, validateValueType } from "@/types/appointmentsTypes";
import { createAppointment } from "../services/create.appointments";
import { useAuth } from "@/store/User.context";

export const useFormAppointments = (
  initialValue: appointmentsTypes,
  validateValue: validateValueType
) => {
  const [form, setForm] = useState(initialValue);
  const [errors, setErrors] = useState<Partial<appointmentsTypes>>({});
  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(false);
  const { user } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log("Valor del campo actualizado:", { [name]: value });
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const validationErrors = validateValue({ ...form, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name as keyof appointmentsTypes],
    }));
  };

  const register = (field: keyof appointmentsTypes) => ({
    name: field,
    value: form[field] || "",
    onChange: handleChange,
    onBlur: handleBlur,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    const error = validateValue(form);
    setErrors(error);
    e.preventDefault();

    if (Object.keys(error).length > 0) {
      console.log("Errores en el formulario:", error);
      alert('Hay errores')
      return;
    }

    const appointmentData = {
      branch: form.branch,
      haircut: form.haircut,
      //BeardTrimming: form.BeardTrimming,
      date: form.date,
      hour: form.hour,
      barber: form.barber,
     // dyeHair: form.dyeHair,
      userId: user?.uid,
    };
    try {

      setLoading(true);
      const response = await createAppointment(appointmentData);
      //setTimeout(() => {
        setResSuccess(true);
      //}, 5000)
      console.log(response);
      //setForm(initialValue);
      //closeModal();
    } catch (error) {
      if (error === 'auth/invalid-credential') {
        alert('Las credenciales proporcionadas no son válidas. Verifica tus datos e inténtalo de nuevo.');
      } else {
        alert('Ocurrió un error inesperado, por favor inténtalo más tarde.');
      }
      console.log("Error al enviar los datos:", error);
    } finally {
      setLoading(false);
            setTimeout(() => {
              setResSuccess(false);
              }, 2000)
    }

  };

  return {
    form,
    errors,
    loading,
    resSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    register, // Agregamos register para usarlo en el formulario
  };
};
