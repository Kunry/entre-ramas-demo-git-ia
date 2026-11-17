import './styles.css';
import { renderHeader, renderFooter } from './components/layout';
import { setupRegistrationForm } from './components/registration-form';
import { renderHome } from './pages/home';
import { renderProgram } from './pages/program';
import { requireElement } from './lib/dom';

const page = document.body.dataset.page === 'programa' ? 'programa' : 'inicio';
const app = requireElement<HTMLDivElement>(document, '#app');
app.innerHTML = renderHeader(page) + (page === 'inicio' ? renderHome() : renderProgram()) + renderFooter();

if (page === 'inicio') {
  const cleanup = setupRegistrationForm(requireElement<HTMLFormElement>(document, '#registration-form'));
  import.meta.hot?.dispose(cleanup);
}

if (window.location.hash) {
  requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView());
}
