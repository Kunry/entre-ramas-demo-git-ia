import { requireElement } from './lib/dom';

// Mejora de la demo: confirmar el envío simulado sin cambiar las validaciones.
export function completeRegistration(form: HTMLFormElement): void {
  form.reset();

  const feedback = requireElement<HTMLDivElement>(form, '#registration-feedback');
  const icon = document.createElement('span');
  icon.className = 'feedback-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '✓';

  const heading = document.createElement('h4');
  heading.textContent = 'Envío de prueba completado';

  const description = document.createElement('p');
  description.textContent = 'La inscripción se ha simulado correctamente. No hemos guardado datos ni enviado ningún correo.';

  feedback.replaceChildren(icon, heading, description);
  feedback.hidden = false;
  feedback.focus();
}
