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
// ================================================================
//  POKÉMON NAV — active state por scroll
// ================================================================
const pokeNavItems = document.querySelectorAll('.poke-nav-item[href^="#"]');
const allSections  = document.querySelectorAll('section[id], div[id]');

window.addEventListener('scroll', () => {
  let cur = '';
  allSections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  pokeNavItems.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}, { passive: true });

// ================================================================
//  TUX RUNNER — mostrar sección
// ================================================================
document.getElementById('navTuxBtn').addEventListener('click', e => {
  e.preventDefault();
  const sec = document.querySelector('.tux-section');
  sec.classList.add('visible');
  sec.scrollIntoView({ behavior: 'smooth' });
  setTimeout(initTux, 400);
});

// ================================================================
//  OFFLINE DETECTION
// ================================================================
function showOfflineBanner() {
  let banner = document.getElementById('offlineBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'offlineBanner';
    banner.className = 'offline-banner';
    banner.innerHTML = '🐧 SIN INTERNET — JUEGA CON TUX';
    banner.onclick = () => {
      const sec = document.querySelector('.tux-section');
      sec.classList.add('visible');
      sec.scrollIntoView({ behavior: 'smooth' });
      setTimeout(initTux, 400);
      banner.style.display = 'none';
    };
    document.body.appendChild(banner);
  }
  banner.style.display = 'block';
}

window.addEventListener('offline', showOfflineBanner);
if (!navigator.onLine) showOfflineBanner();

// ================================================================
//  TUX RUNNER — GAME ENGINE
// ================================================================
let tuxGame = null;

function initTux() {
  if (tuxGame && tuxGame.running) return;

  const canvas = document.getElementById('tuxCanvas');
  const ctx    = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const GROUND = H - 40;

  // ── Paleta ──
  const C = {
    bg:      '#0d1117',
    ground:  '#52BF41',
    ground2: '#A2D92B',
    sky:     '#049DD9',
    star:    '#F2F2F2',
    obs:     '#1570BF',
    obs2:    '#049DD9',
    tux:     '#0d1117',
    tuxBelly:'#F2F2F2',
    tuxBeak: '#E8A000',
    score:   '#F2F2F2',
  };

  // ── Estrellas de fondo ──
  const stars = Array.from({length:30}, () => ({
    x: Math.random() * W,
    y: Math.random() * (GROUND - 60),
    r: Math.random() * 1.5 + 0.5,
    blink: Math.random()
  }));

  // ── Estado ──
  let state = 'idle'; // idle | running | dead
  let score = 0, hiScore = +localStorage.getItem('tuxHi') || 0;
  let frame = 0, speed = 5, spawnTimer = 0, spawnInterval = 90;
  let obstacles = [], clouds = [];
  let animId = null;

  // ── Tux ──
  const tux = {
    x: 80, y: GROUND, w: 38, h: 48,
    vy: 0, onGround: true,
    legPhase: 0,
    jump() {
      if (this.onGround) { this.vy = -14; this.onGround = false; }
    }
  };

  // ── Nubes ──
  for (let i = 0; i < 4; i++) clouds.push({ x: Math.random()*W, y: 30 + Math.random()*60, w: 60+Math.random()*60, speed: 0.4+Math.random()*0.4 });

  // ── Dibujar Tux (SVG-style en canvas) ──
  function drawTux() {
    const x = tux.x, y = tux.y - tux.h, w = tux.w, h = tux.h;
    const leg = Math.sin(tux.legPhase) * 5;

    ctx.save();

    // Patas
    ctx.fillStyle = C.tuxBeak;
    if (tux.onGround) {
      ctx.fillRect(x+7, y+h-8, 10, 6);
      ctx.fillRect(x+18, y+h-8+leg, 10, 6);
    } else {
      ctx.fillRect(x+5, y+h-6, 12, 5);
      ctx.fillRect(x+20, y+h-6, 12, 5);
    }

    // Cuerpo
    ctx.fillStyle = C.tux;
    ctx.beginPath();
    ctx.ellipse(x+w/2, y+h*0.55, w/2-1, h*0.42, 0, 0, Math.PI*2);
    ctx.fill();

    // Barriga blanca
    ctx.fillStyle = C.tuxBelly;
    ctx.beginPath();
    ctx.ellipse(x+w/2, y+h*0.58, w/2-6, h*0.32, 0, 0, Math.PI*2);
    ctx.fill();

    // Cabeza
    ctx.fillStyle = C.tux;
    ctx.beginPath();
    ctx.ellipse(x+w/2, y+h*0.22, w/2-2, h*0.22, 0, 0, Math.PI*2);
    ctx.fill();

    // Ojos
    ctx.fillStyle = C.tuxBelly;
    ctx.beginPath(); ctx.arc(x+w/2-5, y+h*0.18, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+w/2+5, y+h*0.18, 4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = C.tux;
    ctx.beginPath(); ctx.arc(x+w/2-5, y+h*0.18, 2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+w/2+5, y+h*0.18, 2, 0, Math.PI*2); ctx.fill();

    // Pico
    ctx.fillStyle = C.tuxBeak;
    ctx.beginPath();
    ctx.moveTo(x+w/2-4, y+h*0.26);
    ctx.lineTo(x+w/2+4, y+h*0.26);
    ctx.lineTo(x+w/2, y+h*0.32);
    ctx.fill();

    // Alitas
    ctx.fillStyle = C.tux;
    ctx.beginPath();
    ctx.ellipse(x+3, y+h*0.52, 7, 14, -0.3, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x+w-3, y+h*0.52, 7, 14, 0.3, 0, Math.PI*2);
    ctx.fill();

    ctx.restore();
  }

  // ── Dibujar obstáculo (servidores Apache / cubos pixel) ──
  function drawObs(o) {
    ctx.save();
    // cuerpo
    ctx.fillStyle = o.color;
    ctx.fillRect(o.x, GROUND - o.h, o.w, o.h);
    // detalle pixel
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(o.x+4, GROUND-o.h+4, o.w-8, 6);
    ctx.fillRect(o.x+4, GROUND-o.h+14, o.w-8, 4);
    // borde
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(o.x, GROUND-o.h, o.w, o.h);
    // etiqueta
    ctx.fillStyle = '#F2F2F2';
    ctx.font = '7px monospace';
    ctx.fillText(o.label, o.x + 3, GROUND - 6);
    ctx.restore();
  }

  // ── Dibujar nube ──
  function drawCloud(c) {
    ctx.save();
    ctx.fillStyle = 'rgba(4,157,217,0.12)';
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.w/2, 16, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(c.x-c.w/4, c.y+6, c.w/3, 12, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(c.x+c.w/4, c.y+4, c.w/3.5, 11, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  // ── Spawn obstáculo ──
  const obsTypes = [
    { w:22, h:45, color:'#1570BF', label:'PHP' },
    { w:28, h:55, color:'#049DD9', label:'SQL' },
    { w:20, h:38, color:'#52BF41', label:'BUG' },
    { w:24, h:65, color:'#B7410E', label:'ERR' },
    { w:18, h:42, color:'#4a148c', label:'404' },
  ];
  function spawnObs() {
    const t = obsTypes[Math.floor(Math.random()*obsTypes.length)];
    obstacles.push({ x: W+10, y: GROUND-t.h, w: t.w, h: t.h, color: t.color, label: t.label });
  }

  // ── Actualizar UI ──
  function updateUI() {
    document.getElementById('tuxScore').textContent = String(Math.floor(score)).padStart(5,'0');
    document.getElementById('tuxHi').textContent    = String(hiScore).padStart(5,'0');
  }

  // ── Colisión AABB ──
  function collides(a, b) {
    const margin = 8;
    return a.x+margin < b.x+b.w && a.x+a.w-margin > b.x &&
           a.y+margin < b.y+b.h && a.y+a.h-margin > b.y;
  }

  // ── Render ──
  function render() {
    // Fondo
    ctx.fillStyle = C.bg;
    ctx.fillRect(0,0,W,H);

    // Estrellas parpadeantes
    stars.forEach(s => {
      s.blink += 0.02;
      const alpha = 0.3 + 0.4*Math.abs(Math.sin(s.blink));
      ctx.fillStyle = `rgba(242,242,242,${alpha})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
    });

    // Nubes
    clouds.forEach(c => { drawCloud(c); });

    // Suelo principal
    ctx.fillStyle = C.ground;
    ctx.fillRect(0, GROUND, W, 8);
    ctx.fillStyle = C.ground2;
    ctx.fillRect(0, GROUND+8, W, 4);
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(0, GROUND+12, W, H-GROUND-12);

    // Líneas punteadas del suelo
    ctx.setLineDash([12,14]);
    ctx.strokeStyle = 'rgba(4,157,217,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, GROUND+20); ctx.lineTo(W, GROUND+20); ctx.stroke();
    ctx.setLineDash([]);

    // Obstáculos
    obstacles.forEach(o => drawObs(o));

    // Tux
    drawTux();

    // Score en canvas (pequeño)
    if (state === 'running') {
      ctx.fillStyle = 'rgba(242,242,242,0.3)';
      ctx.font = '10px monospace';
      ctx.fillText('🐧 TUX RUNNER', 12, 20);
    }
  }

  // ── Game loop ──
  function loop() {
    frame++;

    // Física Tux
    if (!tux.onGround) {
      tux.vy += 0.7;
      tux.y  += tux.vy;
      if (tux.y >= GROUND) { tux.y = GROUND; tux.vy = 0; tux.onGround = true; }
    }
    if (tux.onGround) tux.legPhase += 0.25;

    // Nubes
    clouds.forEach(c => { c.x -= c.speed; if (c.x < -c.w) c.x = W + c.w; });

    // Obstáculos
    spawnTimer++;
    if (spawnTimer >= spawnInterval) { spawnObs(); spawnTimer = 0; spawnInterval = Math.max(40, spawnInterval - 0.5); }
    obstacles.forEach(o => { o.x -= speed; });
    obstacles = obstacles.filter(o => o.x + o.w > 0);

    // Score
    score += 0.1;
    speed = 5 + Math.floor(score/50) * 0.5;
    if (Math.floor(score) > hiScore) { hiScore = Math.floor(score); localStorage.setItem('tuxHi', hiScore); }
    updateUI();

    // Colisiones
    const tuxBox = { x: tux.x, y: tux.y - tux.h, w: tux.w, h: tux.h };
    for (const o of obstacles) {
      if (collides(tuxBox, { x:o.x, y:o.y, w:o.w, h:o.h })) {
        state = 'dead';
        showMsg('💀 GAME OVER — PRESIONA ESPACIO');
        render();
        return;
      }
    }

    render();
    animId = requestAnimationFrame(loop);
  }

  function showMsg(txt) {
    const el = document.getElementById('tuxMsg');
    el.textContent = txt;
    el.style.display = 'flex';
  }

  function startGame() {
    if (state === 'running') return;
    // reset
    state = 'running';
    score = 0; speed = 5; frame = 0;
    spawnTimer = 0; spawnInterval = 90;
    obstacles = [];
    tux.y = GROUND; tux.vy = 0; tux.onGround = true;
    document.getElementById('tuxMsg').style.display = 'none';
    if (animId) cancelAnimationFrame(animId);
    loop();
  }

  // Controles
  document.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      if (state === 'idle' || state === 'dead') startGame();
      else tux.jump();
    }
  });
  canvas.addEventListener('click', () => {
    if (state === 'idle' || state === 'dead') startGame();
    else tux.jump();
  });
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (state === 'idle' || state === 'dead') startGame();
    else tux.jump();
  }, { passive: false });

  // render inicial
  updateUI();
  render();
  tuxGame = { running: true };
}
