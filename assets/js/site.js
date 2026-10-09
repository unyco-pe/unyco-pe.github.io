(() => {
  const body = document.body;
  body.classList.add('motion-ready');

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = navigator.connection || {};
  const saveData = !!conn.saveData;
  const slowNet = /^(slow-2g|2g)$/.test(conn.effectiveType || '');

  /* iOS Safari only applies :active while a touch listener exists. Without it,
     the press feedback in the CSS never shows on iPhone. */
  addEventListener('touchstart', () => {}, { passive: true });

  /* ---------- mobile menu ---------- */
  const menuBtn = document.querySelector('.menu-button');
  const menu = document.querySelector('.mobile-menu');
  if (menuBtn && menu) {
    // Order for the staggered entrance of the links (CSS reads --i).
    menu.querySelectorAll('.mobile-menu-links a, .mobile-menu-foot > *').forEach((el, i) => el.style.setProperty('--i', i));
    const setMenu = open => {
      body.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
    };
    menuBtn.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', e => {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
    });
  }

  /* ---------- header + floating CTA ---------- */
  const header = document.querySelector('.site-header');
  const fab = document.querySelector('.mobile-wa');
  const opening = document.querySelector('.hero');
  const footer = document.querySelector('.site-footer');
  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 16);
      header.classList.toggle('over-opening', !!opening && y < Math.max(40, opening.offsetHeight - 90));
    }
    if (fab) {
      // Clear the footer before it reaches the floating button, including Taller.
      const footerInView = footer && footer.getBoundingClientRect().top <= innerHeight + 24;
      const visible = y > 520 && !footerInView;
      fab.classList.toggle('is-visible', visible);
      fab.inert = !visible;
    }
    ticking = false;
  };
  const requestScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };
  onScroll();
  addEventListener('scroll', requestScroll, { passive: true });
  addEventListener('resize', requestScroll, { passive: true });

  /* ---------- reveals ----------
     Fails open: anything not revealed within 2.5s is shown regardless, so a
     missed observer callback can never leave content permanently invisible. */
  const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));
  const showAll = () => revealTargets.forEach(el => el.classList.add('in'));
  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
    revealTargets.forEach(el => io.observe(el));
    setTimeout(showAll, 2500);
  }

  /* ---------- video: play in view, pause out of view (all viewports) ---------- */
  const vids = Array.from(document.querySelectorAll('video[data-inview]'));
  if (vids.length) {
    if (reduced || saveData || slowNet) {
      vids.forEach(v => { v.setAttribute('controls', ''); v.removeAttribute('loop'); });
    } else {
      vids.forEach(v => { v.muted = true; v.playsInline = true; });
      const vio = new IntersectionObserver(entries => {
        entries.forEach(e => {
          const v = e.target;
          if (e.isIntersecting) {
            if (v.preload !== 'auto') v.preload = 'auto';
            const p = v.play();
            if (p && p.catch) p.catch(() => { v.setAttribute('controls', ''); });
          } else if (!v.paused) {
            v.pause();
          }
        });
      }, { threshold: 0.25, rootMargin: '200px 0px' });
      vids.forEach(v => vio.observe(v));
    }
  }

  /* ---------- merch carousel ----------
     Native horizontal scroll with snap points. The finger drives it 1:1, and
     momentum, rubber-banding and mid-flight interruption come from the browser
     for free. JS only keeps arrows and dots in sync and runs a polite autoplay
     that yields to any touch, hover, focus, hidden tab or offscreen state. */
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.merch-carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.merch-slide'));
    const dotsWrap = carousel.querySelector('.merch-carousel-dots');
    const prev = carousel.querySelector('.merch-carousel-btn.prev');
    const next = carousel.querySelector('.merch-carousel-btn.next');
    if (!track || slides.length < 2) return;

    carousel.classList.add('is-native');
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'carrusel');
    track.tabIndex = 0;
    slides.forEach((s, i) => {
      s.setAttribute('role', 'group');
      s.setAttribute('aria-label', `${i + 1} de ${slides.length}`);
    });

    const canAuto = !reduced && !saveData && !slowNet;
    const behavior = reduced ? 'auto' : 'smooth';
    let index = 0;
    let timer = null;
    let resumeTimer = null;
    let hovered = false;
    let focused = false;
    let visible = false;

    // Dots are a pointer aid; keyboard users scroll the focused track or use the arrows.
    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.tabIndex = -1;
      b.setAttribute('aria-label', `Mostrar foto ${i + 1}`);
      b.addEventListener('click', () => { userActed(); goTo(i); });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    const width = () => track.clientWidth || 1;
    const paint = () => dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    const goTo = i => track.scrollTo({ left: i * width(), behavior });

    // Wrapping from the last photo back to the first would sweep through every
    // slide. Instead the surface fades, repositions while invisible, and returns.
    const wrapTo = i => {
      if (reduced || !track.animate) { track.scrollTo({ left: i * width(), behavior: 'auto' }); return; }
      const out = track.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: 'ease-in', fill: 'forwards' });
      out.onfinish = () => {
        track.scrollTo({ left: i * width(), behavior: 'auto' });
        track.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' });
        out.cancel();
      };
    };
    const step = dir => {
      const target = index + dir;
      if (target >= slides.length) wrapTo(0);
      else if (target < 0) wrapTo(slides.length - 1);
      else goTo(target);
    };

    // Index follows the actual scroll position, so a half-finished swipe is never misreported.
    let ticking = false;
    track.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const i = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / width())));
        if (i !== index) { index = i; paint(); }
        ticking = false;
      });
    }, { passive: true });

    // Autoplay: only while on screen, untouched, unhovered, unfocused.
    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => {
      stop();
      if (canAuto && visible && !hovered && !focused && !document.hidden) timer = setInterval(() => step(1), 4200);
    };
    const userActed = () => {
      stop();
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(start, 7000);
    };
    ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach(t => track.addEventListener(t, userActed, { passive: true }));
    carousel.addEventListener('mouseenter', () => { hovered = true; stop(); });
    carousel.addEventListener('mouseleave', () => { hovered = false; start(); });
    carousel.addEventListener('focusin', () => { focused = true; stop(); });
    carousel.addEventListener('focusout', () => { focused = false; start(); });
    document.addEventListener('visibilitychange', start);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); }, { threshold: 0.5 }).observe(carousel);
    } else { visible = true; start(); }

    if (next) next.addEventListener('click', () => { userActed(); step(1); });
    if (prev) prev.addEventListener('click', () => { userActed(); step(-1); });

    // Keep the current photo in place when the viewport width changes.
    addEventListener('resize', () => track.scrollTo({ left: index * width(), behavior: 'auto' }), { passive: true });
    paint();
  });
})();
