// Función para abrir la caja de regalo con globos y confeti
function abrirRegalo() {
    const tapa = document.querySelector(".tapa");
    const mensaje = document.getElementById("mensaje");

    // Animación de apertura de la tapa
    gsap.to(tapa, { y: -200, rotationX: 120, duration: 1 });

    // Confeti y globos
    setTimeout(() => {
        lanzarConfeti();
        lanzarGlobos();
    }, 800);

    // Mostrar el mensaje
    setTimeout(() => {
        mensaje.style.display = "block";
        gsap.fromTo(mensaje, { opacity: 0 }, { opacity: 1, duration: 1 });
    }, 1000);
}

function lanzarConfeti() {
    confetti({ particleCount: 100, spread: 60 });
}

function lanzarGlobos() {
    const body = document.body;
    for (let i = 0; i < 8; i++) {
        const globo = document.createElement("div");
        globo.className = "globo";
        globo.style.left = `${Math.random() * 100}vw`;
        globo.style.animationDelay = `${Math.random() * 2}s`;
        body.appendChild(globo);
        setTimeout(() => body.removeChild(globo), 5000);
    }
}

// Carrusel de imágenes
let currentIndex = 0;

function moverCarrusel(direccion) {
    const carrusel = document.querySelector(".carrusel-imagenes");
    const items = document.querySelectorAll(".carrusel-item");
    currentIndex += direccion;

    if (currentIndex < 0) currentIndex = items.length - 1;
    if (currentIndex >= items.length) currentIndex = 0;

    carrusel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Comentarios dinámicos
function guardarComentario() {
    const nombre = document.querySelector("input[name='nombre']").value;
    const mensaje = document.querySelector("textarea[name='mensaje']").value;

    if (nombre && mensaje) {
        const carrusel = document.querySelector(".carrusel-comentarios");
        const item = document.createElement("div");
        item.className = "comentario-item";
        item.innerHTML = `<h3>${nombre}</h3><p>${mensaje}</p>`;
        carrusel.appendChild(item);

        document.querySelector("input[name='nombre']").value = "";
        document.querySelector("textarea[name='mensaje']").value = "";
    }
}
