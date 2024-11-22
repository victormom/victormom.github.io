
// Función para abrir la caja de regalo con animación
function mostrarMensaje() {
    const mensaje = document.getElementById("mensaje");
    
    mensaje.style.display = "block";  // Mostrar el mensaje al hacer clic
    gsap.fromTo(mensaje, { opacity: 0 }, { opacity: 1, duration: 1 });  // Animación suave
     // Mostrar el mensaje
}


function abrirRegalo() {
    const tapa = document.querySelector(".tapa");
    const cintaHorizontal = document.querySelector(".cinta-horizontal");
    const cintaVertical = document.querySelector(".cinta-vertical");
    const cuerpo = document.querySelector(".cuerpo");
    const mensaje = document.getElementById("mensaje");

    // Animación de apertura usando GSAP
    gsap.to(tapa, { y: -200, rotationX: 120, duration: 1 });
    gsap.to(cuerpo, { opacity: 0, duration: 1 });

    // Animaciones para las cintas
    gsap.to(cintaHorizontal, { width: 0, duration: 0.5 });
    gsap.to(cintaVertical, { height: 0, duration: 0.5 });

    // Mostrar el mensaje después de que la caja se haya abierto
    setTimeout(() => {
        
    mensaje.style.display = "block";  // Mostrar el mensaje al hacer clic
    gsap.fromTo(mensaje, { opacity: 0 }, { opacity: 1, duration: 1 });  // Animación suave
    
    }, 1000);

    // Efecto de confeti
    confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
    });

    // Crear globos flotantes
    crearGlobos();
}

// Función para crear globos flotantes
function crearGlobos() {
    for (let i = 0; i < 5; i++) {
        const globo = document.createElement("div");
        globo.classList.add("globo");
        document.body.appendChild(globo);

        // Posicionar cada globo aleatoriamente
        globo.style.left = `${Math.random() * window.innerWidth}px`;

        // Hacer que cada globo flote con animación
        setTimeout(() => {
            globo.style.animation = "flotar 10s linear infinite";
        }, 100);
    }
}

// Guardar comentarios en un arreglo y generar el carrusel
const comentarios = [];

function guardarComentario() {
    const nombre = document.querySelector("input[name='nombre']").value;
    const mensaje = document.querySelector("textarea[name='mensaje']").value;

    if (nombre && mensaje) {
        comentarios.push({ nombre, mensaje });
        generarCarrusel();
        document.querySelector("input[name='nombre']").value = "";
        document.querySelector("textarea[name='mensaje']").value = "";
    }
}

function generarCarrusel() {
    const carrusel = document.querySelector(".carrusel");
    carrusel.innerHTML = ""; // Limpiar carrusel existente

    comentarios.forEach((comentario) => {
        const item = document.createElement("div");
        item.className = "carrusel-item";
        item.innerHTML = `<h3>${comentario.nombre}</h3><p>${comentario.mensaje}</p>`;
        carrusel.appendChild(item);
    });
}
