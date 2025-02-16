import { useState, useEffect } from "react";
import { appointmentsTypes, validateValueType } from "@/types/appointmentsTypes";
import { createAppointment } from "../services/create.appointments";
import { getBarbers } from "@/features/barbers/services/get.barbers";
import { useAuth } from "@/store/User.context";


export type barbersTypes = {
  id: string;
  name: string;
  location: string;
};

export const useFormAppointments = (
  initialValue: appointmentsTypes,
  validateValue: validateValueType
) => {
  const [form, setForm] = useState(initialValue);
  const [errors, setErrors] = useState<Partial<appointmentsTypes>>({});
  const [loading, setLoading] = useState(false);
  const [resSuccess, setResSuccess] = useState(false);
  const [barbers, setBarbers] = useState<barbersTypes[]>([]);
  const [filteredBarbers, setFilteredBarbers] = useState<barbersTypes[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBarbers = async () => {
      const data = await getBarbers();
      setBarbers(data);
    };

    fetchBarbers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
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
    const error = validateValue(form);
    setErrors(error);

    if (Object.keys(error).length > 0) {
      alert("Hay errores en el formulario");
      return;
    }

    const appointmentData = {
      ...form,
      userId: user?.uid,
    };

    try {
      setLoading(true);
      const response = await createAppointment(appointmentData);
      setResSuccess(true);
      console.log(response);
    } catch (error) {
      alert("Ocurrió un error inesperado, por favor inténtalo más tarde.");
      console.log("Error al enviar los datos:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setResSuccess(false), 2000);
    }
  };

  return {
    form,
    errors,
    loading,
    resSuccess,
    barbers,
    filteredBarbers,
    handleChange,
    handleBlur,
    handleSubmit,
    setForm,
    setFilteredBarbers,
    register,
  };
};
