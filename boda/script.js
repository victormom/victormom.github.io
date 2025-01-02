document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const familySize = parseInt(document.getElementById('familySize').value);

    // Enviar datos al servidor para asignar mesa y generar QR
    fetch('/register-attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, familySize })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('qrMessage').style.display = 'block';
            document.getElementById('attendanceForm').reset();
        } else {
            alert('Error al registrar asistencia. Intenta nuevamente.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al registrar asistencia. Intenta nuevamente.');
    });
});
