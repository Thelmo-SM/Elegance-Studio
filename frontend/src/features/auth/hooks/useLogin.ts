import { useState, useCallback } from "react";
import { loginTypes, loginErrors } from "@/types/userTypes";
import { loginUser } from "../services/loginUser";
import { useRouter } from "next/navigation";

export const useLogin = (
  initialForm: loginTypes,
  validateForm: (values: loginTypes) => loginErrors
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<loginErrors>({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const handleBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof loginTypes; value: string };

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateForm({ ...form, [name]: value })[name],
    }));
  }, [form, validateForm]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await loginUser(form);
        if (!response.success) {
          //alert(response.message);
          setErrorMessage(response.message ?? null);
          setTimeout(() => setErrorMessage(null), 2500);
        }  else {
          router.push('/');
        }
      } catch (error) {
        // Verificar si el error es un FirebaseError
      console.log(error)
      } finally {
        setLoading(false);
      }
    },
    [form, router]
  );

  return {
    form,
    errors,
    loading,
    errorMessage,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
