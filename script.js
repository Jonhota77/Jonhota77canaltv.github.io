/* =============================================
   RETROFUTURO DIGITAL — script.js v5
   Jonh Jota Soluciones
   ============================================= */
 
// ╔══════════════════════════════════════════════════════╗
// ║  CONFIGURACIÓN — edita estos valores                 ║
// ╚══════════════════════════════════════════════════════╝
const CONFIG = {
    // WebSocket del servidor Python
    wsUrl: "ws://localhost:8765/ws",
    // Con ngrok:       "wss://tu-id.ngrok-free.app/ws"
    // Con IP pública:  "ws://123.456.789.0:8765/ws"
 
    youtube: {
        // ► CAMBIA ESTE ID para apuntar a otro video/stream de YouTube
        // Es la parte después de ?v= o /embed/ en la URL
        // Ej: youtube.com/watch?v=  ABC123   ← ese es el ID
        videoId: "pb479u7ftBI?",
        label:   "▶ YouTube",
    },
 
    twitch: {
        // Tu nombre de canal en twitch.tv/TU_CANAL
        channel: "TU_CANAL_TWITCH",
        label:   "◈ Twitch",
        // Tu dominio de GitHub Pages — cámbialo por tu usuario real
        parent:  "tu-usuario.github.io",
    },
};
 
 
// ═══════════════════════════════════════════
//  COPIAR NÚMERO — Nequi / Daviplata
// ═══════════════════════════════════════════
function copyNumber(number, msgId) {
    const msgEl = document.getElementById(msgId);
 
    navigator.clipboard.writeText(number)
        .then(() => {
            if (msgEl) {
                msgEl.textContent = "¡Copiado!";
                msgEl.classList.add("copied");
                setTimeout(() => {
                    msgEl.textContent = "Copiar";
                    msgEl.classList.remove("copied");
                }, 2200);
            }
        })
        .catch(() => {
            // Fallback para navegadores sin clipboard API
            const el = document.createElement("textarea");
            el.value = number;
            el.style.position = "fixed";
            el.style.opacity  = "0";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            if (msgEl) {
                msgEl.textContent = "¡Copiado!";
                msgEl.classList.add("copied");
                setTimeout(() => {
                    msgEl.textContent = "Copiar";
                    msgEl.classList.remove("copied");
                }, 2200);
            }
        });
}
 
 
// ═══════════════════════════════════════════
//  SELECTOR DE PLATAFORMA
// ═══════════════════════════════════════════
let currentPlatform = localStorage.getItem("rd_platform") || "youtube";
 
const videoShell    = document.querySelector(".video-shell");
const videoInner    = document.getElementById("video-inner");
const watermarkText = document.getElementById("watermark-text");
const switchOverlay = document.getElementById("switching-overlay");
 
function buildYouTubeUrl() {
    return `https://www.youtube.com/embed/${CONFIG.youtube.videoId}?autoplay=1&rel=0&modestbranding=1`;
}
 
function buildTwitchUrl() {
    return `https://player.twitch.tv/?channel=${CONFIG.twitch.channel}&parent=${CONFIG.twitch.parent}&autoplay=true`;
}
 
function loadPlatform(platform, animate = false) {
    currentPlatform = platform;
    localStorage.setItem("rd_platform", platform);
 
    if (animate) switchOverlay.classList.add("show");
 
    videoShell.classList.remove("youtube", "twitch");
    videoShell.classList.add(platform);
    watermarkText.textContent = CONFIG[platform].label;
 
    document.querySelectorAll(".platform-btn").forEach(btn => {
        const active = btn.dataset.platform === platform;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
 
    const url   = platform === "youtube" ? buildYouTubeUrl() : buildTwitchUrl();
    const delay = animate ? 480 : 0;
 
    setTimeout(() => {
        videoInner.innerHTML = `<iframe
            src="${url}"
            title="Transmisión en vivo Retrofuturo Digital"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
        </iframe>`;
        setTimeout(() => switchOverlay.classList.remove("show"), 550);
    }, delay);
}
 
document.querySelectorAll(".platform-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.dataset.platform !== currentPlatform) {
            loadPlatform(btn.dataset.platform, true);
        }
    });
});
 
loadPlatform(currentPlatform, false);
 
 
// ═══════════════════════════════════════════
//  TABS
// ═══════════════════════════════════════════
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        document.querySelectorAll(".tab-btn").forEach(b => {
            b.classList.toggle("active", b === btn);
            b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        document.querySelectorAll(".tab-panel").forEach(p => {
            p.classList.toggle("active", p.id === `tab-${target}`);
        });
    });
});
 
 
// ═══════════════════════════════════════════
//  MINI-CHART DE AUDIENCIA
// ═══════════════════════════════════════════
const chartHistory = [];
const MAX_HIST     = 20;
let   peakToday    = 0;
let   chartCtx     = null;
 
function initChart() {
    const canvas = document.getElementById("mini-chart");
    if (!canvas) return;
    chartCtx = canvas.getContext("2d");
    resizeChart();
}
 
function resizeChart() {
    const canvas = document.getElementById("mini-chart");
    if (!canvas || !chartCtx) return;
    canvas.width  = canvas.offsetWidth  || 300;
    canvas.height = canvas.offsetHeight || 32;
    drawChart();
}
 
function drawChart() {
    if (!chartCtx || chartHistory.length < 2) return;
    const W = chartCtx.canvas.width;
    const H = chartCtx.canvas.height;
    chartCtx.clearRect(0, 0, W, H);
 
    const max  = Math.max(...chartHistory, 1);
    const step = W / (MAX_HIST - 1);
 
    const grad = chartCtx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "rgba(0,240,255,0.2)");
    grad.addColorStop(1, "rgba(0,240,255,0)");
 
    chartCtx.beginPath();
    chartHistory.forEach((v, i) => {
        const x = i * step;
        const y = H - (v / max) * (H - 4) - 2;
        i === 0 ? chartCtx.moveTo(x, y) : chartCtx.lineTo(x, y);
    });
    chartCtx.lineTo((chartHistory.length - 1) * step, H);
    chartCtx.lineTo(0, H);
    chartCtx.closePath();
    chartCtx.fillStyle = grad;
    chartCtx.fill();
 
    chartCtx.beginPath();
    chartHistory.forEach((v, i) => {
        const x = i * step;
        const y = H - (v / max) * (H - 4) - 2;
        i === 0 ? chartCtx.moveTo(x, y) : chartCtx.lineTo(x, y);
    });
    chartCtx.strokeStyle = "#00f0ff";
    chartCtx.lineWidth   = 1.5;
    chartCtx.shadowColor = "#00f0ff";
    chartCtx.shadowBlur  = 4;
    chartCtx.stroke();
    chartCtx.shadowBlur  = 0;
}
 
function updateStats(n) {
    if (n > peakToday) {
        peakToday = n;
        const el = document.getElementById("stat-peak");
        if (el) el.textContent = peakToday;
    }
    chartHistory.push(n);
    if (chartHistory.length > MAX_HIST) chartHistory.shift();
    drawChart();
 
    const bar = document.getElementById("bar-now");
    if (bar) bar.style.width = Math.min((n / 50) * 100, 100) + "%";
}
 
 
// ═══════════════════════════════════════════
//  WEBSOCKET — CONTADOR EN TIEMPO REAL
// ═══════════════════════════════════════════
const elCount   = document.getElementById("viewer-count");
const elStatNow = document.getElementById("stat-now");
const elBadge   = document.getElementById("viewer-badge");
const elDot     = document.getElementById("conn-dot");
 
let ws          = null;
let reconnDelay = 3000;
let reconnTimer = null;
let pingTimer   = null;
 
function setConnStatus(state) {
    if (!elDot) return;
    elDot.className = `conn-dot ${state}`;
    elBadge?.classList.toggle("online", state === "online");
}
 
function setCount(n) {
    const txt = n >= 0 ? String(n) : "--";
    if (elCount) elCount.textContent = txt;
    if (elStatNow) {
        const prev = elStatNow.textContent;
        elStatNow.textContent = txt;
        if (prev !== txt && prev !== "--") {
            elStatNow.classList.remove("bump");
            void elStatNow.offsetWidth;
            elStatNow.classList.add("bump");
            setTimeout(() => elStatNow.classList.remove("bump"), 260);
        }
    }
    if (n >= 0) updateStats(n);
}
 
function connect() {
    if (ws && ws.readyState === WebSocket.OPEN) return;
    setConnStatus("connecting");
    ws = new WebSocket(CONFIG.wsUrl);
 
    ws.onopen = () => {
        setConnStatus("online");
        reconnDelay = 3000;
        pingTimer = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) ws.send("ping");
        }, 25000);
    };
 
    ws.onmessage = ({ data }) => {
        try {
            const { viewers } = JSON.parse(data);
            if (typeof viewers === "number") setCount(viewers);
        } catch { /* ignorar */ }
    };
 
    ws.onclose = ws.onerror = () => {
        clearInterval(pingTimer);
        setConnStatus("offline");
        reconnTimer = setTimeout(() => {
            reconnDelay = Math.min(reconnDelay * 1.5, 30000);
            connect();
        }, reconnDelay);
    };
}
 
// Visitas de sesión
const elTotal = document.getElementById("stat-total");
if (elTotal) elTotal.textContent = "1";
 
document.addEventListener("visibilitychange", () => {
    if (!document.hidden && (!ws || ws.readyState !== WebSocket.OPEN)) {
        clearTimeout(reconnTimer);
        reconnDelay = 3000;
        connect();
    }
});
 
document.addEventListener("DOMContentLoaded", () => {
    initChart();
    connect();
    window.addEventListener("resize", resizeChart);
});
