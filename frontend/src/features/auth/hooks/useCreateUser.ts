import { useState, useCallback } from "react";
import { userTypes, FormErrors, userData } from "@/types/userTypes";
import { setDocument } from "@/utils/firebase";
import { registerUser, updateUser } from "../services/registerUser";

export const useCreateUser = (
  initialForm: userTypes,
  validateForm: (values: userTypes) => FormErrors
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target as { name: keyof userTypes; value: string };

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateForm({ ...form, [name]: value })[name],
      }));
    },
    [form, validateForm]
  );

  const createUserInDB = useCallback(async (user: userData) => {
    const path = `users/${user.uid}`;

    try {
      await setDocument(path, { 
        ...user, 
        role: "client"
    });
    } catch (error) {
      console.error("Error al guardar usuario: ", error);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validación final antes de enviar
      const finalErrors = validateForm(form);
      setErrors(finalErrors);

      if (Object.keys(finalErrors).length > 0) return;

      setLoading(true);

      try {
        const response = await registerUser(form);

        // Actualizar el perfil del usuario después de crear la cuenta
        await updateUser({ displayName: form.name });

        form.uid = response.user.uid;

        const { password, confirmPassword, ...newUser } = form;
        console.log(password, confirmPassword)

        await createUserInDB({...newUser, role: 'client'} as userData);

        return response;
      } catch (error) {
        console.error("Error al crear el usuario: ", error);
      } finally {
        setLoading(false);
      }
    },
    [form, validateForm, createUserInDB]
  );

  return {
    form,
    errors,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
