/* =============================================
   RETROFUTURO DIGITAL — script.js v3
   ============================================= */
 
// ╔══════════════════════════════════════════╗
// ║  CONFIGURACIÓN                           ║
// ╚══════════════════════════════════════════╝
const WS_URL = "ws://localhost:8765/ws";
// Con ngrok:     "wss://tu-id.ngrok-free.app/ws"
// Con IP pública: "ws://123.456.789.0:8765/ws"
 
 
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
 
        document.querySelectorAll(".tab-panel").forEach(panel => {
            panel.classList.toggle("active", panel.id === `tab-${target}`);
        });
    });
});
 
 
// ═══════════════════════════════════════════
//  ESTADÍSTICAS Y MINI-CHART
// ═══════════════════════════════════════════
const history    = [];   // últimos 20 valores
const MAX_HIST   = 20;
let   peakToday  = 0;
let   totalVisits = 0;
let   chartCtx   = null;
 
function initChart() {
    const canvas = document.getElementById("mini-chart");
    if (!canvas) return;
    chartCtx = canvas.getContext("2d");
    canvas.width  = canvas.offsetWidth  || 300;
    canvas.height = canvas.offsetHeight || 36;
    drawChart();
}
 
function drawChart() {
    if (!chartCtx) return;
    const W = chartCtx.canvas.width;
    const H = chartCtx.canvas.height;
    chartCtx.clearRect(0, 0, W, H);
 
    if (history.length < 2) return;
 
    const max = Math.max(...history, 1);
    const step = W / (MAX_HIST - 1);
 
    // línea de relleno
    const grad = chartCtx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "rgba(0,240,255,0.25)");
    grad.addColorStop(1, "rgba(0,240,255,0)");
 
    chartCtx.beginPath();
    history.forEach((v, i) => {
        const x = i * step;
        const y = H - (v / max) * (H - 4) - 2;
        i === 0 ? chartCtx.moveTo(x, y) : chartCtx.lineTo(x, y);
    });
    // cierre del relleno
    chartCtx.lineTo((history.length - 1) * step, H);
    chartCtx.lineTo(0, H);
    chartCtx.closePath();
    chartCtx.fillStyle = grad;
    chartCtx.fill();
 
    // línea principal
    chartCtx.beginPath();
    history.forEach((v, i) => {
        const x = i * step;
        const y = H - (v / max) * (H - 4) - 2;
        i === 0 ? chartCtx.moveTo(x, y) : chartCtx.lineTo(x, y);
    });
    chartCtx.strokeStyle = "#00f0ff";
    chartCtx.lineWidth = 1.5;
    chartCtx.shadowColor = "#00f0ff";
    chartCtx.shadowBlur = 4;
    chartCtx.stroke();
    chartCtx.shadowBlur = 0;
}
 
function updateStats(n) {
    // pico
    if (n > peakToday) {
        peakToday = n;
        const el = document.getElementById("stat-peak");
        if (el) el.textContent = peakToday;
    }
 
    // historial para chart
    history.push(n);
    if (history.length > MAX_HIST) history.shift();
    drawChart();
 
    // barra de progreso (máx 50 para la barra visual)
    const pct = Math.min((n / 50) * 100, 100);
    const bar = document.getElementById("bar-now");
    if (bar) bar.style.width = pct + "%";
}
 
 
// ═══════════════════════════════════════════
//  WEBSOCKET — CONTADOR DE VIEWERS
// ═══════════════════════════════════════════
const elCount  = document.getElementById("viewer-count");
const elStatNow = document.getElementById("stat-now");
const elBadge  = document.getElementById("viewer-badge");
const elDot    = document.getElementById("conn-dot");
 
let ws = null;
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
    if (elCount)   elCount.textContent   = txt;
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
 
    ws = new WebSocket(WS_URL);
 
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
 
// Contar visitas de la sesión
totalVisits++;
const elTotal = document.getElementById("stat-total");
if (elTotal) elTotal.textContent = totalVisits;
 
// Reconectar si la pestaña vuelve a estar activa
document.addEventListener("visibilitychange", () => {
    if (!document.hidden && (!ws || ws.readyState !== WebSocket.OPEN)) {
        clearTimeout(reconnTimer);
        reconnDelay = 3000;
        connect();
    }
});
 
// Iniciar
document.addEventListener("DOMContentLoaded", () => {
    initChart();
    connect();
 
    // Redibujar chart si cambia el tamaño
    window.addEventListener("resize", () => {
        const canvas = document.getElementById("mini-chart");
        if (canvas) {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight || 36;
            drawChart();
        }
    });
});
