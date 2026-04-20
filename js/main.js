/* ================================================================
   Victor Olmedo — Dev & Trainer Portfolio
   main.js — Scroll reveal, tabs, libros, música, nav
================================================================ */

// Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 150);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(el => timelineObserver.observe(el));

  // Nav active state
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--yellow)' : '';
    });
  });

  // ── TABS ──
  document.querySelectorAll('.rd-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.rd-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.rd-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
  });

  // ── LIBROS — toggle inline ──
  function toggleBook(id) {
    const bk = document.getElementById(id);
    const isOpen = bk.classList.contains('open');
    // cerrar todos primero
    document.querySelectorAll('.bk').forEach(b => b.classList.remove('open'));
    if (!isOpen) bk.classList.add('open');
  }

  // ── MÚSICA ──
  function playArtist(el, name, emoji, genre, desc) {
    document.querySelectorAll('.music-item').forEach(i => i.classList.remove('playing'));
    el.classList.add('playing');
    document.getElementById('nowPlaying').textContent = name + ' — ' + genre;
    document.getElementById('musicDescEmoji').textContent = emoji;
    document.getElementById('musicDescArtist').textContent = name;
    document.getElementById('musicDescText').textContent = desc;
    document.getElementById('musicDescBox').style.display = 'flex';
  }

  // Easter egg en consola
  console.log('%c⚡ VICTOR OLMEDO — TEAM INSTINCT ⚡', 'font-family: monospace; font-size: 16px; color: #FFD700; background: #1a1a1a; padding: 8px 16px;');
  console.log('%cDev & Pokémon Trainer | PHP • Laravel • Rust • Linux', 'font-family: monospace; font-size: 12px; color: #757575;');