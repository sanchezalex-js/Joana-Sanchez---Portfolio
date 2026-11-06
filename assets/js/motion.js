(() => {
  const motion = window.matchMedia('screen and (prefers-reduced-motion: no-preference)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  // Fade and slide each section into view once as you scroll.
  if ('IntersectionObserver' in window && typeof Element.prototype.animate === 'function') {
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;

        observer.unobserve(target);
        if (!motion.matches || target.contains(document.activeElement)) continue;

        target.animate(
          [
            { opacity: 0.35, translate: '0 24px' },
            { opacity: 1, translate: '0 0' }
          ],
          { duration: 600, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' }
        );
      }
    }, { rootMargin: '0px 0px -24px 0px' });

    const sections = document.querySelectorAll(
      '.section-heading, .internship-strip, [data-glass], .contact-main'
    );

    for (const section of sections) {
      // Keep content on the first screen fully visible when the page loads.
      if (section.getBoundingClientRect().top >= window.innerHeight) {
        revealOnScroll.observe(section);
      }
    }
  }

  // Move the glass card glow with the pointer.
  for (const card of document.querySelectorAll('[data-glass]')) {
    let frame = 0;
    let pointer;

    const updateGlow = event => {
      if (!motion.matches || !finePointer.matches || event.pointerType === 'touch') return;
      pointer = event;
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = Math.round((pointer.clientX - left) * 100 / width);
        const y = Math.round((pointer.clientY - top) * 100 / height);
        card.style.setProperty('--glow-x', `${x}%`);
        card.style.setProperty('--glow-y', `${y}%`);
        card.toggleAttribute('data-hovered', true);
      });
    };

    const clearGlow = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      card.removeAttribute('data-hovered');
    };

    card.addEventListener('pointerenter', updateGlow);
    card.addEventListener('pointermove', updateGlow);
    card.addEventListener('pointerleave', clearGlow);
    card.addEventListener('pointercancel', clearGlow);
  }
})();
