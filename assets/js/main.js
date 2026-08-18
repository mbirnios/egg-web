/* El Gordo Gekko — site behavior. No dependencies. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── current year ─────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── sticky nav ───────────────────────────────────────────── */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── mobile menu ──────────────────────────────────────────── */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function closeMenu() {
    if (!links) return;
    links.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
  }

  /* ── active section in nav ────────────────────────────────── */
  var navAnchors = links ? Array.prototype.slice.call(links.querySelectorAll('a[href^="#"]')) : [];
  var sections = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── reveal on scroll ─────────────────────────────────────── */
  var revealables = document.querySelectorAll(
    '.section .kicker, .section .h2, .section .lead, .figure-frame, ' +
    '.prose, .creed__inner, .autor__pic, .shot, .status__body, .note'
  );

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }

  /* ── cinta decorativa ─────────────────────────────────────────
     Solo ilustrativa: no son cotizaciones, posiciones ni resultados. */
  var tape = document.getElementById('tapeTrack');
  if (tape) {
    var items = [
      ['GRID', 'escalón 4 ejecutado', 'up'],
      ['ÓRDENES', 'solo límite', ''],
      ['GRID', 'round trip cerrado', 'up'],
      ['GRID', 'compra en 14,20', 'up'],
      ['IOL API', 'invertironline · conectado', 'up'],
      ['GRID', 'escalón recolocado', ''],
      ['GRID', 'venta con piso en el costo', ''],
      ['CORTO', 'nunca', ''],
      ['COMISIONES', 'siempre incluidas', 'dn'],
      ['PACIENCIA', 'el activo más escaso', ''],
      ['ESTADO', 'experimento · no público', '']
    ];

    var html = items.map(function (it) {
      var cls = it[2] ? ' class="' + it[2] + '"' : '';
      return '<span><b>' + it[0] + '</b> <span' + cls + '>' + it[1] + '</span></span>';
    }).join('');

    tape.innerHTML = html + html; // duplicated for a seamless -50% loop
  }

  /* ── gallery lightbox ─────────────────────────────────────── */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lastFocus = null;

  function openLightbox(img) {
    if (!lightbox || !lightboxImg) return;
    lastFocus = document.activeElement;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function hideLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll('#gallery .shot, .zoomable'), function (fig) {
    var img = fig.querySelector('img');
    if (!img) return;
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', 'Ampliar imagen');
    fig.addEventListener('click', function () { openLightbox(img); });
    fig.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', hideLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) hideLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightbox && !lightbox.hidden) hideLightbox();
      closeMenu();
    }
  });
})();
