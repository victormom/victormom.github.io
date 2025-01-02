document.addEventListener('DOMContentLoaded', () => {
    import QRCode from 'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js';
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
    import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

    // Firebase configuration
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

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const familyForm = document.getElementById('familyForm');
    const setGuestsButton = document.getElementById('setGuests');
    const guestsSection = document.getElementById('guestsSection');
    const guestsInputs = document.getElementById('guestsInputs');
    const guestsForm = document.getElementById('guestsForm');
    const qrSection = document.getElementById('qrSection');
    const qrCanvasContainer = document.getElementById('qrCanvasContainer');

    let familyName = '';
    let familySize = 0;

    setGuestsButton.addEventListener('click', () => {
        familyName = document.getElementById('familyName').value;
        familySize = parseInt(document.getElementById('familySize').value);

        if (familyName && familySize > 0) {
            guestsInputs.innerHTML = ''; // Limpiar inputs anteriores

            // Crear campos dinámicamente
            for (let i = 0; i < familySize; i++) {
                guestsInputs.innerHTML += `
                    <div>
                        <label>Nombre y Apellido del Invitado ${i + 1}:</label>
                        <input type="text" name="guestName${i}" placeholder="Ejemplo: Manuel Santes" required>

                        <label>Edad del Invitado ${i + 1}:</label>
                        <input type="number" name="guestAge${i}" placeholder="Edad" required>
                    </div>
                `;
            }

            guestsSection.style.display = 'block'; // Mostrar la siguiente sección
        } else {
            alert('Por favor completa todos los campos.');
        }
    });

    guestsForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const phoneNumber = document.getElementById('phoneNumber').value;
        const guestsData = [];

        for (let i = 0; i < familySize; i++) {
            const guestName = e.target[`guestName${i}`].value;
            const guestAge = e.target[`guestAge${i}`].value;

            guestsData.push({
                name: guestName,
                age: guestAge
            });
        }

        const familyData = {
            familyName,
            familySize,
            phoneNumber,
            guests: guestsData
        };

        const familyRef = ref(database, 'families');
        const newFamilyRef = await push(familyRef, familyData);

        // Generar QR para cada invitado
        qrCanvasContainer.innerHTML = '';

        for (const guest of guestsData) {
            const qrCanvas = document.createElement('canvas');
            const qrData = {
                familyName,
                guestName: guest.name,
                guestAge: guest.age,
                familyId: newFamilyRef.key
            };

            await QRCode.toCanvas(qrCanvas, JSON.stringify(qrData));
            qrCanvasContainer.appendChild(qrCanvas);
        }

        qrSection.style.display = 'block';
    });
});
