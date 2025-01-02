// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnyj_N8_wFTzuTon3nB6ZexQuVHsKZpbU",
    authDomain: "registroasistencia-69bac.firebaseapp.com",
    databaseURL: "https://registroasistencia-69bac-default-rtdb.firebaseio.com",
    projectId: "registroasistencia-69bac",
    storageBucket: "registroasistencia-69bac.firebasestorage.app",
    messagingSenderId: "803731994814",
    appId: "1:803731994814:web:97a796c82a48ad8f8186ef",
    measurementId: "G-88SRC36F6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Manejar el formulario de asistencia
document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const familySize = parseInt(document.getElementById('familySize').value);

    // Guardar los datos en Firebase
    push(ref(database, 'attendees'), {
        name: name,
        familySize: familySize,
        timestamp: Date.now()
    }).then(() => {
        document.getElementById('qrMessage').style.display = 'block';
        document.getElementById('attendanceForm').reset();
    }).catch((error) => {
        console.error('Error al guardar en Firebase:', error);
        alert('Error al registrar asistencia. Intenta nuevamente.');
    });
});
