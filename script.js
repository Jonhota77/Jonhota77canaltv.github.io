/* =============================================
   RETROFUTURO DIGITAL — styles.css
   Estética: CRT + Neon Cyberpunk + Retro TV
   ============================================= */
 
:root {
    --clr-bg: #04050f;
    --clr-surface: #080d1e;
    --clr-border: #1a2a4a;
    --clr-primary: #00f0ff;
    --clr-secondary: #ff2d7a;
    --clr-accent: #f0c620;
    --clr-text: #c8ddf0;
    --clr-text-dim: #5a7a9a;
    --clr-glow-cyan: rgba(0, 240, 255, 0.4);
    --clr-glow-pink: rgba(255, 45, 122, 0.4);
 
    --font-display: 'Orbitron', sans-serif;
    --font-mono: 'Share Tech Mono', monospace;
    --font-body: 'Exo 2', sans-serif;
 
    --radius: 4px;
    --transition: 0.25s ease;
}
 
/* ---- RESET ---- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
    font-family: var(--font-body);
    background-color: var(--clr-bg);
    color: var(--clr-text);
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
}
 
/* ---- BACKGROUND GRID ---- */
.bg-grid {
    position: fixed;
    inset: 0;
    z-index: 0;
    background-image:
        linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
}
 
/* ---- CRT SCANLINES ---- */
.scanlines {
    position: fixed;
    inset: 0;
    z-index: 0;
    background: repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent 3px,
        rgba(0, 0, 0, 0.15) 3px,
        rgba(0, 0, 0, 0.15) 4px
    );
    pointer-events: none;
    opacity: 0.6;
}
 
main, header, footer { position: relative; z-index: 1; }
 
/* ---- HEADER / NAVBAR ---- */
.header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(4, 5, 15, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--clr-border);
}
 
.navbar {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
}
 
.logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-display);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--clr-primary);
    text-shadow: 0 0 10px var(--clr-glow-cyan);
    white-space: nowrap;
}
 
.logo-icon { font-size: 1.2rem; animation: blink-icon 2s infinite; }
.logo-accent { color: var(--clr-secondary); margin-left: 4px; }
 
@keyframes blink-icon {
    0%, 90%, 100% { opacity: 1; }
    95% { opacity: 0.3; }
}
 
.menu {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}
 
.menu a {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--clr-text-dim);
    text-decoration: none;
    padding: 0.5rem 0.9rem;
    border: 1px solid transparent;
    border-radius: var(--radius);
    transition: var(--transition);
    display: block;
}
 
.menu a:hover {
    color: var(--clr-primary);
    border-color: var(--clr-border);
    background: rgba(0, 240, 255, 0.05);
    text-shadow: 0 0 8px var(--clr-glow-cyan);
}
 
.menu .donate-btn {
    color: var(--clr-accent);
    border-color: rgba(240, 198, 32, 0.3);
    background: rgba(240, 198, 32, 0.05);
}
 
.menu .donate-btn:hover {
    color: var(--clr-bg);
    background: var(--clr-accent);
    border-color: var(--clr-accent);
    text-shadow: none;
    box-shadow: 0 0 16px rgba(240, 198, 32, 0.5);
}
 
.menu-toggle {
    display: none;
    background: none;
    border: 1px solid var(--clr-border);
    color: var(--clr-primary);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.3rem 0.6rem;
    border-radius: var(--radius);
}
 
/* ---- SECTIONS SHARED ---- */
section {
    padding: 6rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
}
 
.section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2.5rem;
    border-bottom: 1px solid var(--clr-border);
    padding-bottom: 1rem;
    flex-wrap: wrap;
}
 
.section-header h2 {
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 3vw, 1.6rem);
    color: #fff;
    letter-spacing: 0.05em;
}
 
.section-num {
    font-size: 0.75em;
    color: var(--clr-primary);
    margin-right: 0.75rem;
    font-family: var(--font-mono);
    opacity: 0.8;
}
 
.section-desc {
    color: var(--clr-text-dim);
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.8;
}
 
/* ---- HERO ---- */
.hero-section {
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
    position: relative;
    overflow: hidden;
}
 
.hero-content { flex: 1; max-width: 600px; }
 
.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    color: var(--clr-secondary);
    border: 1px solid rgba(255, 45, 122, 0.3);
    background: rgba(255, 45, 122, 0.08);
    padding: 0.35rem 0.8rem;
    border-radius: 2px;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    animation: slide-in-left 0.8s ease both;
}
 
h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    line-height: 1.1;
    color: #fff;
    letter-spacing: -0.01em;
    margin-bottom: 1.25rem;
    animation: slide-in-left 0.9s ease 0.1s both;
}
 
.hero-highlight {
    color: var(--clr-primary);
    text-shadow: 0 0 20px var(--clr-glow-cyan), 0 0 60px rgba(0, 240, 255, 0.2);
    display: block;
}
 
.hero-sub {
    font-size: 1.05rem;
    color: var(--clr-text-dim);
    margin-bottom: 2.5rem;
    animation: slide-in-left 1s ease 0.2s both;
}
 
.hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    animation: slide-in-left 1.1s ease 0.3s both;
}
 
/* ---- BUTTONS ---- */
.live-button, .secondary-button,
.paypal-button, .whatsapp-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.75rem 1.6rem;
    border-radius: var(--radius);
    border: 1px solid;
    transition: var(--transition);
    cursor: pointer;
}
 
.live-button {
    background: var(--clr-primary);
    color: var(--clr-bg);
    border-color: var(--clr-primary);
    font-weight: 700;
    box-shadow: 0 0 24px var(--clr-glow-cyan);
}
.live-button:hover {
    background: #fff;
    border-color: #fff;
    box-shadow: 0 0 40px var(--clr-glow-cyan);
    transform: translateY(-2px);
}
 
.secondary-button {
    background: transparent;
    color: var(--clr-text);
    border-color: var(--clr-border);
}
.secondary-button:hover {
    border-color: var(--clr-primary);
    color: var(--clr-primary);
    box-shadow: 0 0 12px var(--clr-glow-cyan);
}
 
.btn-icon { font-size: 0.9rem; }
 
/* HERO DECORATION */
.hero-decoration {
    position: relative;
    width: 280px;
    height: 280px;
    flex-shrink: 0;
    animation: float 4s ease-in-out infinite;
}
 
.circle-outer, .circle-mid, .circle-inner {
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
}
 
.circle-outer {
    width: 260px; height: 260px;
    border-width: 1px;
    border-color: rgba(0, 240, 255, 0.15);
    animation: spin 20s linear infinite;
}
.circle-mid {
    width: 190px; height: 190px;
    border-width: 2px;
    border-color: rgba(255, 45, 122, 0.25);
    animation: spin 12s linear infinite reverse;
}
.circle-inner {
    width: 110px; height: 110px;
    border-width: 3px;
    border-color: rgba(0, 240, 255, 0.6);
    box-shadow: 0 0 30px var(--clr-glow-cyan), inset 0 0 30px rgba(0, 240, 255, 0.1);
    background: rgba(0, 240, 255, 0.05);
}
 
/* ---- VIDEO ---- */
.live-section { padding-top: 4rem; }
 
.live-indicator {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    color: var(--clr-secondary);
    text-transform: uppercase;
}
 
.video-wrapper {
    position: relative;
    padding: 2px;
    background: linear-gradient(135deg, var(--clr-primary), var(--clr-secondary));
    border-radius: 6px;
    box-shadow: 0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(255, 45, 122, 0.1);
}
 
.video-frame-deco {
    position: absolute;
    inset: -8px;
    border: 1px solid rgba(0, 240, 255, 0.12);
    border-radius: 10px;
    pointer-events: none;
}
 
.video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    background: #000;
    border-radius: 4px;
    overflow: hidden;
}
 
.video-container iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
}
 
/* ---- DONATE ---- */
.donate-section {
    text-align: center;
}
 
.donate-section .section-header {
    justify-content: center;
}
 
.paypal-button {
    background: #0070ba;
    color: #fff;
    border-color: #0070ba;
    font-size: 0.9rem;
    padding: 0.85rem 2rem;
}
.paypal-button:hover {
    background: #003087;
    border-color: #003087;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 112, 186, 0.4);
}
 
/* ---- CONTACT ---- */
.contact-section {
    text-align: center;
}
 
.contact-section .section-header {
    justify-content: center;
}
 
.whatsapp-button {
    background: #25D366;
    color: #000;
    border-color: #25D366;
    font-size: 0.9rem;
    font-weight: 700;
    padding: 0.85rem 2rem;
}
.whatsapp-button:hover {
    background: #128C7E;
    border-color: #128C7E;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(37, 211, 102, 0.35);
}
 
/* ---- PULSE DOT ---- */
.pulse-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: var(--clr-secondary);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--clr-secondary);
    animation: pulse 1.5s ease-in-out infinite;
}
 
/* ---- FOOTER ---- */
.footer {
    border-top: 1px solid var(--clr-border);
    background: rgba(4, 5, 15, 0.9);
    padding: 2.5rem 2rem;
    text-align: center;
    position: relative;
    z-index: 1;
}
 
.footer-inner { max-width: 600px; margin: 0 auto; }
 
.footer-logo {
    font-family: var(--font-display);
    font-size: 0.9rem;
    color: var(--clr-primary);
    text-shadow: 0 0 8px var(--clr-glow-cyan);
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
}
 
.footer p {
    font-size: 0.8rem;
    color: var(--clr-text-dim);
    font-family: var(--font-mono);
}
 
.footer-credit {
    margin-top: 0.4rem;
    color: rgba(90, 122, 154, 0.7) !important;
}
 
.footer-credit strong { color: var(--clr-text-dim); }
 
/* ---- ANIMATIONS ---- */
@keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
}
 
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-16px); }
}
 
@keyframes spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
}
 
@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.75); }
}
 
/* ---- MOBILE ---- */
@media (max-width: 768px) {
    .menu { display: none; flex-direction: column; gap: 0; }
    .menu.open {
        display: flex;
        position: absolute;
        top: 64px; left: 0; right: 0;
        background: rgba(4, 5, 15, 0.97);
        border-bottom: 1px solid var(--clr-border);
        padding: 1rem;
        z-index: 99;
    }
    .menu a { padding: 0.75rem 1rem; width: 100%; border-radius: var(--radius); }
    .menu-toggle { display: block; }
 
    .hero-section {
        flex-direction: column;
        min-height: auto;
        text-align: center;
        padding-top: 3rem;
    }
    .hero-actions { justify-content: center; }
    .hero-decoration { width: 200px; height: 200px; }
    .circle-outer { width: 190px; height: 190px; }
    .circle-mid  { width: 138px; height: 138px; }
    .circle-inner { width: 80px; height: 80px; }
 
    .section-header { flex-direction: column; gap: 0.5rem; }
    section { padding: 3.5rem 1.25rem; }
}
