const canvas = document.getElementById("giftCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables de la caja
const box = {
  x: canvas.width / 2 - 50,
  y: canvas.height / 2 - 50,
  width: 100,
  height: 100,
  color: "#FF0000",
  ribbonColor: "#FFFFFF",
  isOpen: false,
};

// Array para las partículas de confeti
const confetti = [];
let messageVisible = false; // Controla si se muestra el mensaje

// Función para dibujar la caja
function drawBox() {
  // Dibujar la caja
  ctx.fillStyle = box.color;
  ctx.fillRect(box.x, box.y, box.width, box.height);

  // Dibujar el listón vertical
  ctx.fillStyle = box.ribbonColor;
  ctx.fillRect(box.x + box.width / 2 - 5, box.y, 10, box.height);

  // Dibujar el listón horizontal
  ctx.fillRect(box.x, box.y + box.height / 2 - 5, box.width, 10);

  // Si está abierta, dibujar la tapa
  if (box.isOpen) {
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y - 30, box.width, 20);
  }
}

// Función para crear partículas de confeti
function createConfetti() {
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: box.x + box.width / 2,
      y: box.y + box.height / 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      size: Math.random() * 5 + 2,
      velocityX: (Math.random() - 0.5) * 5,
      velocityY: Math.random() * -5 - 2,
      gravity: 0.05,
    });
  }
}

// Función para actualizar y dibujar el confeti
function updateConfetti() {
  confetti.forEach((particle, index) => {
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
    particle.velocityY += particle.gravity;

    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    // Eliminar confeti que salga del canvas
    if (particle.y > canvas.height || particle.x < 0 || particle.x > canvas.width) {
      confetti.splice(index, 1);
    }
  });
}

// Función para mostrar el mensaje
function showMessage() {
  if (messageVisible) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText("Feliz 26 años Mi amor", canvas.width / 2, canvas.height / 2 + 100);
  }
}

// Control del canvas
canvas.addEventListener("click", () => {
  if (!box.isOpen) {
    box.isOpen = true;
    createConfetti();
    messageVisible = true; // Mostrar el mensaje
  }
});

// Animación principal
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBox();
  updateConfetti();
  showMessage();
  requestAnimationFrame(animate);
}

animate();


// Función para agregar "likes"
function addLike(element) {
  const likeCount = element.querySelector('span');
  likeCount.textContent = parseInt(likeCount.textContent) + 1;
}

// Función para compartir en Facebook
function shareOnFacebook(imageUrl) {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
  window.open(facebookUrl, '_blank');
}

// Inicialización de Swiper.js (solo si estás usando Swiper)
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
