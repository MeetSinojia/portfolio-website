/* ── MATRIX RAIN ────────────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('matrix-rain');
  const ctx    = canvas.getContext('2d');

  const POOL = [
    '//', '#', '→', '★', '⚡', '{}', '[]', '()', '=>', '&&', '||',
    '!=', '==', '>=', '<=', '+=', '--', '++', '::', '??', '..', '✦',
    '·',  '•',  'fn', 'if', '/*', '*/', '01', '10', '00', '11',
    '{}', '//', '★',  '⚡', '✦',  '*',  '&',  '%',  '$',  '@',  '~', '^',
  ];

  let W, H, cols, drops, speeds, opacities, chars, sizes;
  let scrollBurst = 0, lastScrollY = 0;
  const FONT_SIZE = 13;

  function resize() {
    W    = canvas.width  = window.innerWidth;
    H    = canvas.height = window.innerHeight;
    cols = Math.floor(W / FONT_SIZE) + 1;

    drops     = Array.from({ length: cols }, ()  => Math.random() * -H);
    speeds    = Array.from({ length: cols }, ()  => 0.5 + Math.random() * 1.2);
    opacities = Array.from({ length: cols }, ()  => 0.04 + Math.random() * 0.12);
    chars     = Array.from({ length: cols }, ()  => POOL[Math.floor(Math.random() * POOL.length)]);
    sizes     = Array.from({ length: cols }, ()  => FONT_SIZE - 1 + Math.floor(Math.random() * 4));
  }

  // ~8% of columns are permanent bright "star" streams
  let starCols = new Set();
  function makeStars() {
    starCols   = new Set();
    const n    = Math.floor((W / FONT_SIZE) * 0.08);
    while (starCols.size < n) starCols.add(Math.floor(Math.random() * cols));
  }

  function draw() {
    ctx.fillStyle = 'rgba(8,11,16,0.16)';
    ctx.fillRect(0, 0, W, H);

    const burst = scrollBurst;

    for (let i = 0; i < cols; i++) {
      const x      = i * FONT_SIZE;
      const y      = drops[i];
      const sz     = sizes[i];
      const isStar = starCols.has(i);

      // Randomly change character
      if (Math.random() < 0.018) {
        chars[i] = POOL[Math.floor(Math.random() * POOL.length)];
      }

      ctx.font          = `${sz}px 'JetBrains Mono', monospace`;
      ctx.textBaseline  = 'top';

      const flashing = burst > 0.25 && Math.random() < burst * 0.3;

      if (flashing) {
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur  = 20;
        ctx.fillStyle   = `rgba(180,255,200,${0.6 + burst * 0.4})`;
      } else if (isStar) {
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur  = 12;
        ctx.fillStyle   = `rgba(0,255,136,${opacities[i] * 1.6})`;
      } else {
        ctx.shadowBlur  = 0;
        ctx.fillStyle   = `rgba(0,255,136,${opacities[i]})`;
      }

      if (y > 0) ctx.fillText(chars[i], x, y);

      // Fading trail — 7 ghost copies above head
      ctx.shadowBlur = 0;
      for (let t = 1; t <= 7; t++) {
        const ty = y - t * (sz + 1);
        if (ty < 0) continue;
        const a = opacities[i] * (1 - t / 8) * (isStar ? 0.8 : 0.5);
        ctx.fillStyle = `rgba(0,${isStar ? 255 : 200},${isStar ? 136 : 100},${a})`;
        ctx.fillText(chars[i], x, ty);
      }

      // Advance drop; burst multiplies speed
      drops[i] += speeds[i] + burst * speeds[i] * 10;

      if (drops[i] > H + 80) {
        drops[i]     = -sz * (1 + Math.random() * 22);
        speeds[i]    = 0.45 + Math.random() * 1.4;
        opacities[i] = 0.04 + Math.random() * 0.12;
        chars[i]     = POOL[Math.floor(Math.random() * POOL.length)];
        sizes[i]     = FONT_SIZE - 1 + Math.floor(Math.random() * 4);
      }
    }

    scrollBurst *= 0.91; // decay burst each frame
    requestAnimationFrame(draw);
  }

  window.addEventListener('scroll', () => {
    const dy      = Math.abs(window.scrollY - lastScrollY);
    lastScrollY   = window.scrollY;
    scrollBurst   = Math.min(1, scrollBurst + dy / 180);

    // Brighten canvas while scrolling, fade back to idle when stopped
    canvas.classList.add('scrolling');
    clearTimeout(canvas._scrollTimer);
    canvas._scrollTimer = setTimeout(() => canvas.classList.remove('scrolling'), 800);
  }, { passive: true });

  window.addEventListener('resize', () => { resize(); makeStars(); });

  resize();
  makeStars();
  draw();
})();


/* ── SMOOTH NAV SCROLL ──────────────────────────────────────────────── */
function smoothNav(e, id) {
  e.preventDefault();

  const target = document.getElementById(id);
  if (!target) return;

  // Brief green flash on click
  const flash = document.getElementById('scroll-flash');
  flash.style.transition = 'opacity 0.08s ease';
  flash.style.opacity    = '0.1';
  setTimeout(() => {
    flash.style.transition = 'opacity 0.5s ease';
    flash.style.opacity    = '0';
  }, 120);

  const navH    = document.querySelector('nav').offsetHeight;
  const targetY = target.getBoundingClientRect().top + window.pageYOffset - navH - 20;
  const startY  = window.pageYOffset;
  const dist    = targetY - startY;

  if (Math.abs(dist) < 10) return; // already there — skip animation

  // Duration scales with distance: snappy for short jumps, smooth for long
  const dur = Math.min(650, Math.max(250, Math.abs(dist) * 0.4));
  let start = null;

  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    window.scrollTo(0, startY + dist * ease(p));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}


/* ── SCROLL FADE-IN ─────────────────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


/* ── ACTIVE NAV HIGHLIGHT ───────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[onclick]');

window.addEventListener('scroll', () => {
  const navH   = document.querySelector('nav').offsetHeight;
  let current  = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - navH - 40) current = sec.id;
  });

  navLinks.forEach(link =>
    link.classList.toggle('active', link.getAttribute('href') === '#' + current)
  );
}, { passive: true });


/* ── MOUSE PARALLAX ON ORBS ─────────────────────────────────────────── */
document.addEventListener('mousemove', (e) => {
  const x  = (e.clientX / window.innerWidth  - 0.5) * 20;
  const y  = (e.clientY / window.innerHeight - 0.5) * 20;
  const o1 = document.querySelector('.orb-1');
  const o2 = document.querySelector('.orb-2');
  if (o1) o1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  if (o2) o2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
});
