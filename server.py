"""
RETROFUTURO DIGITAL — server.py v2
WebSocket viewer counter + Bot de Telegram para alertas
 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INSTALACIÓN (una sola vez):
    pip install fastapi uvicorn websockets httpx
 
CONFIGURACIÓN:
    1. Crea tu bot en Telegram hablando con @BotFather → /newbot
    2. Copia el token que te da y pégalo en TELEGRAM_BOT_TOKEN
    3. Escríbele un mensaje a tu bot, luego abre en el navegador:
       https://api.telegram.org/bot<TU_TOKEN>/getUpdates
       Copia el "chat":{"id": XXXXXXXX} y pégalo en TELEGRAM_CHAT_ID
    4. Ajusta los umbrales de alerta según tu audiencia
 
EJECUCIÓN:
    python server.py
 
CON NGROK (otra terminal):
    ngrok http 8765
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
 
import asyncio
import json
import logging
from datetime import datetime
 
import httpx
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
 
# ══════════════════════════════════════
#  CONFIGURACIÓN — EDITA AQUÍ
# ══════════════════════════════════════
TELEGRAM_BOT_TOKEN = "8332034686:AAEtCtmyvzDEkmnYjAtq6>"          # Ej: 7412345678:AAFxxx...
TELEGRAM_CHAT_ID   = "842971562"        # Ej: 123456789
 
# Umbrales de alerta: te avisa cuando superas o bajas de estos números
ALERTAS = [5, 10, 25, 50, 100, 200, 500]
 
# Tiempo mínimo entre alertas del mismo tipo (segundos)
COOLDOWN_SEG = 120
 
# ══════════════════════════════════════
 
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S"
)
log = logging.getLogger("retrofuturo")
 
app = FastAPI(title="Retrofuturo Digital")
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
 
# ── Estado global ──
active_connections: set[WebSocket] = set()
peak_today: int = 0
last_alert: dict[str, float] = {}   # clave: umbral, valor: timestamp
session_start = datetime.now()
 
 
# ═══════════════════════════════════════
#  TELEGRAM
# ═══════════════════════════════════════
async def send_telegram(mensaje: str):
    """Envía un mensaje a tu chat de Telegram."""
    if TELEGRAM_BOT_TOKEN == "PEGA_AQUÍ_TU_TOKEN":
        log.warning("⚠️  Bot de Telegram no configurado — edita server.py")
        return
    try:
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        async with httpx.AsyncClient(timeout=8) as client:
            await client.post(url, json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": mensaje,
                "parse_mode": "HTML"
            })
        log.info(f"📨 Telegram enviado: {mensaje[:60]}...")
    except Exception as e:
        log.error(f"Error al enviar Telegram: {e}")
 
 
async def check_alertas(viewers: int):
    """Revisa si hay que enviar alguna alerta de audiencia."""
    now = asyncio.get_event_loop().time()
 
    for umbral in ALERTAS:
        clave_up   = f"up_{umbral}"
        clave_down = f"down_{umbral}"
 
        # Alerta de subida: acaba de superar el umbral
        if viewers >= umbral:
            ultimo = last_alert.get(clave_up, 0)
            if now - ultimo > COOLDOWN_SEG:
                last_alert[clave_up] = now
                hora = datetime.now().strftime("%H:%M")
                await send_telegram(
                    f"🚀 <b>Retrofuturo Digital</b>\n"
                    f"📈 ¡Superaste <b>{umbral} espectadores</b> en vivo!\n"
                    f"👥 Ahora mismo: <b>{viewers} personas</b>\n"
                    f"⏰ {hora}"
                )
 
        # Alerta de bajada: cayó por debajo del umbral (solo si antes estaba arriba)
        if viewers < umbral and last_alert.get(f"up_{umbral}", 0) > 0:
            ultimo = last_alert.get(clave_down, 0)
            if now - ultimo > COOLDOWN_SEG * 3:
                last_alert[clave_down] = now
 
 
# ═══════════════════════════════════════
#  WEBSOCKET
# ═══════════════════════════════════════
async def broadcast(count: int):
    """Envía el conteo actual a todos los clientes conectados."""
    mensaje = json.dumps({"viewers": count})
    dead = set()
    for ws in active_connections:
        try:
            await ws.send_text(mensaje)
        except Exception:
            dead.add(ws)
    active_connections.difference_update(dead)
 
 
@app.websocket("/ws")
async def ws_endpoint(websocket: WebSocket):
    global peak_today
    await websocket.accept()
    active_connections.add(websocket)
 
    count = len(active_connections)
    if count > peak_today:
        peak_today = count
 
    log.info(f"🟢 Conexión nueva │ Activos: {count} │ Pico: {peak_today}")
    await broadcast(count)
    await check_alertas(count)
 
    try:
        while True:
            await asyncio.wait_for(websocket.receive_text(), timeout=35)
    except (WebSocketDisconnect, asyncio.TimeoutError, Exception):
        pass
    finally:
        active_connections.discard(websocket)
        count = len(active_connections)
        log.info(f"🔴 Desconexión │ Activos: {count}")
        await broadcast(count)
 
 
# ═══════════════════════════════════════
#  ENDPOINTS HTTP
# ═══════════════════════════════════════
@app.get("/")
def status():
    uptime = str(datetime.now() - session_start).split(".")[0]
    return {
        "canal":    "Retrofuturo Digital",
        "viewers":  len(active_connections),
        "peak":     peak_today,
        "uptime":   uptime,
        "status":   "online"
    }
 
 
@app.get("/stats")
def stats():
    """Estadísticas rápidas para consultar desde el navegador."""
    return {
        "viewers_ahora": len(active_connections),
        "pico_hoy":      peak_today,
        "inicio_sesion": session_start.strftime("%Y-%m-%d %H:%M:%S"),
    }
 
 
# ═══════════════════════════════════════
#  ARRANQUE
# ═══════════════════════════════════════
if __name__ == "__main__":
    import uvicorn
    print("\n" + "═"*48)
    print("  📺  RETROFUTURO DIGITAL — Servidor v2")
    print("═"*48)
    print(f"  WebSocket:  ws://localhost:8765/ws")
    print(f"  Estado:     http://localhost:8765/")
    print(f"  Estadísticas: http://localhost:8765/stats")
    print("═"*48 + "\n")
    uvicorn.run("server:app", host="0.0.0.0", port=8765, reload=False)
