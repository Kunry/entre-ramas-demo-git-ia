export function renderHeader(page: 'inicio' | 'programa'): string {
  return `<header class="site-header"><div class="container header-inner">
    <a class="wordmark" href="/" aria-label="Entre ramas, inicio"><span class="brand-symbol" aria-hidden="true">↳</span>entre ramas<span class="wordmark-dot">.</span></a>
    <nav aria-label="Navegación principal"><a href="/" ${page === 'inicio' ? 'aria-current="page"' : ''}>El encuentro</a>
      <a href="/programa.html" ${page === 'programa' ? 'aria-current="page"' : ''}>Programa</a></nav>
    <a class="header-cta" href="${page === 'inicio' ? '#inscripcion' : '/#inscripcion'}">Apuntarme <span aria-hidden="true">↗</span></a>
  </div></header>`;
}

export function renderFooter(): string {
  return `<footer class="site-footer"><div class="container footer-inner">
    <a class="wordmark" href="/">entre ramas<span class="wordmark-dot">.</span></a>
    <p>Un espacio para aprender haciendo.</p><span class="demo-label">Web de demostración</span>
  </div></footer>`;
}
