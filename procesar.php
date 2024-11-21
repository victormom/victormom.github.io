<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim(htmlspecialchars($_POST['nombre']));
    $comentario = trim(htmlspecialchars($_POST['comentario']));

    if (!empty($nombre) && !empty($comentario)) {
        // Guardar el comentario en un archivo
        $archivo = 'comentarios.txt';
        $contenido = "$nombre|$comentario\n";
        file_put_contents($archivo, $contenido, FILE_APPEND | LOCK_EX);
    }

    header('Location: index.php');
    exit();
}
?>
