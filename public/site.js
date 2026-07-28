document.addEventListener('click', (event) => {
  const localeLink = event.target.closest('[data-locale-choice]');
  if (localeLink) localStorage.setItem('portfolio-locale', localeLink.dataset.localeChoice);
});

const panel = document.querySelector('[data-filter-panel]');
if (panel) {
  let progression = 'all';
  let capability = 'all';
  const cards = [...document.querySelectorAll('[data-project-card]')];
  const groups = [...document.querySelectorAll('[data-project-group]')];
  const empty = document.querySelector('[data-filter-empty]');

  const apply = () => {
    let shown = 0;
    cards.forEach((card) => {
      const progressionMatch = progression === 'all' || card.dataset.progression === progression || (progression === 'waitlist' && card.dataset.waitlist === 'true');
      const capabilityMatch = capability === 'all' || card.dataset.categories.split(' ').includes(capability);
      const visible = progressionMatch && capabilityMatch;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    groups.forEach((group) => {
      group.hidden = !group.querySelector('[data-project-card]:not([hidden])');
    });
    empty.hidden = shown !== 0;
  };

  panel.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.filterProgression) {
      progression = button.dataset.filterProgression;
      panel.querySelectorAll('[data-filter-progression]').forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    }
    if (button.dataset.filterCapability) {
      capability = button.dataset.filterCapability;
      panel.querySelectorAll('[data-filter-capability]').forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    }
    apply();
  });
}
