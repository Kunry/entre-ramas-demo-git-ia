import { describe, expect, it } from 'vitest';
import { validateRegistration } from '../src/lib/validation';
import type { RegistrationValues } from '../src/lib/validation';

const valid: RegistrationValues = {
  name: 'Alex de Prueba', email: 'alex@example.com', interest: 'producto', consent: true,
};

describe('criterios del formulario', () => {
  it('acepta datos válidos con espacios exteriores y nombres con acentos', () => {
    expect(validateRegistration({ ...valid, name: '  Álex O’Connor  ', email: ' alex@example.com ' })).toEqual({});
  });
  it('identifica todos los campos vacíos', () => {
    expect(Object.keys(validateRegistration({ name: '', email: '', interest: '', consent: false }))).toEqual(['name', 'email', 'interest', 'consent']);
  });
  it.each(['sin-arroba', 'alex@', '@example.com', 'alex @example.com'])('rechaza el correo %s', (email) => {
    expect(validateRegistration({ ...valid, email }).email).toBeDefined();
  });
  it('rechaza nombres formados solo por espacios', () => {
    expect(validateRegistration({ ...valid, name: '   ' }).name).toBeDefined();
  });
  it('rechaza valores de interés ajenos a las opciones disponibles', () => {
    expect(validateRegistration({ ...valid, interest: 'otra-opcion-inyectada' }).interest).toBeDefined();
  });
  it('exige la confirmación de uso de datos ficticios', () => {
    expect(validateRegistration({ ...valid, consent: false }).consent).toBeDefined();
  });
  it('limita la longitud del nombre y del correo', () => {
    const errors = validateRegistration({ ...valid, name: 'a'.repeat(81), email: `${'a'.repeat(250)}@example.com` });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
  });
});
