import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderRegistrationForm, setupRegistrationForm } from '../src/components/registration-form';
import { requireElement } from '../src/lib/dom';

let form: HTMLFormElement;
let cleanup: () => void;

function input(id: string): HTMLInputElement {
  return requireElement<HTMLInputElement>(form, `#${id}`);
}

function fillValidForm(): void {
  input('name').value = 'Alex de Prueba';
  input('email').value = 'alex@example.com';
  requireElement<HTMLSelectElement>(form, '#interest').value = 'producto';
  input('consent').checked = true;
}

function submit(): void {
  form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
}

beforeEach(() => {
  vi.useFakeTimers();
  document.body.innerHTML = renderRegistrationForm();
  form = requireElement<HTMLFormElement>(document, '#registration-form');
  cleanup = setupRegistrationForm(form);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  document.body.replaceChildren();
});

describe('interacción del formulario', () => {
  it('muestra errores accesibles y enfoca el primer campo inválido', () => {
    submit();
    expect(input('name').getAttribute('aria-invalid')).toBe('true');
    expect(document.activeElement).toBe(input('name'));
    expect(requireElement<HTMLDivElement>(form, '#form-errors').hidden).toBe(false);
    expect(requireElement<HTMLDivElement>(form, '#registration-feedback').hidden).toBe(true);
  });
  it('mantiene la validación de correo y no procesa un envío inválido', async () => {
    fillValidForm();
    input('email').value = 'correo-invalido';
    submit();
    expect(input('email').getAttribute('aria-invalid')).toBe('true');
    await vi.runAllTimersAsync();
    expect(input('name').value).toBe('Alex de Prueba');
    expect(form.hasAttribute('aria-busy')).toBe(false);
    expect(requireElement<HTMLDivElement>(form, '#registration-feedback').hidden).toBe(true);
  });
  it('impide envíos duplicados durante la simulación y vuelve a habilitar el formulario', async () => {
    fillValidForm();
    submit();
    submit();
    expect(vi.getTimerCount()).toBe(1);
    expect(requireElement<HTMLButtonElement>(form, '[type="submit"]').disabled).toBe(true);
    await vi.runAllTimersAsync();
    expect(requireElement<HTMLButtonElement>(form, '[type="submit"]').disabled).toBe(false);
    expect(input('name').value).toBe('');
    expect(form.hasAttribute('aria-busy')).toBe(false);
  });
  it('limpia los errores al reiniciar el formulario', () => {
    submit();
    form.reset();
    expect(input('name').hasAttribute('aria-invalid')).toBe(false);
    expect(requireElement<HTMLDivElement>(form, '#form-errors').hidden).toBe(true);
  });
  it('cancela una simulación pendiente al desmontar el controlador', () => {
    fillValidForm();
    submit();
    cleanup();
    expect(vi.getTimerCount()).toBe(0);
  });
});
