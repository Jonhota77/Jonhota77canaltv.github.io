// ===============================
// ESPERAR A QUE CARGUE EL DOM
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // SCROLL SUAVE PARA MENÚ
    // ===============================
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector("header").offsetHeight;

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===============================
    // BOTÓN TRANSMISIÓN EN VIVO
    // ===============================
    const liveButton = document.querySelector('.live-button');
    const liveSection = document.querySelector('.live-section');

    if (liveButton && liveSection) {
        liveButton.addEventListener('click', (e) => {
            e.preventDefault();

            liveSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            liveButton.textContent = "Estás viendo la transmisión 🔴";
        });
    }

    // ===============================
    // BOTÓN PAYPAL
    // ===============================
    const paypalButton = document.querySelector('.paypal-button');

    if (paypalButton) {
        paypalButton.addEventListener('click', () => {
            console.log("Redirigiendo a PayPal...");
        });
    }

    // ===============================
    // BOTÓN WHATSAPP
    // ===============================
    const whatsappButton = document.querySelector('.whatsapp-button');

    if (whatsappButton) {
        whatsappButton.addEventListener('click', () => {
            console.log("Abriendo WhatsApp...");
        });
    }

    // ===============================
    // EFECTO HEADER AL HACER SCROLL
    // ===============================
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.background = "rgba(0, 0, 0, 0.85)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.08)";
        }
    });

});
