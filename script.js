// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos con animación
document.querySelectorAll('.project-card, .skill-tag, .contact-btn').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// Navbar con fondo al hacer scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        navbar.style.background = 'rgb(255, 255, 255)';
    }
    
    // Highlight del link activo
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.background = '';
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.background = '#96f018';
                    link.style.color = 'white';
                }
            });
        }
    });
    
    lastScroll = currentScroll;
});

// Animación de las skill tags
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    setTimeout(() => {
        tag.style.animation = 'fadeInUp 0.5s ease forwards';
    }, index * 100);
});

// Efecto parallax en pokeballs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const pokeballs = document.querySelectorAll('.pokeball');
    
    pokeballs.forEach((pokeball, index) => {
        const speed = 0.3 + (index * 0.1);
        pokeball.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// Efecto hover mejorado en project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efecto de "typing" en el título del hero
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// Animación del avatar en el hero
const heroAvatar = document.querySelector('.hero-avatar');
if (heroAvatar) {
    heroAvatar.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    heroAvatar.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Contador de scroll para botón "volver arriba" (opcional)
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        // Aquí puedes agregar un botón de "volver arriba" si lo deseas
    }
});

// Prevenir clicks en enlaces vacíos
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            alert('Este proyecto estará disponible próximamente 🚀');
        }
    });
});

// Efecto de color aleatorio en hover de skills (opcional, divertido)
const colors = ['#96f018', '#81dd12', '#6cca0c', '#57b706', '#42a400'];
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.background = `linear-gradient(135deg, ${randomColor}, ${colors[(colors.indexOf(randomColor) + 1) % colors.length]})`;
    });
});

// Console log easter egg
console.log('%c¡Hola Developer! 👋', 'font-size: 20px; color: #96f018; font-weight: bold;');
console.log('%cGracias por revisar mi código 💚', 'font-size: 14px; color: #6cca0c;');
console.log('%cSi tienes alguna sugerencia, ¡contáctame!', 'font-size: 12px; color: #42a400;');
