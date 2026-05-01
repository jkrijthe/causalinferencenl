/* ─── Mobile nav toggle ───────────────────────────────────────────────── */
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('is-open');
  });

  // Close menu when a nav link is clicked (single-page smooth scroll)
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
    });
  });
}

/* ─── Abstract expand / collapse ─────────────────────────────────────── */
document.querySelectorAll('.js-abstract-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const abstract = btn.closest('.pub-item').querySelector('.pub-item__abstract');
    if (!abstract) return;
    const isHidden = abstract.hasAttribute('hidden');
    abstract.toggleAttribute('hidden', !isHidden);
    btn.setAttribute('aria-expanded', String(isHidden));
    btn.textContent = isHidden ? 'Hide abstract' : 'Abstract';
  });
});

/* ─── Smooth-scroll for in-page anchor links ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
