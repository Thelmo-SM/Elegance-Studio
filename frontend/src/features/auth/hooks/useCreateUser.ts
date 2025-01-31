import { useState } from "react";
import { userTypes, FormErrors, userData} from "@/types/userTypes";
import { setDocument } from '@/utils/firebase';
import { registerUser, updateUser } from "../services/registerUser";
{/*validateForm, hanledData*/}

export const useCreateUser = (initialForm: userTypes, validateForm:(values:userTypes) => FormErrors) => {
const [form, setForm] = useState(initialForm);;
const [errors, setErrors] = useState<FormErrors>({});
const [loading, setLoading] = useState(false) 
//console.log('capturas de datos: ', form);
//console.log('errores: ', errors)
if(!errors) {
    ///console.log('no hay errores: ', errors)
}


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value
        })
        //console.log('Valores capturados: ', form);
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: keyof userTypes; value: string };

        const fieldError = validateForm({ ...form, [name]: value });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldError[name],
        }));
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Validación final antes de enviar
        const finalErrors = validateForm(form);
        setErrors(finalErrors);
    
        // Si hay errores, no enviar el formulario
        if (Object.keys(finalErrors).length > 0) {
          return;
        }
    
        try {

          const response = await registerUser(form);
    
          // Actualizar el perfil del usuario después de crear la cuenta
          await updateUser({ displayName: form.name });
          form.uid = response.user.uid;

          const {password, confirmPassword, ...newUser} =  form;
          console.log(password, confirmPassword)

          await createUserInDB(newUser as userData)

          //console.log("Usuario creado exitosamente: ", form);
          setLoading(true);
          return response;
        } catch (error) {
          console.error("Error al crear el usuario: ", error);
        } finally {
          setLoading(false);
        }
      };

      
const createUserInDB = async (user: userData) => {
  const path = `users/${user.uid}`;

  try {

    await setDocument(path, user);

    //console.log("Usuario guardado correctamente sin contraseña.");
  } catch (error) {
    console.error("Error al guardar usuario: ", error);
  }
};

    return {
        form,
        errors,
        loading,
        handleChange,
        handleBlur,
        handleSubmit
    }
}