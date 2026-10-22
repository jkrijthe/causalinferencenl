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

/* ─── Upcoming / past events ─────────────────────────────────────────── */
// Each event card carries data-past-from: midnight (Amsterdam time) at the
// start of the day after the event. Cards are moved between the two lists
// here so the split follows the visitor's clock, not the build date.
const eventLists = {
  upcoming: document.querySelector('[data-events="upcoming"]'),
  past: document.querySelector('[data-events="past"]'),
};

if (eventLists.upcoming && eventLists.past) {
  const cards = [...document.querySelectorAll('.event-item[data-past-from]')];
  const pastFrom = card => Date.parse(card.dataset.pastFrom);
  let timer;

  const placeEvents = () => {
    const now = Date.now();
    const byDate = [...cards].sort((a, b) => pastFrom(a) - pastFrom(b));
    const groups = {
      upcoming: byDate.filter(card => pastFrom(card) > now),
      past: byDate.filter(card => pastFrom(card) <= now).reverse(),
    };

    Object.entries(groups).forEach(([state, group]) => {
      group.forEach(card => {
        card.classList.toggle('event-item--upcoming', state === 'upcoming');
        card.classList.toggle('event-item--past', state === 'past');
        card.querySelector('.event-item__date-block')
          .classList.toggle('event-item__date-block--muted', state === 'past');
      });
      eventLists[state].replaceChildren(...group);
      eventLists[state].hidden = group.length === 0;
      document.querySelector(`[data-events-empty="${state}"]`).hidden = group.length > 0;
    });

    // Re-check just after the next event becomes past. Capped at an hour,
    // because browsers handle very long timeouts poorly.
    clearTimeout(timer);
    if (groups.upcoming.length) {
      const delay = Math.min(pastFrom(groups.upcoming[0]) - now + 1000, 60 * 60 * 1000);
      timer = setTimeout(placeEvents, delay);
    }
  };

  placeEvents();

  // Timers are throttled in background tabs, so re-check when the tab is shown again.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') placeEvents();
  });
}
