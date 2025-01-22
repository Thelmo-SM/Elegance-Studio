import { userTypes, loginTypes } from "@/types/userTypes";

export const velidateCreateUser = (form: userTypes) => {

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const regexLastName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPassword = /^(?=.*[A-Z]).{8,}$/;
  const regexPhone = /^\+?\d{5,15}$/;

  const errors: Partial<userTypes> = {};

  // Validar el nombre
  if (!form.name.trim()) {
    errors.name = "El nombre es requerido";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = `El campo 'Nombre' debe contener solo letras, pero has escrito: '${form.name}'.`;
  }

  // Validar apellido
  if (!form.lastName.trim()) {
    errors.lastName = "El apellido es requerido";
  } else if (!regexLastName.test(form.lastName.trim())) {
    errors.lastName = `El campo 'Apellido' debe contener solo letras.`;
  }

  // Validar el correo
  if (!form.email.trim()) {
    errors.email = "El correo electrónico es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email =
      "Por favor, ingresa una dirección de correo electrónico válida.";
  }

  // Validar la contraseña
  if (!form.password.trim()) {
    errors.password = "La contraseña es requerida";
  } else if (!regexPassword.test(form.password)) {
    errors.password =
      "La contraseña debe cumplir con los requisitos: al menos 8 caracteres Y una letra mayúscula.";
  }

  // Validar la confirmación de la contraseña
  if (!form.confirmPassword.trim()) {
    errors.confirmPassword = "La confirmación de la contraseña es requerida";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  // Validar el teléfono
  if (!form.phone.trim()) {
    errors.phone = "El teléfono es requerido";
  } else if (!regexPhone.test(form.phone)) {
    errors.phone =
      "El número de teléfono debe tener entre 5 y 15 caracteres";
  }

  return errors;
};

export const validateLogin = (form: loginTypes) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPassword = /^(?=.*[A-Z]).{8,}$/;

  const errors: Partial<loginTypes> = {};


    // Validar el correo
    if (!form.email.trim()) {
      errors.email = "El correo electrónico es requerido";
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email =
        "Por favor, ingresa una dirección de correo electrónico válida.";
    }
  
    // Validar la contraseña
    if (!form.password.trim()) {
      errors.password = "La contraseña es requerida";
    } else if (!regexPassword.test(form.password)) {
      errors.password =
        "La contraseña debe cumplir con los requisitos: al menos 8 caracteres Y una letra mayúscula.";
    }

    return errors;
};