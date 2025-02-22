// Smooth Scroll for navigation links
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  databaseURL: "https://contadordeusuarios-69c74-default-rtdb.firebaseio.com/",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Genera un ID único para el usuario
const userId = localStorage.getItem('userId') || Math.random().toString(36).substring(7);
localStorage.setItem('userId', userId);

// Referencia a la base de datos
const userRef = database.ref('users/' + userId);

// Marca al usuario como "conectado"
userRef.set({
  connected: true,
  lastActive: firebase.database.ServerValue.TIMESTAMP
});

// Actualiza el contador cada 10 segundos
setInterval(() => {
  userRef.update({
    lastActive: firebase.database.ServerValue.TIMESTAMP
  });
}, 10000);

// Escucha cambios en el número de usuarios conectados
const connectedRef = database.ref('.info/connected');
connectedRef.on('value', (snapshot) => {
  if (snapshot.val() === true) {
    database.ref('users').orderByChild('lastActive').startAt(Date.now() - 10000).once('value', (users) => {
      const userCount = users.numChildren();
      document.getElementById('userCount').textContent = userCount;
    });
  }
});

// Live button animation
const liveButton = document.querySelector('.live-button');

liveButton.addEventListener('mouseover', () => {
    liveButton.classList.add('pulse-animation');
});

liveButton.addEventListener('mouseout', () => {
    liveButton.classList.remove('pulse-animation');
});

// Handle live section toggle
const liveSection = document.querySelector('.live-section');
liveButton.addEventListener('click', () => {
    liveSection.classList.toggle('visible');
    liveButton.textContent = liveSection.classList.contains('visible')
        ? 'Cerrar Transmisión'
        : 'Ver Transmisión en Vivo';
});

// Contact buttons functionality
const contactButtons = document.querySelectorAll('.contact-buttons a');

contactButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert(`Redirigiendo a ${button.textContent}`);
    });
});

// Handle PayPal donation button functionality
const paypalButton = document.querySelector('.donate-button');
if (paypalButton) {
    paypalButton.addEventListener('click', () => {
        window.location.href = 'https://paypal.me/JonhSuazaramirez';
    });
} 
