<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feliz Cumpleaños</title>
    <link rel="stylesheet" href="estilos.css">
    <!-- Swiper CSS -->
    <link rel="stylesheet" href="librerias/swiper/swiper-bundle.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <!-- Header con animación de confeti y serpentinas -->
    <header class="header">
        <h1>Happy Birthday!</h1>
    </header>

    <!-- Sección 1: Caja de regalos -->
    <section class="seccion-regalo">
        <div class="caja-regalo" id="caja-regalo">
            <div class="tapa"></div>
            <div class="cuerpo">🎁</div>
        </div>
        <div class="mensaje" id="mensaje">
            <h1>Felices 25 años</h1>
            <p>¡Que tengas un día increíble lleno de alegría y sorpresas!</p>
        </div>
    </section>

    <!-- Sección 2: Carrusel de imágenes -->
    <section class="seccion-carrusel">
        <h2>Recuerdos Especiales</h2>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="./imagenes/imagen1.jpg" alt="Celebración 1">
                    <div class="caption">
                        <h3>Celebración 1</h3>
                        <p>Un momento único.</p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <img src="./imagenes/imagen2.jpg" alt="Celebración 2">
                    <div class="caption">
                        <h3>Celebración 2</h3>
                        <p>Recuerdos inolvidables.</p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <img src="./imagenes/imagen3.jpg" alt="Celebración 3">
                    <div class="caption">
                        <h3>Celebración 3</h3>
                        <p>¡Sonríe siempre!</p>
                    </div>
                </div>
            </div>
            <!-- Controles -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
    </section>

    <!-- Sección 3: Comentarios -->
    <section class="seccion-comentarios">
        <h2>Deja tu comentario</h2>
        <form action="procesar.php" method="POST" id="form-comentarios">
            <input type="text" name="nombre" placeholder="Tu nombre" required>
            <textarea name="comentario" placeholder="Escribe tu mensaje" required></textarea>
            <button type="submit">Enviar</button>
        </form>
        <div class="comentarios">
            <div class="swiper-container-comentarios">
                <div class="swiper-wrapper">
                    <?php
                    // Leer los comentarios del archivo
                    if (file_exists('comentarios.txt')) {
                        $comentarios = file('comentarios.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                        foreach ($comentarios as $comentario) {
                            list($nombre, $mensaje) = explode('|', $comentario);
                            // Generar un color aleatorio para la tarjeta
                            $colores = ['#E5848B', '#9E4D94', '#BBA6F5', '#FFC107', '#8BC34A'];
                            $color = $colores[array_rand($colores)];
                            echo "
                            <div class='swiper-slide'>
                                <div class='card' style='background: $color;'>
                                    <h3>$nombre</h3>
                                    <p>$mensaje</p>
                                    <div class='compartir'>
                                        <a href='https://www.facebook.com/sharer/sharer.php?u=https://victormom.github.io/' target='_blank'><i class='fab fa-facebook-f'></i></a>
                                        <a href='https://www.instagram.com/?url=https://victormom.github.io/' target='_blank'><i class='fab fa-instagram'></i></a>
                                    </div>
                                </div>
                            </div>
                            ";
                        }
                    }
                    ?>
                </div>
                <!-- Controles -->
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </section>

    <!-- Scripts -->
    <!-- Confetti JS -->
    <script src="librerias/confetti.min.js"></script>
    <!-- Swiper JS -->
    <script src="librerias/swiper/swiper-bundle.min.js"></script>
    <!-- jQuery (opcional, si necesitas) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Script personalizado -->
    <script src="script.js"></script>
</body>
</html>
