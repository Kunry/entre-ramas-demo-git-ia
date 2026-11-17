export interface RegistrationValues {
  readonly name: string;
  readonly email: string;
  readonly interest: string;
  readonly consent: boolean;
}

export type RegistrationField = keyof RegistrationValues;
export type RegistrationErrors = Partial<Record<RegistrationField, string>>;

export const INTERESTS = [
  { value: 'producto', label: 'Producto y negocio' },
  { value: 'diseno', label: 'Diseño y experiencia' },
  { value: 'desarrollo', label: 'Desarrollo y tecnología' },
  { value: 'curiosidad', label: 'Tengo curiosidad y quiero aprender' },
] as const;

export function validateRegistration(values: RegistrationValues): RegistrationErrors {
  const errors: RegistrationErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();

  if (name.length < 2) errors.name = 'Escribe un nombre de al menos 2 caracteres.';
  else if (name.length > 80) errors.name = 'El nombre puede tener hasta 80 caracteres.';

  if (!email) errors.email = 'Escribe tu correo de prueba.';
  else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Escribe un correo con un formato válido, como hola@example.com.';
  }

  if (!INTERESTS.some((interest) => interest.value === values.interest)) {
    errors.interest = 'Selecciona qué te interesa explorar.';
  }
  if (!values.consent) errors.consent = 'Confirma que estás utilizando datos ficticios.';
  return errors;
}
