// Canvas
const canvas = document.getElementById('giftCanvas');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del canvas
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const box = {
  x: canvas.width / 2 - 50,
  y: canvas.height / 2 - 50,
  width: 100,
  height: 100,
  color: "#FF0000",
  isOpen: false,
};

const confetti = [];
let showMessage = false;

function drawBox() {
  ctx.fillStyle = box.color;
  ctx.fillRect(box.x, box.y, box.width, box.height);

  if (box.isOpen) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(box.x, box.y - 30, box.width, 20);
  }
}

function createConfetti() {
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: box.x + box.width / 2,
      y: box.y,
      size: Math.random() * 5 + 2,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * -5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    });
  }
}

function updateConfetti() {
  confetti.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.1; // Gravedad
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    if (particle.y > canvas.height) confetti.splice(index, 1);
  });
}

canvas.addEventListener('click', () => {
  if (!box.isOpen) {
    box.isOpen = true;
    createConfetti();
    showMessage = true;
  }
});

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBox();
  updateConfetti();
  if (showMessage) {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText("¡Feliz 26 años!", canvas.width / 2, canvas.height / 2 + 100);
  }
  requestAnimationFrame(animateCanvas);
}

animateCanvas();

// Swiper
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20, // Espacio entre las tarjetas
  centeredSlides: true, // Centra la tarjeta activa
  loop: true, // Habilita el bucle del carrusel
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // Permite hacer clic en los puntos
  },
  slideToClickedSlide: true, // Permite hacer clic en las tarjetas para ir a ellas
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
  },
});
