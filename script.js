document.addEventListener("DOMContentLoaded", function() {
    // Inicializar Swiper para el carrusel de imágenes
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    // Inicializar Swiper para el carrusel de comentarios
    var swiperComentarios = new Swiper('.swiper-container-comentarios', {
        loop: true,
        navigation: {
            nextEl: '.swiper-container-comentarios .swiper-button-next',
            prevEl: '.swiper-container-comentarios .swiper-button-prev',
        },
        pagination: {
            el: '.swiper-container-comentarios .swiper-pagination',
            clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
    });

    // Función para abrir la caja de regalo
    const cajaRegalo = document.getElementById("caja-regalo");
    const mensaje = document.getElementById("mensaje");

    cajaRegalo.addEventListener("click", function() {
        // Añadir clase para animar la apertura
        cajaRegalo.classList.add("abierta");
        // Mostrar el mensaje con animación
        mensaje.classList.add("show");
        // Iniciar confeti
        lanzarConfeti();
    });

    // Función para lanzar confeti usando confetti.js
    function lanzarConfeti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Animación de confeti en el header
    function animarHeaderConfeti() {
        setInterval(() => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 400);
    }

    animarHeaderConfeti();
});
