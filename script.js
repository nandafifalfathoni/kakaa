/* ===== MEMORIES WEBSITE — SCRIPT ===== */

document.addEventListener('DOMContentLoaded', () => {
  initIntro();
  initParticles('introParticles', 25);
  initParticles('closingParticles', 20);
  initScrollReveal();
  duplicateCarousel();
  init3DCards();
});

/* ===== 3D TILT EFFECT ===== */
function init3DCards() {
  if (typeof VanillaTilt === 'undefined') return;
  
  VanillaTilt.init(document.querySelectorAll(".photo-frame, .quote-card, .timeline-card, .letter-card"), {
    max: 8,
    speed: 400,
    glare: true,
    "max-glare": 0.15,
    scale: 1.02,
  });
}

/* ===== INTRO ANIMATION ===== */
function initIntro() {
  const intro = document.getElementById('intro-screen');
  const main = document.getElementById('mainContent');
  const bar = document.getElementById('introLoaderBar');
  const heart = document.getElementById('introHeart');

  let progress = 0;
  const duration = 3800;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    progress = Math.min(elapsed / duration, 1);
    bar.style.width = (progress * 100) + '%';

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      // Start heartbeat before exit
      heart.style.animation = 'heartAppear 0s forwards, starPulse 3s 0s infinite';
      setTimeout(() => {
        intro.classList.add('fade-out');
        main.classList.remove('main-hidden');
        main.classList.add('main-visible');
        // Remove intro from DOM after transition
        setTimeout(() => { intro.remove(); }, 1400);
      }, 800);
    }
  }

  requestAnimationFrame(tick);
}

/* ===== PARTICLE SYSTEM ===== */
function initParticles(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add(containerId === 'introParticles' ? 'intro-particle' : 'closing-particle');
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.animationDelay = (Math.random() * 6) + 's';
    p.style.animationDuration = (Math.random() * 4 + 4) + 's';
    container.appendChild(p);
  }
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ===== DUPLICATE CAROUSEL FOR INFINITE SCROLL ===== */
function duplicateCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  const items = track.innerHTML;
  track.innerHTML += items; // duplicate for seamless loop
}
