/* =============================================
   RETROFUTURO DIGITAL — script.js
   ============================================= */
 
document.addEventListener('DOMContentLoaded', () => {
 
    // ── 1. MENÚ HAMBURGUESA (MÓVIL) ──────────────────────────────
    const toggle = document.querySelector('.menu-toggle');
    const menu   = document.querySelector('.menu');
 
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            toggle.textContent = menu.classList.contains('open') ? '✕' : '☰';
        });
 
        // Cierra el menú al hacer clic en un enlace
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                toggle.textContent = '☰';
            });
        });
    }
 
    // ── 2. SCROLL ACTIVO EN NAVBAR ────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.menu a');
 
    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
 
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
 
    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink(); // Ejecutar al cargar
 
    // ── 3. ANIMACIÓN DE ENTRADA AL HACER SCROLL ──────────────────
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );
 
    document.querySelectorAll('.live-section, .donate-section, .contact-section').forEach(el => {
        el.classList.add('fade-section');
        observer.observe(el);
    });
 
    // ── 4. EFECTO GLITCH EN EL LOGO ──────────────────────────────
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        setInterval(() => {
            if (Math.random() < 0.08) { // 8% de probabilidad cada segundo
                logoText.classList.add('glitch');
                setTimeout(() => logoText.classList.remove('glitch'), 180);
            }
        }, 1000);
    }
 
    // ── 5. SMOOTH SCROLL PARA NAVEGACIÓN INTERNA ─────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 72; // altura del header
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
 
    // ── 6. EFECTO TYPING EN EL HERO BADGE ────────────────────────
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        const originalText = badge.textContent.trim();
        const dotSpan = badge.querySelector('.pulse-dot');
        const textPart = originalText.replace('SEÑAL EN VIVO', '').trim();
        const typingTarget = 'SEÑAL EN VIVO';
 
        // Limpia el badge y reconstruye con el texto typing
        badge.textContent = '';
        if (dotSpan) badge.appendChild(dotSpan);
        const textNode = document.createTextNode(' ');
        badge.appendChild(textNode);
 
        let index = 0;
        function typeChar() {
            if (index < typingTarget.length) {
                textNode.textContent = ' ' + typingTarget.slice(0, ++index);
                setTimeout(typeChar, 60);
            }
        }
        setTimeout(typeChar, 800);
    }
 
});
 
/* ── CSS DINÁMICO para efectos JS ──────────────────────────────── */
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .fade-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .fade-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .menu a.active {
        color: var(--clr-primary);
        background: rgba(0, 240, 255, 0.05);
        border-color: var(--clr-border);
    }
    .logo-text.glitch {
        text-shadow:
            2px 0 var(--clr-secondary),
            -2px 0 var(--clr-primary),
            0 0 10px var(--clr-glow-cyan);
        letter-spacing: 0.15em;
        transition: none;
    }
`;
document.head.appendChild(dynamicStyles);
