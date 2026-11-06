// Keep the current section visible in the sticky navigation as the page scrolls.
(() => {
  const header = document.querySelector('.site-header');
  const links = [...document.querySelectorAll('nav[aria-label="Main navigation"] a')];
  const sections = links.map(link => ({
    link,
    target: document.getElementById(link.hash.slice(1))
  })).filter(section => section.target);
  if (!header || !sections.length) return;

  let framePending = false;
  const update = () => {
    framePending = false;
    const headerHeight = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-offset', `${headerHeight + 20}px`);
    const activationLine = headerHeight + 24;
    let current = sections[0];
    for (const section of sections) {
      if (section.target.getBoundingClientRect().top <= activationLine) current = section;
    }
    // The final section may be too short to reach the activation line.
    const page = document.documentElement;
    if (window.scrollY > 0 && window.scrollY + page.clientHeight >= page.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    for (const {link} of sections) {
      if (link === current.link) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  const scheduleUpdate = () => {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', scheduleUpdate, {passive: true});
  for (const event of ['resize', 'load', 'pageshow', 'hashchange']) {
    window.addEventListener(event, scheduleUpdate);
  }
  if ('ResizeObserver' in window) new ResizeObserver(scheduleUpdate).observe(header);
  update();
})();
