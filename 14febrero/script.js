// Frases a mostrar en los globos
const phraseTop = "TE AMO";
const phraseMiddle = "MARIA";
const phraseBottom = "GUADALUPE";
const heartsContainerTop = document.getElementById('hearts-container-top');
const heartsContainerMiddle = document.getElementById('hearts-container-middle');
const heartsContainerBottom = document.getElementById('hearts-container-bottom');

// Función para crear globos con letras
function createBalloons(phrase, container) {
  phrase.split('').forEach((letter, index) => {
    setTimeout(() => {
      // Si la letra es un espacio, no crear un globo
      if (letter === ' ') {
        const space = document.createElement('div');
        space.style.width = '20px'; // Ancho del espacio
        container.appendChild(space);
      } else {
        // Crear el globo
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = Math.random() * 80 + 10 + 'vw'; // Posición horizontal aleatoria (centrada)
        balloon.style.animationDuration = Math.random() * 5 + 10 + 's'; // Velocidad aleatoria

        // Crear el corazón (globo)
        const heart = document.createElement('div');
        heart.classList.add('heart');

        // Crear la colita del globo
        const tail = document.createElement('div');
        tail.classList.add('tail');

        // Crear la letra dentro del globo
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');
        letterDiv.innerText = letter;

        // Agregar elementos al globo
        heart.appendChild(letterDiv);
        balloon.appendChild(heart);
        balloon.appendChild(tail);

        // Agregar el globo al contenedor
        container.appendChild(balloon);

        // Cuando termine la animación, ordenar los globos y agregar animación suave
        balloon.addEventListener('animationend', () => {
          balloon.style.animation = 'none'; // Detener la animación inicial
          balloon.classList.add('final'); // Agregar animación suave
          balloon.style.position = 'static'; // Cambiar a posición estática
          balloon.style.transform = 'translateY(-10vh)'; // Mover a la parte superior
          balloon.style.left = 'auto'; // Resetear la posición horizontal
          balloon.style.margin = '0 5px'; // Espaciado entre globos
        });
      }
    }, index * 500); // Retraso para crear cada globo
  });
}

// Crear globos para las frases
createBalloons(phraseTop, heartsContainerTop);

// En móvil, crear globos para las tres líneas
if (window.innerWidth <= 600) {
  createBalloons(phraseMiddle, heartsContainerMiddle);
  createBalloons(phraseBottom, heartsContainerBottom);
} else {
  // En PC, crear globos para la segunda línea ("MARIA GUADALUPE")
  createBalloons(phraseMiddle + " " + phraseBottom, heartsContainerBottom);
}

// Slider de frases
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? 1 : 0;
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Cambia de slide cada 5 segundos
showSlide(currentSlide);