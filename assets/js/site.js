(() => {
  const body = document.body;
  body.classList.add('motion-ready');

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = navigator.connection || {};
  const saveData = !!conn.saveData;
  const slowNet = /^(slow-2g|2g)$/.test(conn.effectiveType || '');

  /* ---------- mobile menu ---------- */
  const menuBtn = document.querySelector('.menu-button');
  const menu = document.querySelector('.mobile-menu');
  if (menuBtn && menu) {
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
  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 16);
      header.classList.toggle('over-opening', !!opening && y < Math.max(40, opening.offsetHeight - 90));
    }
    if (fab) fab.classList.toggle('is-visible', y > 520);
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

  /* ---------- merch carousel: auto + manual, infinite loop ---------- */
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.merch-carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.merch-slide'));
    const dotsWrap = carousel.querySelector('.merch-carousel-dots');
    const prev = carousel.querySelector('.merch-carousel-btn.prev');
    const next = carousel.querySelector('.merch-carousel-btn.next');
    if (!track || slides.length < 2) return;

    const firstClone = slides[0].cloneNode(true);
    firstClone.setAttribute('aria-hidden', 'true');
    track.appendChild(firstClone);
    let index = 0;
    let timer = null;
    let locked = false;

    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Mostrar foto ${i + 1}`);
      b.addEventListener('click', () => go(i));
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    const paint = () => dots.forEach((d, i) => d.classList.toggle('is-active', i === (index % slides.length)));
    const move = animate => {
      track.style.transition = animate ? 'transform .65s cubic-bezier(.2,.72,.2,1)' : 'none';
      track.style.transform = `translate3d(${-index * 100}%,0,0)`;
      paint();
    };
    const restart = () => {
      if (timer) clearInterval(timer);
      if (!reduced && !saveData && !slowNet) timer = setInterval(advance, 3600);
    };
    const go = i => { if (locked) return; index = i; move(true); restart(); };
    const advance = () => {
      if (locked) return;
      index += 1; locked = true; move(true);
      setTimeout(() => {
        if (index === slides.length) {
          index = 0; move(false);
          requestAnimationFrame(() => requestAnimationFrame(() => { track.style.transition = 'transform .65s cubic-bezier(.2,.72,.2,1)'; }));
        }
        locked = false;
      }, 680);
    };
    const back = () => {
      if (locked) return;
      if (index === 0) {
        index = slides.length; move(false);
        requestAnimationFrame(() => { index = slides.length - 1; move(true); });
      } else {
        index -= 1; move(true);
      }
      restart();
    };

    if (next) next.addEventListener('click', () => { advance(); restart(); });
    if (prev) prev.addEventListener('click', back);
    carousel.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); });
    carousel.addEventListener('mouseleave', restart);
    carousel.addEventListener('focusin', () => { if (timer) clearInterval(timer); });
    carousel.addEventListener('focusout', restart);
    move(false);
    restart();
  });
})();
