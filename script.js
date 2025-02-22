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
