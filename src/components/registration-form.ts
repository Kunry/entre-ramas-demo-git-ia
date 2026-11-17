import { requireElement } from '../lib/dom';
import { INTERESTS, validateRegistration } from '../lib/validation';
import type { RegistrationErrors, RegistrationField, RegistrationValues } from '../lib/validation';
import { completeRegistration } from '../registration';

export function renderRegistrationForm(): string {
  return `
    <form id="registration-form" class="registration-form" novalidate>
      <div class="form-heading"><span class="eyebrow">Tu próxima buena idea empieza aquí</span>
        <h3>Nos vemos entre ramas.</h3><p>Completa el formulario para probar la inscripción.</p>
      </div>
      <div class="field">
        <label for="name">Tu nombre <span aria-hidden="true">*</span></label>
        <input id="name" name="name" type="text" autocomplete="name" maxlength="80" required
          placeholder="Cómo te llamas" aria-describedby="name-error" />
        <span class="field-error" id="name-error" hidden></span>
      </div>
      <div class="field">
        <label for="email">Correo de prueba <span aria-hidden="true">*</span></label>
        <input id="email" name="email" type="email" autocomplete="email" maxlength="254" required
          placeholder="hola@example.com" aria-describedby="email-help email-error" />
        <span class="field-hint" id="email-help">Utiliza una dirección ficticia. No enviaremos ningún correo.</span>
        <span class="field-error" id="email-error" hidden></span>
      </div>
      <div class="field">
        <label for="interest">¿Qué te trae por aquí? <span aria-hidden="true">*</span></label>
        <select id="interest" name="interest" required aria-describedby="interest-error">
          <option value="">Elige lo que más te interesa</option>
          ${INTERESTS.map((interest) => `<option value="${interest.value}">${interest.label}</option>`).join('')}
        </select>
        <span class="field-error" id="interest-error" hidden></span>
      </div>
      <div class="consent-field">
        <label class="checkbox-label" for="consent"><input id="consent" name="consent" type="checkbox"
          required aria-describedby="consent-error" /><span>Estoy utilizando datos ficticios para esta demostración.</span></label>
        <span class="field-error" id="consent-error" hidden></span>
      </div>
      <div id="form-errors" class="form-error-summary" role="alert" hidden></div>
      <div class="form-actions"><button type="submit" class="button button-dark">Probar inscripción <span aria-hidden="true">↗</span></button>
        <button type="reset" class="reset-button">Limpiar</button></div>
      <p class="form-footnote"><span class="privacy-dot" aria-hidden="true"></span>Envío simulado. No guardamos ni enviamos tus datos.</p>
      <div id="registration-feedback" class="registration-feedback" role="status" aria-live="polite" aria-atomic="true" tabindex="-1" hidden></div>
    </form>`;
}

const FIELD_NAMES: readonly RegistrationField[] = ['name', 'email', 'interest', 'consent'];

export function setupRegistrationForm(form: HTMLFormElement): () => void {
  const fields = {
    name: requireElement<HTMLInputElement>(form, '#name'),
    email: requireElement<HTMLInputElement>(form, '#email'),
    interest: requireElement<HTMLSelectElement>(form, '#interest'),
    consent: requireElement<HTMLInputElement>(form, '#consent'),
  };
  const submit = requireElement<HTMLButtonElement>(form, '[type="submit"]');
  const reset = requireElement<HTMLButtonElement>(form, '[type="reset"]');
  const summary = requireElement<HTMLDivElement>(form, '#form-errors');
  const feedback = requireElement<HTMLDivElement>(form, '#registration-feedback');
  let pending = false;
  let active = true;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  function clearFeedback(): void {
    feedback.replaceChildren();
    feedback.hidden = true;
  }

  function showErrors(errors: RegistrationErrors): void {
    for (const key of FIELD_NAMES) {
      const error = requireElement<HTMLSpanElement>(form, `#${key}-error`);
      error.textContent = errors[key] ?? '';
      error.hidden = !errors[key];
      if (errors[key]) fields[key].setAttribute('aria-invalid', 'true');
      else fields[key].removeAttribute('aria-invalid');
    }
    const count = Object.keys(errors).length;
    summary.textContent = count ? `Revisa ${count === 1 ? 'el campo señalado' : `los ${count} campos señalados`} antes de continuar.` : '';
    summary.hidden = count === 0;
  }

  function onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (pending) return;
    clearFeedback();
    const values: RegistrationValues = {
      name: fields.name.value,
      email: fields.email.value,
      interest: fields.interest.value,
      consent: fields.consent.checked,
    };
    const errors = validateRegistration(values);
    showErrors(errors);
    const firstInvalid = FIELD_NAMES.find((key) => errors[key]);
    if (firstInvalid) {
      fields[firstInvalid].focus();
      return;
    }

    pending = true;
    submit.disabled = true;
    reset.disabled = true;
    form.setAttribute('aria-busy', 'true');
    submit.textContent = 'Probando inscripción…';

    // Solo simulamos la espera. No hay fetch, almacenamiento ni servicio externo.
    timeout = setTimeout(() => {
      if (!active) return;
      completeRegistration(form);
      pending = false;
      submit.disabled = false;
      reset.disabled = false;
      submit.textContent = 'Probar inscripción ↗';
      form.removeAttribute('aria-busy');
    }, 450);
  }

  function onReset(): void {
    showErrors({});
    clearFeedback();
  }

  form.addEventListener('submit', onSubmit);
  form.addEventListener('reset', onReset);
  return () => {
    active = false;
    clearTimeout(timeout);
    form.removeEventListener('submit', onSubmit);
    form.removeEventListener('reset', onReset);
  };
}
