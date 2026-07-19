// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Respect reduced motion preference
// =========================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// =========================================================
// Typed tagline effect
// =========================================================
const typedEl = document.getElementById('typedLine');
const taglineText = 'currently building fintech systems at TCS Digital';

function typeTagline() {
  if (prefersReducedMotion) {
    typedEl.textContent = taglineText;
    return;
  }
  let i = 0;
  const interval = setInterval(() => {
    typedEl.textContent = taglineText.slice(0, i + 1);
    i++;
    if (i >= taglineText.length) clearInterval(interval);
  }, 32);
}
typeTagline();

// =========================================================
// Scroll reveal for .reveal elements
// =========================================================
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add('in-view'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}

// =========================================================
// Active nav link on scroll
// =========================================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let currentId = '';
  const scrollPos = window.scrollY + 140;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    const targetId = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', targetId === currentId);
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();