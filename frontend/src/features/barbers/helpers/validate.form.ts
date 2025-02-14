// validaciones.ts
import { barberTypes, ServiceBarberFunction } from "@/types/userTypes";

export const validateUserFields = (values: barberTypes): ServiceBarberFunction => {
  const errors: ServiceBarberFunction = {};

  // Validar location
  if (!values.location || values.location.trim() === "") {
    errors.location = "La ubicación es obligatoria.";
  }

  // Validar dni
  if (!values.dni || values.dni.trim() === "" || values.dni === "Ninguno") {
    errors.dni = "El DNI es obligatorio.";
  }

  return errors;
};
