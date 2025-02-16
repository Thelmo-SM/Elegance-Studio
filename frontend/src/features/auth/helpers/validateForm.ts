import { userTypes, loginTypes } from "@/types/userTypes";

// Expresiones regulares reutilizables
const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPassword = /^(?=.*[A-Z]).{8,}$/;
const regexPhone = /^\+?\d{5,15}$/;

export const validateCreateUser = (form: userTypes): Partial<userTypes> => {
  const errors: Partial<userTypes> = {};

  // Validar el nombre
  if (!form.name) {
    errors.name = "El nombre es obligatorio.";
  } else if (!regexName.test(form.name)) {
    errors.name = "El nombre solo debe contener letras.";
  }

  // Validar el apellido
  if (!form.lastName) {
    errors.lastName = "El apellido es obligatorio.";
  } else if (!regexName.test(form.lastName)) {
    errors.lastName = "El apellido solo debe contener letras.";
  }

  // Validar el correo
  if (!form.email) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!regexEmail.test(form.email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  // Validar la contraseña
  if (!form.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (!regexPassword.test(form.password)) {
    errors.password = "La contraseña debe tener al menos 8 caracteres y una letra mayúscula.";
  }

  // Validar la confirmación de la contraseña
  if (!form.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña.";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  // Validar el teléfono
  if (!form.phone) {
    errors.phone = "El teléfono es obligatorio.";
  } else if (!regexPhone.test(form.phone)) {
    errors.phone = "El teléfono debe tener entre 5 y 15 dígitos.";
  }

  return errors;
};

export const validateLogin = (form: loginTypes): Partial<loginTypes> => {
  const errors: Partial<loginTypes> = {};

  // Validar el correo
  if (!form.email) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!regexEmail.test(form.email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  // Validar la contraseña
  if (!form.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (!regexPassword.test(form.password)) {
    errors.password = "La contraseña debe tener al menos 8 caracteres y una letra mayúscula.";
  }

  return errors;
};