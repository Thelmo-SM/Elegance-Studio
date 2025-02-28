import { useState, useCallback } from "react";
import { loginTypes, loginErrors } from "@/types/userTypes";
import { loginUser } from "../services/loginUser";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app"; // Asegúrate de importar esto

export const useLogin = (
  initialForm: loginTypes,
  validateForm: (values: loginTypes) => loginErrors
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<loginErrors>({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
          // Mostrar mensaje de error si la respuesta es negativa
          setErrorMessage(response.message ?? null);
          setTimeout(() => setErrorMessage(null), 2500);
          setSuccess(false)
        } else {
          // Limpiar errores si el login es exitoso
          setSuccess(true)
          setErrors({});
          router.push("/dashboard");
        }
      } catch (error) {
        // Manejo de errores Firebase
        if (error instanceof FirebaseError) {
          console.error("Error de Firebase:", error.message);
          setErrorMessage("Hubo un error al iniciar sesión. Intenta de nuevo.");
        } else {
          console.error("Error desconocido:", error);
          setErrorMessage("Ocurrió un error inesperado.");
        }
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
    success,
    errorMessage,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
