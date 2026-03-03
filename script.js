/* ══════════════════════════════════════════════════
   JDVEX INDUSTRIES PVT. LTD. — VANILLA JS
   ══════════════════════════════════════════════════ */

'use strict';

(function () {

  /* ── DOM CACHE ──────────────────────────────────── */
  const header      = document.getElementById('site-header');
  const hamburger   = document.getElementById('hamburger');
  const navLinks    = document.getElementById('nav-links');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sections    = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contact-form');
  const formStatus  = document.getElementById('form-status');
  const footerYear  = document.getElementById('footer-year');
  const statNums    = document.querySelectorAll('.stat-num[data-target]');
  const logoImg     = document.getElementById('logo-img');
  const logoFallback = document.getElementById('logo-fallback');
  const aboutImg    = document.getElementById('about-img');
  const aboutVisual = aboutImg ? aboutImg.closest('.about-visual') : null;
  const heroBg      = document.getElementById('hero-bg');

  /* ── YEAR ───────────────────────────────────────── */
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  /* ── LOGO IMAGE FALLBACK ────────────────────────── */
  if (logoImg && logoFallback) {
    logoImg.addEventListener('error', function () {
      logoImg.style.display = 'none';
      logoFallback.style.display = 'flex';
    });
    // If the browser already has an error (cached)
    if (logoImg.complete && !logoImg.naturalWidth) {
      logoImg.style.display = 'none';
      logoFallback.style.display = 'flex';
    }
  }

  /* ── ABOUT IMAGE FALLBACK ───────────────────────── */
  if (aboutImg && aboutVisual) {
    aboutImg.addEventListener('error', function () {
      aboutVisual.classList.add('no-img');
    });
    if (aboutImg.complete && !aboutImg.naturalWidth) {
      aboutVisual.classList.add('no-img');
    }
  }

  /* ── HERO BG FALLBACK ───────────────────────────── */
  // If hero image fails, the CSS overlay gradient provides a fallback background
  if (heroBg) {
    heroBg.addEventListener('error', function () {
      heroBg.style.display = 'none';
    });
  }

  /* ── GALLERY IMAGE FALLBACK ─────────────────────── */
  // Show placeholder if gallery images fail to load
  document.querySelectorAll('.gallery-item img').forEach(function (img) {
    function showPlaceholder() {
      img.style.display = 'none';
      const placeholder = img.parentElement.querySelector('.gallery-placeholder');
      if (placeholder) placeholder.style.display = 'flex';
    }
    img.addEventListener('error', showPlaceholder);
    if (img.complete && !img.naturalWidth) showPlaceholder();
  });

  /* ── SERVICE ICON FALLBACK ──────────────────────── */
  document.querySelectorAll('.svc-icon-img').forEach(function (img) {
    function showFallback() {
      img.style.display = 'none';
      const fallback = img.parentElement.querySelector('.svc-icon-fallback');
      if (fallback) fallback.style.display = 'flex';
    }
    img.addEventListener('error', showFallback);
    if (img.complete && !img.naturalWidth) showFallback();
  });

  /* ── STICKY HEADER ──────────────────────────────── */
  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── HAMBURGER MENU ─────────────────────────────── */
  function openMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) { closeMenu(); } else { openMenu(); }
  });

  // Close menu on nav link click
  navLinks.addEventListener('click', function (e) {
    if (e.target.classList.contains('nav-link') || e.target.classList.contains('nav-cta')) {
      closeMenu();
    }
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ── ACTIVE NAV HIGHLIGHT ───────────────────────── */
  function setActiveLink() {
    const scrollPos = window.scrollY + 120;
    let currentSection = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.id;
      }
    });

    allNavLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ── SCROLL REVEAL ──────────────────────────────── */
  // Add reveal class to elements that should animate in
  const revealTargets = [
    { sel: '#about .about-visual',         delay: 0 },
    { sel: '#about .about-content',        delay: 0 },
    { sel: '#about .pillar',               delay: 'stagger' },
    { sel: '.service-card',                delay: 'stagger' },
    { sel: '.why-item',                    delay: 'stagger' },
    { sel: '.gallery-item',               delay: 'stagger' },
    { sel: '#contact .contact-form-wrap', delay: 0 },
    { sel: '#contact .contact-info-wrap', delay: 1 },
    { sel: '#why-us .why-text',           delay: 0 },
    { sel: '#why-us .why-list',           delay: 0 },
    { sel: '.section-header.center',      delay: 0 },
  ];

  revealTargets.forEach(function (target) {
    const elements = document.querySelectorAll(target.sel);
    elements.forEach(function (el, i) {
      el.classList.add('reveal');
      if (target.delay === 'stagger') {
        el.style.transitionDelay = (i * 0.08) + 's';
      } else if (typeof target.delay === 'number' && target.delay > 0) {
        el.classList.add('reveal-delay-' + target.delay);
      }
    });
  });

  // IntersectionObserver for reveal
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── COUNTER ANIMATION ──────────────────────────── */
  function easeOutQuad(t) { return t * (2 - t); }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(easeOutQuad(progress) * target);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(tick);
  }

  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(function (num) {
    statsObserver.observe(num);
  });

  /* ── SMOOTH SCROLL ──────────────────────────────── */
  // CSS scroll-behavior handles most cases; this ensures offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ── CONTACT FORM ───────────────────────────────── */
  function validateForm(form) {
    let isValid = true;
    const required = form.querySelectorAll('[required]');

    required.forEach(function (field) {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        isValid = false;
      }
    });

    // Phone format — basic check
    const phone = form.querySelector('#phone');
    if (phone && phone.value.trim()) {
      const digits = phone.value.replace(/\D/g, '');
      if (digits.length < 10) {
        phone.classList.add('error');
        isValid = false;
      }
    }

    return isValid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm(contactForm)) {
        formStatus.textContent = 'Please fill in all required fields correctly.';
        formStatus.className = 'form-note error-msg';
        return;
      }

      // Simulate form submission (replace with your actual endpoint or mailto action)
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      formStatus.textContent = '';
      formStatus.className = 'form-note';

      setTimeout(function () {
        // SUCCESS STATE
        formStatus.textContent = '✓ Your enquiry has been sent. We\'ll respond within 24 hours.';
        formStatus.className = 'form-note success';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Enquiry <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

        // Reset status message after 6 seconds
        setTimeout(function () {
          formStatus.textContent = '';
          formStatus.className = 'form-note';
        }, 6000);
      }, 1200);

      /*
       * ─────────────────────────────────────────────
       * TO HOOK UP A REAL BACKEND:
       * Replace the setTimeout above with a fetch() call:
       *
       * const formData = new FormData(contactForm);
       * fetch('YOUR_FORM_ENDPOINT_URL', {
       *   method: 'POST',
       *   body: formData
       * })
       * .then(res => res.json())
       * .then(data => {
       *   formStatus.textContent = '✓ Enquiry sent successfully!';
       *   formStatus.className = 'form-note success';
       *   contactForm.reset();
       * })
       * .catch(err => {
       *   formStatus.textContent = 'Something went wrong. Please call us directly.';
       *   formStatus.className = 'form-note error-msg';
       * })
       * .finally(() => { submitBtn.disabled = false; });
       * ─────────────────────────────────────────────
       */
    });

    // Live field validation on blur
    contactForm.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('blur', function () {
        if (field.hasAttribute('required') && !field.value.trim()) {
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      field.addEventListener('input', function () {
        if (field.classList.contains('error') && field.value.trim()) {
          field.classList.remove('error');
        }
      });
    });
  }

  /* ── GALLERY LIGHTBOX (SIMPLE) ──────────────────── */
  // Creates a minimal fullscreen overlay when clicking a gallery item
  const galleryItems = document.querySelectorAll('.gallery-item');

  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Project image viewer');
  lightbox.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:9999',
    'background:rgba(17,29,46,0.97)',
    'display:none',
    'align-items:center',
    'justify-content:center',
    'flex-direction:column',
    'gap:20px',
    'padding:24px',
    'cursor:zoom-out',
    'backdrop-filter:blur(8px)',
  ].join(';');

  const lbImg = document.createElement('img');
  lbImg.style.cssText = [
    'max-width:90vw',
    'max-height:80vh',
    'object-fit:contain',
    'border-radius:8px',
    'border:1px solid rgba(255,255,255,0.1)',
    'box-shadow:0 24px 80px rgba(0,0,0,0.6)',
    'pointer-events:none',
  ].join(';');
  lbImg.alt = '';

  const lbCaption = document.createElement('div');
  lbCaption.style.cssText = [
    'text-align:center',
    'color:rgba(168,188,207,0.9)',
    'font-family:var(--font-body)',
    'font-size:0.85rem',
    'letter-spacing:0.04em',
  ].join(';');

  const lbClose = document.createElement('button');
  lbClose.setAttribute('aria-label', 'Close image viewer');
  lbClose.style.cssText = [
    'position:absolute',
    'top:20px',
    'right:24px',
    'background:rgba(255,255,255,0.08)',
    'border:1px solid rgba(255,255,255,0.15)',
    'border-radius:6px',
    'color:#fff',
    'width:40px',
    'height:40px',
    'cursor:pointer',
    'font-size:1.2rem',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'transition:background 0.2s',
  ].join(';');
  lbClose.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  lightbox.appendChild(lbImg);
  lightbox.appendChild(lbCaption);
  lightbox.appendChild(lbClose);
  document.body.appendChild(lightbox);

  function openLightbox(imgSrc, captionText) {
    if (!imgSrc) return;
    lbImg.src = imgSrc;
    lbCaption.textContent = captionText || '';
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const img = item.querySelector('img');
      if (!img || !img.naturalWidth) return; // don't open placeholder
      const title = item.dataset.title || '';
      const tag = item.dataset.tag || '';
      openLightbox(img.src, tag ? tag + '  ·  ' + title : title);
    });
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') closeLightbox();
  });

  /* ── PARALLAX HERO (SUBTLE) ─────────────────────── */
  if (heroBg) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      const heroHeight = document.getElementById('hero').offsetHeight;
      if (scrolled < heroHeight) {
        heroBg.style.transform = 'translateY(' + (scrolled * 0.35) + 'px)';
      }
    }, { passive: true });
  }

})();