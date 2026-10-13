(() => {
  // The full policy and section links are in HTML and work without JavaScript.
  const links = [...document.querySelectorAll('.toc-links a')];
  const headings = [...document.querySelectorAll('#legal-content h2[id]')];
  if (!links.length || !headings.length) return;
  const mark = (id) => {
    links.forEach((link) => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  links.forEach((link) => link.addEventListener('click', () => {
    mark(link.hash.slice(1));
    const heading = document.getElementById(link.hash.slice(1));
    if (heading) heading.focus({ preventScroll: true });
  }));
  let pending = false;
  const update = () => {
    pending = false;
    const header = document.querySelector('.legal-header');
    const offset = (header ? header.getBoundingClientRect().height : 0) + 40;
    let current = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= offset) current = heading;
      else break;
    }
    mark(current.id);
  };
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
