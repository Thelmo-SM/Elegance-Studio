import { useState, useEffect } from "react";
import { appointmentsTypes, validateValueType } from "@/types/appointmentsTypes";
import { createAppointment } from "../services/create.appointments";
import { getBarbers } from "@/features/barbers/services/get.barbers";
import { useAuth } from "@/store/User.context";
import { checkIfHourIsOccupied } from "../services/busy.appointments";
import { sendConfirmationNotification } from "../services/confirmationNotification";


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
  const [resError, setResError] = useState(false);
  const [barbers, setBarbers] = useState<barbersTypes[]>([]);
  const [filteredBarbers, setFilteredBarbers] = useState<barbersTypes[]>([]);
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentTime, setCurrentTime] = useState(new Date().toISOString().split('T')[1].substring(0, 5));
  const validHours = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
  ];
  const [hora, setHora] = useState(validHours);

// Cargar la fecha y hora actuales cada 6 segundos
useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();
    setCurrentDate(now.toISOString().split('T')[0]);
    setCurrentTime(now.toISOString().split('T')[1].substring(0, 5));
  }, 6000);

  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    const fetchBarbers = async () => {
      const data = await getBarbers();
      setBarbers(data);
      console.log(data)
    };
    

    fetchBarbers();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(form.hour)
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
    value: typeof form[field] === "boolean" ? String(form[field]) : form[field] || "",
    onChange: handleChange,
    onBlur: handleBlur,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateValue(form);
    setErrors(error);


  if (Object.keys(error).length > 0 || error.hour) {
    setResError(true);
    setTimeout(() => setResError(false), 2000);
    setTimeout(() => setErrors({}), 2000);
    return;
  }

  const isOccupied  = await checkIfHourIsOccupied (form.barber, form.hour, form.date);
  if(isOccupied) {
    setErrors((error) => ({
      ...error,
      hour : 'Esta hora esta ocupada, por favor elija otra.'
    }));
    return;
  }


    const appointmentData = {
      ...form,
      userId: user?.uid,
    };

    
    try {
      setLoading(true);
      const response = await createAppointment(appointmentData);
      if(response.success) {
        setResSuccess(true);
        setResError(false);
        setForm(initialValue);
        await sendConfirmationNotification(response?.userId || '', response.barber || '', response )
      } else if(!response) {
        setForm(initialValue);
      }
    } catch (error) {
      setResError(true);
      console.log("Error al enviar los datos:", error);
      if(error instanceof Error) {
        setErrors((error) => ({
          ...error,
          hour : error.hour
        }))
      }
    } finally {
      setLoading(false);
      setTimeout(() => setResSuccess(false), 2000);
      setTimeout(() => setResError(false), 2000);
    }
  };

  return {
    form,
    errors,
    loading,
    resSuccess,
    resError,
    barbers,
    filteredBarbers,
    hora,
    currentDate,
    currentTime,
    setHora,
    handleChange,
    handleBlur,
    handleSubmit,
    setForm,
    setFilteredBarbers,
    register,
  };
};
