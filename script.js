/* ==========================================================================
   script.js — Portfolio Interactive Layer
   Author: Sein Hilamovi Ramadhan
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     1. Scroll-aware Header
     Hide on scroll-down, reveal on scroll-up
  ------------------------------------------------------------------ */
  const header = document.getElementById('site-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 80) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ------------------------------------------------------------------
     2. IntersectionObserver — Reveal animations on scroll
     Adds .is-visible to .reveal-item elements as they enter viewport
  ------------------------------------------------------------------ */
  const revealItems = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => observer.observe(item));
  } else {
    // Fallback: show everything immediately if IO not supported
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  /* ------------------------------------------------------------------
     3. Staggered manifesto line delays
     Applies progressive delays so lines animate one after another
  ------------------------------------------------------------------ */
  const manifestoLines = document.querySelectorAll('.manifesto-line');
  manifestoLines.forEach((line, i) => {
    line.style.transitionDelay = `${i * 0.15}s`;
  });

  /* ------------------------------------------------------------------
     4. Active nav link highlighting
     Marks the nav link whose section is currently in view
  ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    }, {
      threshold: 0.4
    });

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ------------------------------------------------------------------
     5. Close mobile menu when a nav link is clicked
  ------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menu-toggle');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle && menuToggle.checked) {
        menuToggle.checked = false;
      }
    });
  });

  /* ------------------------------------------------------------------
     6. Hero load animation — trigger after first paint
  ------------------------------------------------------------------ */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    requestAnimationFrame(() => {
      heroContent.classList.add('hero-loaded');
    });
  }

});
