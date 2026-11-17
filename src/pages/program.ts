import { PROGRAM, PROGRAM_INTRO, formatMinute } from '../content/program';
import { escapeHtml } from '../lib/dom';

export function renderProgram(): string {
  const sessions = PROGRAM.map((session, index) => `<li class="agenda-row">
    <div class="agenda-time"><span>${formatMinute(session.start)} — ${formatMinute(session.end)}</span><small>${session.end - session.start} minutos</small></div>
    <div class="agenda-content"><h2>${escapeHtml(session.title)}</h2><p>${escapeHtml(session.description)}</p></div>
    <span class="agenda-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span></li>`).join('');
  return `<main id="contenido" class="container program-main">
    <header class="program-intro"><div><a class="back-link" href="/">← Volver al encuentro</a>
      <span class="eyebrow">El programa</span><h1>Un cambio pequeño.<br><em>Muchas cosas que aprender.</em></h1>
      <p id="program-intro-text">${escapeHtml(PROGRAM_INTRO)}</p></div>
      <div class="duration-note"><strong>80<span>min</span></strong><p>72 de contenido<br>8 para conversar</p></div></header>
    <ol class="agenda" aria-label="Programa completo del encuentro">${sessions}</ol>
    <section class="program-outro"><div><span class="eyebrow">Nos llevamos una forma de trabajar</span>
      <h2>De la idea a una propuesta<br>que podemos explicar.</h2><p>Un encargo claro, una rama, cambios revisados y pruebas del resultado.</p></div>
      <a class="button button-dark" href="/#inscripcion">Quiero participar <span aria-hidden="true">↗</span></a></section>
  </main>`;
}
