import { renderRegistrationForm } from '../components/registration-form';

export function renderHome(): string {
  return `<main id="contenido">
    <section class="hero container" aria-labelledby="hero-title">
      <div class="hero-copy"><span class="eyebrow"><span class="live-dot" aria-hidden="true"></span>Git, GitHub e inteligencia artificial</span>
        <h1 id="hero-title">Las buenas ideas<br>se construyen<br><em>en equipo.</em></h1>
        <p class="hero-description">Un encuentro para crear con IA, entender los cambios y compartir lo que aprendemos por el camino.</p>
        <div class="hero-actions"><a class="button button-dark" href="#inscripcion">Quiero participar <span aria-hidden="true">↗</span></a>
          <a class="text-link" href="/programa.html">Explorar el programa <span aria-hidden="true">→</span></a></div>
        <div class="hero-details"><span>80 minutos de práctica</span><span>Todos los niveles</span><span>Un caso realista</span></div>
      </div>
      <aside class="event-poster" aria-label="Entre ramas, encuentro práctico sobre Git, GitHub e IA">
        <div class="poster-top"><span>ENCUENTRO PRÁCTICO</span><span aria-hidden="true">↗</span></div>
        <div class="poster-title">crear.<br>probar.<br><span>compartir.</span></div>
        <div class="poster-bottom"><span>Entre ramas<br><strong>Edición de demostración</strong></span><span class="poster-mark" aria-hidden="true">er.</span></div>
      </aside>
    </section>
    <section class="intro-strip" aria-label="El enfoque del encuentro"><div class="container strip-inner">
      <p>Una idea pequeña.<br><strong>Todo el recorrido.</strong></p>
      <p>Del primer encargo a una propuesta revisada. Vamos a seguir una mejora de principio a fin, con tiempo para probar y preguntar.</p>
      <a class="text-link" href="/programa.html">Así será el encuentro <span aria-hidden="true">↗</span></a>
    </div></section>
    <section class="registration-section container" id="inscripcion" aria-labelledby="registration-title">
      <div class="registration-copy"><span class="eyebrow">Reserva un rato para aprender</span>
        <h2 id="registration-title">Trae curiosidad.<br><em>Lo demás, lo vemos juntos.</em></h2>
        <p>No hace falta dominar Git. Empezamos por una tarea concreta y descubrimos las herramientas cuando nos ayudan a avanzar.</p>
        <ol class="learning-list"><li><span>01</span><div><h3>Entiende qué ha cambiado</h3><p>Revisa una propuesta y conecta el código con su resultado.</p></div></li>
          <li><span>02</span><div><h3>Experimenta con confianza</h3><p>Guarda avances y separa las tareas en las que trabajas.</p></div></li>
          <li><span>03</span><div><h3>Trabaja mejor con IA</h3><p>Acompaña al agente con contexto, reglas y comprobaciones.</p></div></li></ol>
        <p class="registration-note">Esta es una web de prueba para acompañar la charla. La inscripción es simulada.</p>
      </div>
      ${renderRegistrationForm()}
    </section>
  </main>`;
}
