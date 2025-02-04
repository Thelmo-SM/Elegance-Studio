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
    e.preventDefault();
    if(!form) {
      alert('Los campos deben de estar llenos antes de enviar')
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
      alert('Reserva exitosa');
      console.log(response);
      // Aquí podrías reiniciar el formulario o notificar al usuario
    } catch (error) {
      console.log("Error al enviar los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
    register, // Agregamos register para usarlo en el formulario
  };
};
