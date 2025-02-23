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
