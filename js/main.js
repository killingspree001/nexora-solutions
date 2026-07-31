// Nexora Solutions site scripts

const header = document.querySelector('.site-header');
const nav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
const navLinks = nav.querySelectorAll('a[href^="#"]');

// solid header once the page is scrolled
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// mobile menu
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// close the menu after tapping a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// highlight the nav link for the section in view
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// fade sections in as they enter the viewport
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// animated counters in the about section
function runCounter(el) {
  const target = +el.dataset.count;
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    // ease out so it slows near the end
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// contact form
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.name;
  const email = form.email;
  const message = form.message;
  let valid = true;

  [name, email, message].forEach(field => {
    field.classList.remove('error');
    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    }
  });

  // simple email check, enough for a contact form
  if (email.value.trim() && !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
    email.classList.add('error');
    valid = false;
  }

  if (!valid) {
    status.textContent = 'Please fill in all fields correctly.';
    status.className = 'form-status err';
    return;
  }

  // no backend on this build, hook this up to your form handler or email service
  status.textContent = "Thanks " + name.value.trim().split(' ')[0] + "! Your message has been sent, we'll get back to you soon.";
  status.className = 'form-status ok';
  form.reset();
});

// keep the footer year current
document.getElementById('year').textContent = new Date().getFullYear();
