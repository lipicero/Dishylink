// Spanish for the interface. The key is the English string still sitting in the
// component, so a missing entry falls back to English instead of a blank.

export const es: Record<string, string> = {
  // Chrome
  "Dishylink — Starlink Companion (Unofficial)": "Dishylink — Compañero de Starlink (no oficial)",
  "Dashboard sections": "Secciones del panel",
  "Speed test": "Prueba de velocidad",
  Alignment: "Alineación",
  "Data usage": "Consumo de datos",
  Network: "Red",
  Account: "Cuenta",
  "Satellite view": "Vista de satélites",
  Settings: "Ajustes",
  Close: "Cerrar",
  Back: "Volver",
  "Settings section": "Sección de ajustes",
  Router: "Router",
  App: "App",
  Starlink: "Starlink",

  // Top bar
  connecting: "conectando",
  online: "en línea",
  "dish unreachable": "antena inalcanzable",
  "up {uptime}": "activo {uptime}",
  "Color theme: {theme}. Switch to {next}.": "Tema de color: {theme}. Pasar a {next}.",
  "Color theme: {theme}": "Tema de color: {theme}",
  light: "claro",
  dark: "oscuro",
  system: "sistema",

  // Alerts
  Alerts: "Alertas",
  Active: "Activas",
  History: "Historial",
  Status: "Estado",
  "Alerts and notifications": "Alertas y notificaciones",
  "Mute alert sounds": "Silenciar sonidos de alerta",
  "Unmute alert sounds": "Activar sonidos de alerta",
  "Alert sounds on — click to mute": "Sonidos de alerta activos — clic para silenciar",
  "Alert sounds muted — click to unmute": "Sonidos de alerta silenciados — clic para activar",
  "{count} active alert": "{count} alerta activa",
  "{count} active alerts": "{count} alertas activas",
  "Alerts — all healthy": "Alertas — todo en orden",
  " · sounds muted": " · sonidos silenciados",
  "Notifications on": "Notificaciones activadas",
  "Dishylink will alert you about Starlink outages.":
    "Dishylink te va a avisar de los cortes de Starlink.",
  "Enable notifications": "Activar notificaciones",
  "No active alerts.": "No hay alertas activas.",
  "History unavailable — the recorder isn’t running. Live alerts are unaffected.":
    "Historial no disponible — el grabador no está en marcha. Las alertas en vivo siguen funcionando.",
  "No alerts cleared in the last 30 days.": "No se resolvió ninguna alerta en los últimos 30 días.",
  Dish: "Antena",
  System: "Sistema",
  Critical: "Crítica",
  Warning: "Aviso",
  Advisory: "Informativa",
  " · started {time}": " · empezó {time}",
  " · seen {time}": " · vista {time}",
  "{device} · {severity}{when}": "{device} · {severity}{when}",
  "{device} · lasted {span} · cleared {when}": "{device} · duró {span} · se resolvió {when}",
  "Starlink offline · last known status": "Starlink sin conexión · último estado conocido",
  "Dish alert": "Alerta de la antena",
  "Router alert": "Alerta del router",
  "Dishylink alert": "Alerta de Dishylink",
  "Dish alert cleared": "Alerta de la antena resuelta",
  "Router alert cleared": "Alerta del router resuelta",
  "Dishylink alert cleared": "Alerta de Dishylink resuelta",
  "This browser doesn’t support notifications.": "Este navegador no admite notificaciones.",
  "Notifications are blocked for this page in your browser settings.":
    "Las notificaciones están bloqueadas para esta página en los ajustes del navegador.",
  "Notifications weren’t enabled.": "Las notificaciones no quedaron activadas.",

  // Alert copy — dish
  "No water inside the dish": "No hay agua dentro de la antena",
  "Water detected inside the dish": "Se detectó agua dentro de la antena",
  "No water inside the router": "No hay agua dentro del router",
  "Water detected inside the router": "Se detectó agua dentro del router",
  "Not overheated": "Sin sobrecalentamiento",
  "Dish shut itself down to cool off": "La antena se apagó sola para enfriarse",
  "Ethernet connected": "Ethernet conectado",
  "No Ethernet link to the router": "No hay enlace Ethernet con el router",
  "Motors healthy": "Motores en buen estado",
  "Motors are stuck — the dish cannot aim itself":
    "Los motores están trabados — la antena no puede orientarse",
  "Normal temperature": "Temperatura normal",
  "Dish is hot and is limiting speed to cool down":
    "La antena está caliente y limita la velocidad para enfriarse",
  "Power supply temperature normal": "Temperatura de la fuente normal",
  "Power supply is hot and is limiting power": "La fuente está caliente y limita la potencia",
  "Normal Ethernet speeds to router": "Velocidad Ethernet normal hacia el router",
  "Slow Ethernet link to the router": "Enlace Ethernet lento con el router",
  "Ethernet running at full speed": "Ethernet a toda velocidad",
  "Ethernet is capped at 100 Mbps": "Ethernet está limitado a 100 Mbps",
  "Check the cable between the dish and the router.":
    "Revisá el cable entre la antena y el router.",
  "Power supply port normal": "Puerto de la fuente normal",
  "Power supply's router port is running slow": "El puerto del router en la fuente va lento",
  "Mast is near vertical": "El mástil está casi vertical",
  "Mast is not near vertical": "El mástil no está casi vertical",
  "Motor current normal": "Corriente de los motores normal",
  "Low motor current": "Corriente de los motores baja",
  "Signal as predicted": "Señal como se esperaba",
  "Weather interference": "Interferencia del clima",
  "Heavy rain, snow, or thick cloud is weakening the signal below what the dish predicted — it clears when the weather does. If skies are clear, check the dish's view of the sky for new obstructions.":
    "Lluvia fuerte, nieve o nubes densas están debilitando la señal por debajo de lo que la antena esperaba — se aclara cuando pasa el clima. Si el cielo está despejado, revisá si algo nuevo tapa la vista al cielo.",
  "Telemetry current": "Telemetría al día",
  "Dish telemetry has gone stale": "La telemetría de la antena quedó desactualizada",
  "At service location": "En la ubicación de servicio",
  "Dish is away from its registered service location":
    "La antena está fuera de su ubicación de servicio registrada",
  "Obstruction map intact": "Mapa de obstrucciones intacto",
  "Obstruction map was reset — it is remapping the sky":
    "Se reinició el mapa de obstrucciones — está volviendo a mapear el cielo",
  "Not roaming": "Sin roaming",
  "Roaming — away from your registered address": "En roaming — lejos de tu dirección registrada",
  "Not heating": "Sin calefacción",
  "Heating itself to melt snow or ice": "Se está calentando para derretir nieve o hielo",
  "Not sleeping": "Sin suspensión",
  "Sleeping to save power": "En suspensión para ahorrar energía",
  "Starlink software update install completed":
    "La instalación de la actualización de Starlink terminó",
  "Starlink software update install pending":
    "Hay una actualización de Starlink pendiente de instalar",

  // Alert copy — router
  "Power supply fuse intact": "Fusible de la fuente intacto",
  "Power supply fuse has blown": "Se quemó el fusible de la fuente",
  "Power input normal": "Entrada de energía normal",
  "Power supply input voltage is too high": "El voltaje de entrada de la fuente es demasiado alto",
  "Power input steady": "Entrada de energía estable",
  "Power supply input voltage is too low": "El voltaje de entrada de la fuente es demasiado bajo",
  "Router current normal": "Corriente del router normal",
  "Router is drawing too much current": "El router está consumiendo demasiada corriente",
  "Dish reachable over power supply": "Antena alcanzable a través de la fuente",
  "Cannot reach the dish through the power supply":
    "No se puede alcanzar la antena a través de la fuente",
  "Ethernet switch healthy": "Switch Ethernet en buen estado",
  "Ethernet switch error": "Error del switch Ethernet",
  "Good connection to the dish": "Buena conexión con la antena",
  "Poor Ethernet connection to the dish": "Mala conexión Ethernet con la antena",
  "Cable link clean": "El cable está limpio",
  "Cable is dropping pings": "El cable está perdiendo pings",
  "Check the Starlink cable and its connections at both ends.":
    "Revisá el cable de Starlink y las conexiones de ambos extremos.",
  "Router temperature normal": "Temperatura del router normal",
  "Router is hot and is slowing Wi-Fi to cool down":
    "El router está caliente y está bajando el Wi-Fi para enfriarse",
  "Mesh link reliable": "Enlace mesh confiable",
  "Mesh nodes have an unreliable link to the router":
    "Los nodos mesh tienen un enlace inestable con el router",
  "Mesh layout stable": "Disposición mesh estable",
  "Mesh nodes keep switching how they connect": "Los nodos mesh cambian seguido cómo se conectan",
  "LAN ports at full speed": "Puertos LAN a toda velocidad",
  "A LAN port is stuck at 10 Mbps": "Un puerto LAN quedó en 10 Mbps",
  "LAN ports not capped": "Puertos LAN sin límite",
  "A LAN port is capped at 100 Mbps": "Un puerto LAN está limitado a 100 Mbps",
  "Wired mesh on the right port": "Mesh por cable en el puerto correcto",
  "Wired mesh node is not using its WAN port":
    "El nodo mesh por cable no está usando su puerto WAN",
  "Power supply output normal": "Salida de la fuente normal",
  "Power supply is off but still drawing current":
    "La fuente está apagada pero sigue consumiendo corriente",
  "Access control running": "Control de acceso en marcha",
  "Access-control process is missing": "Falta el proceso de control de acceso",
  "Router software update install completed":
    "La instalación de la actualización del router terminó",
  "Router software update install pending":
    "Hay una actualización del router pendiente de instalar",
  "Router configured": "Router configurado",
  "Router is freshly fused and not yet set up":
    "El router está recién fusionado y todavía no se configuró",
  "Sandbox available": "Sandbox disponible",
  "Sandbox mode is disabled": "El modo sandbox está desactivado",
  "Service unrestricted": "Servicio sin restricciones",
  "Only overflight service is blocked": "Solo está bloqueado el servicio de sobrevuelo",
  "Offline networks available": "Redes sin conexión disponibles",
  "Offline networks are disabled": "Las redes sin conexión están desactivadas",

  // Alert copy — system
  "Dish is answering": "La antena está respondiendo",
  "Dish isn’t answering": "La antena no responde",
  "Check that the dish has power and that its cable to the router is seated at both ends.":
    "Revisá que la antena tenga energía y que el cable al router esté bien conectado en ambos extremos.",
  "Router is answering": "El router está respondiendo",
  "Router isn’t answering": "El router no responde",
  "Pings to the Starlink network are succeeding again":
    "Los pings a la red de Starlink vuelven a funcionar",
  "The dish is reachable, but pings to the Starlink network are failing":
    "La antena responde, pero fallan los pings a la red de Starlink",
  "Nothing on your side is wrong. Heavy weather or a gap in satellite coverage will clear on its own.":
    "De tu lado no hay nada mal. El mal tiempo o un hueco de cobertura satelital se resuelve solo.",
  "Recording ran continuously": "La grabación siguió sin cortes",
  "Recording was off — anything in this gap went unrecorded":
    "La grabación estuvo apagada — lo que pasó en este hueco no quedó registrado",
  "History recorder running": "Grabador de historial en marcha",
  "History recorder is down — live alerts still work, but nothing is being recorded":
    "El grabador de historial está caído — las alertas en vivo siguen, pero no se está grabando nada",

  // App settings
  Language: "Idioma",
  "The language this app uses": "El idioma de esta aplicación",
  "App toolbar": "Barra de la app",
  "Floating dock or a left rail for the section links":
    "Dock flotante o una barra a la izquierda para las secciones",
  Dock: "Dock",
  "Left rail": "Barra izquierda",
  "Your device on this network": "Tu dispositivo en esta red",
  'The router lists every connected device the same way, so Dishylink cannot tell which one you are sitting at. Pick yours and it is marked "This device" in the network list, with no pause button of its own: pausing it would cut off the internet connection this dashboard needs to unpause it again, and you would have to undo it from another device or the Starlink app. Change or clear it here at any time.':
    "El router lista todos los dispositivos conectados de la misma forma, así que Dishylink no puede saber en cuál estás. Elegí el tuyo y queda marcado como «Este dispositivo» en la lista de la red, sin botón de pausa: pausarlo cortaría la conexión que este panel necesita para reanudarlo, y tendrías que deshacerlo desde otro dispositivo o la app de Starlink. Podés cambiarlo o quitarlo acá cuando quieras.",
  "Pick the computer you are using right now": "Elegí la computadora que estás usando ahora",
  "That could not be saved, so nothing changed. Try again.":
    "No se pudo guardar, así que no cambió nada. Probá de nuevo.",
  "Until you pick one, no device can be paused.":
    "Hasta que elijas uno, no se puede pausar ningún dispositivo.",
  "The device you picked is not connected right now. Pick it again when it is back.":
    "El dispositivo que elegiste no está conectado ahora. Volvé a elegirlo cuando vuelva.",
  "Not connected": "No conectado",
  "Choose…": "Elegir…",
  None: "Ninguno",
  "Waiting for the router to list your devices…":
    "Esperando a que el router liste tus dispositivos…",
  "Toolbar badge": "Insignia de la barra",
  'The count on the extension icon. Being away from your Starlink makes both devices unreachable, and the badge cannot tell that from a device that has actually failed — so "Device faults only" leaves both out. Alerts still reach the panel and your notifications either way.':
    "El número en el ícono de la extensión. Estar lejos de tu Starlink hace que ambos dispositivos queden inalcanzables, y la insignia no distingue eso de una falla real — por eso «Solo fallas del dispositivo» deja afuera esos dos casos. Las alertas igual llegan al panel y a las notificaciones.",
  "What the count on the extension icon includes":
    "Qué incluye el número del ícono de la extensión",
  "All alerts": "Todas las alertas",
  "Device faults only": "Solo fallas del dispositivo",
  "No badge": "Sin insignia",
  "Throughput in {surface}": "Velocidad en la {surface}",
  "Show the live ↓/↑ rate in the {surface}": "Mostrar la velocidad ↓/↑ en vivo en la {surface}",
  taskbar: "barra de tareas",
  "menu bar": "barra de menú",
  "Hide menu bar icon": "Ocultar el ícono de la barra de menú",
  "Show only the throughput readout, no icon": "Mostrar solo la velocidad, sin ícono",
  "Menu bar icon": "Ícono de la barra de menú",
  "How it looks in the menu bar": "Cómo se ve en la barra de menú",
  Monochrome: "Monocromo",
  Outline: "Contorno",
  "App icon": "Ícono de la app",

  // Searching
  "SEARCHING FOR DISH": "BUSCANDO LA ANTENA",
  "Dishylink talks to your Starlink terminal directly at":
    "Dishylink habla directo con tu terminal Starlink en",
  ". Make sure this machine is connected to the Starlink network (Wi‑Fi or ethernet behind the Starlink router) and that the dish is powered. Retrying automatically…":
    ". Asegurate de que esta computadora esté en la red de Starlink (Wi‑Fi o ethernet detrás del router) y de que la antena tenga energía. Reintenta solo…",

  // Dashboard
  Throughput: "Velocidad",
  "Chart time window": "Ventana de tiempo del gráfico",
  Latency: "Latencia",
  "pop ping · the red band says why": "ping al pop · la banda roja dice por qué",
  "Sky blocked": "Cielo tapado",
  Thermal: "Térmico",
  "No satellites": "Sin satélites",
  "No traffic": "Sin tráfico",
  "No signal": "Sin señal",
  "No schedule": "Sin turno",
  Rebooting: "Reiniciando",
  Weather: "Clima",
  Moving: "Moviéndose",
  Stowed: "Guardada",
  Sleep: "En reposo",
  "Cable test": "Prueba de cable",
  Paused: "Pausada",
  Outage: "Corte",
  "Power draw": "Consumo eléctrico",
  "Starlink Dish Terminal": "Terminal de la antena Starlink",
  "Open full terminal view": "Abrir la vista completa del terminal",
  "from {when}": "de {when}",
  "last known": "último conocido",
  "Latency distribution": "Distribución de latencia",
  "Total energy used": "Energía total usada",
  "Energy range": "Rango de energía",
  "Time window": "Ventana de tiempo",
  "Latency range": "Rango de latencia",
  "Latency view": "Vista de latencia",
  "What is latency quality?": "¿Qué es la calidad de latencia?",
  "How is this measured?": "¿Cómo se mide?",
  "{count} patches mapped": "{count} parches mapeados",

  // Speed test
  "Speed test view": "Vista de la prueba de velocidad",
  DOWNLOAD: "DESCARGA",
  UPLOAD: "SUBIDA",
  LATENCY: "LATENCIA",
  Jitter: "Variación",
  Loss: "Pérdida",
  Download: "Descarga",
  Upload: "Subida",
  Ready: "Lista",
  Failed: "Falló",
  Gauge: "Indicador",
  "Running speed test": "Prueba de velocidad en curso",

  // Alignment
  Rotation: "Rotación",
  Tilt: "Inclinación",
  "Current rotation": "Rotación actual",
  "Rotate recommendation": "Rotación recomendada",
  "Target azimuth": "Azimut objetivo",
  "Boresight error": "Error de orientación",
  "Attitude uncertainty": "Incertidumbre de orientación",
  "Attitude estimation state": "Estado de la estimación",
  "Satellites in View (GPS)": "Satélites a la vista (GPS)",
  "Current tilt": "Inclinación actual",
  "Tilt recommendation": "Inclinación recomendada",
  "Boresight elevation": "Elevación de orientación",
  "Target elevation": "Elevación objetivo",
  "Acceptable elevation range": "Rango de elevación aceptable",
  "Has actuators": "Tiene actuadores",
  "Actuation state": "Estado del actuador",
  "How to read this": "Cómo leer esto",
  Yes: "Sí",
  No: "No",
  Unknown: "Desconocido",
  Idle: "En reposo",
  "Dish not answering — showing the last reading.":
    "La antena no responde — se muestra la última lectura.",
  "Dish not answering — showing the last reading from {when}.":
    "La antena no responde — se muestra la última lectura de {when}.",
  "Attitude filter not ready — alignment data is settling.":
    "El filtro de orientación no está listo — los datos de alineación se están estabilizando.",
  "Starlink is aligned — pointed in the correct direction.":
    "Starlink está alineado — apunta en la dirección correcta.",
  "Starlink is not aligned — adjust the dish toward the wedge.":
    "Starlink no está alineado — ajustá la antena hacia la cuña.",

  // Obstructions
  Obstructions: "Obstrucciones",
  "Obstruction time-lapse": "Lapso de obstrucciones",
  "Clear view": "Vista despejada",
  Partial: "Parcial",
  "Serving satellite": "Satélite en servicio",
  "Sky obstructed": "Cielo obstruido",
  "Observed for": "Observado durante",
  "Satellites overhead": "Satélites arriba",
  "Next 30 min minimum": "Mínimo de los próximos 30 min",
  "Likely serving satellite": "Satélite que probablemente está en servicio",

  // Satellite
  "Live satellite view": "Vista de satélites en vivo",
  "Reset view": "Restablecer vista",
  "Support & more": "Ayuda y más",
  "Support and more": "Ayuda y más",
  "Support and more (update available)": "Ayuda y más (hay una actualización)",

  // Account
  Profile: "Perfil",
  Name: "Nombre",
  Email: "Correo",
  "Service plan": "Plan de servicio",
  Plan: "Plan",
  "Service line": "Línea de servicio",
  "Active since": "Activo desde",
  "Service location": "Ubicación de servicio",
  Address: "Dirección",
  Coordinates: "Coordenadas",
  Devices: "Dispositivos",
  "No devices on this account.": "No hay dispositivos en esta cuenta.",
  "Starlink account": "Cuenta de Starlink",

  // Data usage
  "Data usage source": "Origen del consumo",
  "Data usage range": "Rango de consumo",
  "Usage Limit:": "Límite de uso:",
  "Billing cycle month": "Mes del ciclo de facturación",
  "Where does this come from?": "¿De dónde sale esto?",
  "Active now": "Activo ahora",

  // Network
  "Network view": "Vista de la red",
  "Router and mesh nodes": "Router y nodos mesh",
  "This device": "Este dispositivo",
  "Main Router": "Router principal",
  "Mesh node": "Nodo mesh",
  "Unnamed device": "Dispositivo sin nombre",
  "unknown device": "dispositivo desconocido",
  Private: "Privada",
  Direct: "Directa",
  wired: "por cable",
  excellent: "excelente",
  good: "buena",
  fair: "regular",
  weak: "débil",
  "5 GHz high": "5 GHz alta",
  Connecting: "Conectando",
  "Radio temperatures": "Temperaturas de radio",
  "Rename node": "Renombrar nodo",
  Role: "Rol",
  "Signal strength": "Intensidad de señal",
  "Rx rate": "Tasa de recepción",
  Connection: "Conexión",
  Interface: "Interfaz",
  Uplink: "Enlace de subida",
  "Starlink dish": "Antena Starlink",
  "MAC address": "Dirección MAC",
  "Device ID": "ID del dispositivo",
  "IP address": "Dirección IP",
  Firmware: "Firmware",
  Hardware: "Hardware",
  Uptime: "Tiempo activo",
  "Last reboot": "Último reinicio",
  Region: "Región",
  "Connected devices": "Dispositivos conectados",
  "Data limit": "Límite de datos",
  "Device name": "Nombre del dispositivo",
  "Node name": "Nombre del nodo",
  Save: "Guardar",
  Saving: "Guardando",
  Deleting: "Eliminando",
  "No throughput history. The history recorder isn't running, and the router on your network can't be reached.":
    "No hay historial de velocidad. El grabador no está en marcha y no se puede alcanzar el router de tu red.",
  "No throughput history. The history recorder isn't running, so nothing is being recorded.":
    "No hay historial de velocidad. El grabador no está en marcha, así que no se está registrando nada.",
  "No throughput history. Per-device rates are read from the router on your network, which can't be reached right now.":
    "No hay historial de velocidad. Las tasas por dispositivo se leen del router de tu red, que ahora no se puede alcanzar.",
  "Collecting live throughput… charts fill in as the router is polled (every 5 s).":
    "Juntando la velocidad en vivo… los gráficos se completan a medida que se consulta el router (cada 5 s).",

  // Rules
  "Create a rule": "Crear una regla",
  Schedule: "Horario",
  Hours: "Horas",
  Minutes: "Minutos",
  "Applies to": "Se aplica a",
  Allowance: "Cupo",
  Resets: "Se reinicia",
  "Resets on": "Se reinicia el",
  "Resets on day": "Se reinicia el día",
  "This cycle": "Este ciclo",
  "Data allowance": "Cupo de datos",
  "Time left": "Tiempo restante",
  "Pauses at": "Pausa a las",
  "Set for": "Definido para",
  now: "ahora",
  "Right now": "Ahora mismo",
  "Resets in": "Se reinicia en",
  never: "nunca",
  Cycle: "Ciclo",
  " each": " cada uno",
  " shared": " compartido",
  Daily: "Diario",
  Weekly: "Semanal",
  Monthly: "Mensual",
  "Starlink billing": "Facturación de Starlink",
  "One-off": "Una vez",
  Sunday: "domingo",
  Monday: "lunes",
  Tuesday: "martes",
  Wednesday: "miércoles",
  Thursday: "jueves",
  Friday: "viernes",
  Saturday: "sábado",
  Sun: "dom",
  Mon: "lun",
  Tue: "mar",
  Wed: "mié",
  Thu: "jue",
  Fri: "vie",
  Sat: "sáb",
  "Kids devices": "Dispositivos de los chicos",
  "Auto-pause": "Pausa automática",
  "Auto-pause data": "Pausa automática de datos",
  "What each kind of rule does": "Qué hace cada tipo de regla",
  Each: "Cada uno",
  Shared: "Compartido",
  "Allowance in gigabytes": "Cupo en gigabytes",
  "Extend the slider": "Extender el control",
  "Change how far the slider reaches": "Cambiar hasta dónde llega el control",
  "Shorten the slider": "Acortar el control",
  "Later in the month": "Más adelante en el mes",
  "Earlier in the month": "Más temprano en el mes",
  "What the schedule does": "Qué hace el horario",
  "Remove this schedule": "Quitar este horario",
  From: "Desde",
  To: "Hasta",
  "This device reached its limit, but the pause could not be sent to Starlink.":
    "Este dispositivo llegó a su límite, pero no se pudo enviar la pausa a Starlink.",
  "Watches and announces, but never cuts anything off.": "Observa y avisa, pero nunca corta nada.",
  "Cuts their internet when the time is up.": "Corta su internet cuando se acaba el tiempo.",
  "Cuts this device’s internet when the time is up.":
    "Corta el internet de este dispositivo cuando se acaba el tiempo.",
  "Cuts their internet outside the hours set below.":
    "Corta su internet fuera del horario de abajo.",
  "Cuts this device’s internet outside the hours set below.":
    "Corta el internet de este dispositivo fuera del horario de abajo.",
  "Cuts their internet until the cycle turns over.":
    "Corta su internet hasta que termine el ciclo.",
  "Cuts this device’s internet until the cycle turns over.":
    "Corta el internet de este dispositivo hasta que termine el ciclo.",

  // Settings — starlink / router
  Maintenance: "Mantenimiento",
  Networks: "Redes",
  "Mesh nodes": "Nodos mesh",
  "WPA2 · password managed in the Starlink app":
    "WPA2 · la contraseña se administra en la app de Starlink",
  "Router firmware": "Firmware del router",
  "Reboot router": "Reiniciar el router",
  "Factory reset router": "Restablecer el router de fábrica",
  Advanced: "Avanzado",
  Bypass: "Bypass",
  "Bypass mode": "Modo bypass",
  "Are you sure?": "¿Estás seguro?",
  "Reboot sent — the router is restarting.": "Reinicio enviado — el router se está reiniciando.",
  "Factory reset sent through your Starlink account — the router is wiping and restarting.":
    "Restablecimiento enviado por tu cuenta de Starlink — el router se está borrando y reiniciando.",
  "Factory reset sent — the router is wiping and restarting.":
    "Restablecimiento enviado — el router se está borrando y reiniciando.",
  Automatic: "Automático",
  "Snow melt": "Derretimiento de nieve",
  "Always on": "Siempre activo",
  Off: "Apagado",
  "Automatically detect snow and heat up when needed.":
    "Detecta la nieve y calienta cuando hace falta.",
  "Keep warm to better resist snow build-up. This option may increase power consumption.":
    "Se mantiene tibia para resistir mejor la nieve. Puede aumentar el consumo eléctrico.",
  "Never use extra power to melt snow.": "Nunca usa energía extra para derretir nieve.",
  "Heats the panel to shed snow. Auto uses the dish's own sensors.":
    "Calienta el panel para sacar la nieve. Automático usa los sensores de la antena.",
  "Sleep schedule": "Horario de suspensión",
  "Power the dish down for part of every day": "Apaga la antena durante una parte de cada día",
  "Update reboots happen {range}": "Los reinicios por actualización ocurren {range}",
  "Overnight, around 3 AM": "De madrugada, alrededor de las 3",
  "Between 12 AM and 6 AM": "entre las 0 y las 6",
  "Morning, around 9 AM": "A la mañana, alrededor de las 9",
  "Between 6 AM and 12 PM": "entre las 6 y las 12",
  "Afternoon, around 3 PM": "A la tarde, alrededor de las 15",
  "Between 12 PM and 6 PM": "entre las 12 y las 18",
  "Evening, around 9 PM": "A la noche, alrededor de las 21",
  "Between 6 PM and 12 AM": "entre las 18 y las 24",
  "Software updates": "Actualizaciones de software",
  "Defer updates": "Posponer actualizaciones",
  "Hold firmware updates for up to 3 days": "Retener actualizaciones de firmware hasta 3 días",
  "Debug data": "Datos de depuración",
  Copy: "Copiar",
  "Copy failed": "No se pudo copiar",
  Reset: "Reiniciar",
  Reboot: "Reiniciar",
  "Reboot dish": "Reiniciar la antena",
  "Factory reset": "Restablecer de fábrica",
  "Factory reset dish": "Restablecer la antena de fábrica",
  "Copied ✓": "Copiado ✓",
  "Yes, reset map": "Sí, reiniciar el mapa",
  "Slide to reboot dish": "Deslizá para reiniciar la antena",
  "Slide to factory reset the dish": "Deslizá para restablecer la antena de fábrica",
  "Diagnostics + status + config as JSON, for support or bug reports":
    "Diagnóstico + estado + configuración en JSON, para soporte o reportes de errores",
  "Reset obstruction map": "Reiniciar el mapa de obstrucciones",
  "Wipes the learned sky survey — do this after physically relocating the dish. Takes hours to relearn.":
    "Borra el relevamiento del cielo — hacelo después de mover la antena de lugar. Tarda horas en volver a aprenderlo.",
  "Reboot Starlink": "Reiniciar Starlink",
  "Internet drops for ~2–3 minutes while the dish restarts":
    "Se corta internet unos 2 o 3 minutos mientras la antena se reinicia",
  "Factory reset Starlink": "Restablecer Starlink de fábrica",
  "Wipes every dish setting back to how it shipped. Not reversible.":
    "Borra todos los ajustes de la antena y los deja como salieron de fábrica. No se puede deshacer.",
  "Obstruction map cleared — the survey restarts now.":
    "Mapa de obstrucciones borrado — el relevamiento empieza de nuevo.",
  "Reboot command sent — the dish is restarting.":
    "Reinicio enviado — la antena se está reiniciando.",
  "Factory reset sent — the dish is wiping and restarting.":
    "Restablecimiento enviado — la antena se está borrando y reiniciando.",
  "Custom DNS": "DNS personalizado",
  "Custom DNS lets you specify IPv4 or IPv6 addresses of one or more alternate DNS servers to be used for lookups instead of the Starlink defaults. A server that doesn't answer stops lookups for every device on the network.":
    "El DNS personalizado permite indicar direcciones IPv4 o IPv6 de uno o más servidores DNS alternativos, en lugar de los de Starlink. Un servidor que no responde corta las búsquedas de todos los dispositivos de la red.",
  Subnet: "Subred",
  Current: "Actual",
  "Router IP address": "Dirección IP del router",
  hour: "hora",
  minute: "minuto",
  "Click to type": "Clic para escribir",

  // Account connect / prompts
  "Connect your Starlink account": "Conectá tu cuenta de Starlink",
  "Signing in": "Iniciando sesión",
  Connect: "Conectar",
  "Starlink session cookie": "Cookie de sesión de Starlink",
  "Enjoying Dishylink?": "¿Te está sirviendo Dishylink?",
  "Dishylink is free, and always will be.": "Dishylink es gratis, y siempre lo va a ser.",
  Dismiss: "Cerrar",

  // Misc visible
  "MB USED": "MB USADOS",
  "GB USED": "GB USADOS",
  "Slide to turn on bypass mode": "Deslizá para activar el modo bypass",
  "Turning bypass on": "Activando el bypass",
  "Turning bypass off": "Desactivando el bypass",
  Cancel: "Cancelar",
  "Sending…": "Enviando…",
  "Confirm to continue": "Confirmá para seguir",

  "current traffic": "tráfico actual",
  "Quality:": "Calidad:",
  grade: "nota",
  "no data": "sin datos",
  "pop ping, live": "ping al pop, en vivo",
  "current draw": "consumo actual",
  "Ping success": "Pings exitosos",
  "last minute": "último minuto",
  "all-time view": "vista histórica",
  "≈ {kwh} kWh/day at recent draw": "≈ {kwh} kWh/día con el consumo reciente",
  "dish isn’t answering — no status received yet":
    "la antena no responde — todavía no llegó ningún estado",
  "waiting for the dish’s first reply…": "esperando la primera respuesta de la antena…",
  "Starlink ping success": "Pings exitosos de Starlink",
  "Router ping success": "Pings exitosos del router",
  Unmapped: "Sin mapear",
  "{inView} · {serviceable} serviceable": "{inView} · {serviceable} utilizables",
  "{count} serviceable": "{count} utilizables",
  "none above 25°": "ninguno por encima de 25°",
  "Pause rotation": "Pausar rotación",
  "Resume rotation": "Reanudar rotación",
  "Hide unmapped sky": "Ocultar cielo sin mapear",
  "Show unmapped sky": "Mostrar cielo sin mapear",
  "macOS isn’t delivering notifications — allow Dishylink under System Settings ▸ Notifications.":
    "macOS no está entregando las notificaciones — permití Dishylink en Ajustes del sistema ▸ Notificaciones.",
  "Native notifications need the installed Dishylink app; a dev run can’t post them.":
    "Las notificaciones nativas necesitan la app de Dishylink instalada; una ejecución de desarrollo no puede enviarlas.",

  "Satellites are propagated live from SpaceX's published ephemerides.":
    "Los satélites se calculan en vivo con las efemérides que publica SpaceX.",
  "site {coords}": "ubicación {coords}",
  "No location set to fetch live satellites":
    "Sin ubicación no se pueden traer los satélites en vivo",
  change: "cambiar",
  set: "poner",
  clear: "borrar",
  "Loading SpaceX's published constellation ephemerides…":
    "Cargando las efemérides de la constelación que publica SpaceX…",
  "Can't reach the satellite data source — check your internet connection. Retrying automatically.":
    "No se llega a la fuente de datos de satélites — revisá tu conexión a internet. Reintenta solo.",
  "The satellite data source isn't responding right now. Retrying automatically.":
    "La fuente de datos de satélites no responde ahora. Reintenta solo.",
  "Your Starlink has an unobstructed view of the sky. The map sharpens as the dish collects data.":
    "Tu Starlink tiene el cielo despejado. El mapa se afina a medida que la antena junta datos.",
  "Your Starlink has an unobstructed view of the sky. The map becomes more accurate as the dish collects data.":
    "Tu Starlink tiene el cielo despejado. El mapa se vuelve más preciso a medida que la antena junta datos.",
  "Obstructed patches cause brief interruptions as satellites pass behind them.":
    "Las zonas obstruidas causan cortes breves cuando los satélites pasan detrás.",
  "Exit immersive view": "Salir de la vista inmersiva",
  "Immersive view": "Vista inmersiva",
  "Hide dome": "Ocultar la cúpula",
  "Show dome": "Mostrar la cúpula",
  "Viewing the obstruction map as of {when}": "Mapa de obstrucciones al {when}",
  "This browser could not open a WebGL context.": "Este navegador no pudo abrir un contexto WebGL.",
  "Waiting for the dish's obstruction map…": "Esperando el mapa de obstrucciones de la antena…",
  "time-lapse": "lapso",
  "Drag to orbit · Scroll to zoom · Esc to close":
    "Arrastrá para orbitar · Rueda para zoom · Esc para cerrar",
  LIVE: "EN VIVO",
  OFFLINE: "CAÍDA",
  elevation: "elevación",
  azimuth: "azimut",
  altitude: "altitud",
  distance: "distancia",
  speed: "velocidad",
  "Close satellite details": "Cerrar detalles del satélite",
  "{name} · {elev}° el · {range} km": "{name} · {elev}° elev. · {range} km",
  "Starlink satellites currently above your horizon. 'Serviceable' ones are high enough (above ~25° elevation) that your dish could actually lock onto them.":
    "Satélites de Starlink que están ahora sobre tu horizonte. Los «utilizables» están lo bastante altos (más de ~25° de elevación) como para que la antena pueda engancharlos.",
  "The fewest serviceable satellites at any moment over the next 30 minutes, from SpaceX's published orbits. A low number can mean brief drops as satellites hand off.":
    "La menor cantidad de satélites utilizables en cualquier momento de los próximos 30 minutos, según las órbitas que publica SpaceX. Un número bajo puede significar cortes breves en el pase de un satélite a otro.",
  "Our best guess at the satellite your dish is talking to right now — the highest, unobstructed one, inferred from live orbits.":
    "Nuestra mejor estimación del satélite con el que habla tu antena ahora: el más alto y sin obstrucciones, a partir de las órbitas en vivo.",
  "To show the satellites passing over you, we need to know where your dish is. Tip: long-press your home in Google Maps, or open the iPhone":
    "Para mostrar los satélites que pasan sobre vos, hay que saber dónde está la antena. Consejo: mantené apretada tu casa en Google Maps, o abrí la app",
  Compass: "Brújula",
  "app, and paste what it shows.": "del iPhone y pegá lo que muestra.",
  "Couldn't read that — paste as “6.5244, 3.3792” (latitude, longitude).":
    "No se pudo leer — pegalo como «6.5244, 3.3792» (latitud, longitud).",
  "This device can't resolve its position (desktop Macs need Location Services enabled for the browser, and Wi-Fi positioning may not cover your area). Try the IP option or paste coordinates.":
    "Este dispositivo no puede resolver su posición (en una Mac de escritorio hay que activar los servicios de ubicación del navegador, y la ubicación por Wi-Fi puede no cubrir tu zona). Probá por IP o pegá las coordenadas.",
  "IP lookup failed — paste coordinates instead.":
    "Falló la búsqueda por IP — pegá las coordenadas.",
  "Latitude, longitude": "Latitud, longitud",
  "Locating…": "Ubicando…",
  "Use this device location": "Usar la ubicación de este dispositivo",
  "Looking up…": "Buscando…",
  "Approximate from IP": "Aproximar por IP",

  // Same English word, different Spanish depending on the screen.
  "Active@@status": "Activo",
  "Active@@rule": "Activa",
  "Paused@@device": "Pausado",
  PAUSED: "EN PAUSA",
  "Connected@@node": "Conectado",

  // Terminal facts
  Subsystems: "Subsistemas",
  "all ready": "todo listo",
  "{names} coming up": "{names} arrancando",
  Signal: "Señal",
  "weather affecting signal": "el clima afecta la señal",
  "weak — below noise floor": "débil — bajo el piso de ruido",
  normal: "normal",
  Model: "Modelo",
  Country: "País",
  "Boot count": "Arranques",
  "Service class": "Clase de servicio",
  "no fix": "sin posición",
  "{count} satellites": "{count} satélites",
  Position: "Posición",
  idle: "en reposo",
  locked: "fijada",
  "locked · {state}": "fijada · {state}",
  Converged: "Convergido",
  Unconverged: "Sin converger",
  "Ethernet link": "Enlace Ethernet",
  "Downstream routers": "Routers aguas abajo",
  " · bypassed": " · en bypass",
  "Bandwidth limit": "Límite de ancho de banda",
  none: "ninguno",
  Boresight: "Orientación",
  "Software update": "Actualización de software",
  "Update ready — reboot possible in {when}": "Actualización lista — se puede reiniciar en {when}",
  "Software update: {state}": "Actualización de software: {state}",
  "not answering · {when}": "no responde · {when}",
  "not answering · last known": "no responde · último conocido",
  residential: "residencial",
  roam: "roam",
  business: "empresarial",
  "business plus": "empresarial plus",

  // Support menu
  "Support development": "Apoyar el desarrollo",
  "Star project on GitHub": "Marcá el proyecto en GitHub",
  "Become a GitHub Sponsor": "Hacete sponsor en GitHub",
  "Become a Patreon": "Sumate en Patreon",
  "Buy Me a Coffee": "Invitame un café",
  Feedback: "Comentarios",
  "Report an issue": "Reportar un problema",
  "Request a feature": "Pedir una función",
  Contact: "Contacto",
  "Contact me": "Escribime",
  Legal: "Legal",
  "Privacy Policy": "Política de privacidad",
  Disclaimer: "Aviso legal",
  "Update available": "Hay una actualización",
  "Download v{version}": "Descargar v{version}",

  // Network
  Connected: "Conectados",
  Nodes: "Nodos",
  Rules: "Reglas",
  "Dismiss this note": "Cerrar esta nota",
  "These devices come from your Starlink account, so they refresh every {seconds} s and carry no live throughput.":
    "Estos dispositivos vienen de tu cuenta de Starlink, así que se actualizan cada {seconds} s y no traen velocidad en vivo.",
  "{count} device": "{count} dispositivo",
  "{count} devices": "{count} dispositivos",
  "via your Starlink account, no longer refreshing":
    "desde tu cuenta de Starlink, ya no se actualiza",
  "via your Starlink account, refreshed every {seconds} s":
    "desde tu cuenta de Starlink, actualizado cada {seconds} s",
  "live from the router, refreshed every {seconds} s":
    "en vivo desde el router, actualizado cada {seconds} s",
  "Pause feature disabled! To enable,": "La pausa está desactivada. Para activarla,",
  "sign in": "iniciá sesión",
  reconnect: "reconectate",
  "to your Starlink account": "en tu cuenta de Starlink",
  and: "y",
  "pick the current device you are using under app's":
    "elegí el dispositivo que estás usando en los",
  "settings.": "ajustes de la app.",
  settings: "ajustes",
  "That keeps your own device off the list of things this app can cut off.":
    "Así tu propio dispositivo no entra en la lista de lo que esta app puede cortar.",
  "Connected to Starlink": "Conectado a Starlink",
  Disconnected: "Desconectado",
  "Couldn't reach your Starlink account. Check this device's internet connection.":
    "No se pudo llegar a tu cuenta de Starlink. Revisá la conexión a internet de este dispositivo.",
  "Connect your Starlink account first.": "Primero conectá tu cuenta de Starlink.",
  "The historian refused the change — open the dashboard from this machine or your local network.":
    "El grabador rechazó el cambio — abrí el panel desde esta computadora o tu red local.",
  "The historian rejected the change (HTTP {status}).":
    "El grabador rechazó el cambio (HTTP {status}).",

  // Router unreachable
  "Another device on this network is using {address}, the address the Starlink router answers on, so the router is hidden behind it. To fix it, connect to your Starlink WiFi, give the other router a different address (like {alt}), or point Dishylink's router address at wherever your Starlink router actually is.":
    "Otro dispositivo de esta red está usando {address}, la dirección en la que responde el router de Starlink, así que el router queda oculto detrás. Para arreglarlo, conectate al WiFi de Starlink, dale al otro router otra dirección (como {alt}) o apuntá la dirección de router de Dishylink a donde esté realmente el tuyo.",
  "Nothing answered at {address}, the address Dishylink is set to use, but the dish reports your Starlink router is running. It is most likely at a different address. Check that setting, or clear it to go back to the default.":
    "Nada respondió en {address}, la dirección que Dishylink tiene configurada, pero la antena dice que tu router de Starlink está en marcha. Lo más probable es que esté en otra dirección. Revisá ese ajuste, o borralo para volver al valor por defecto.",
  "Your Starlink router is running, but this device isn't on the network {address} belongs to. Connect to your Starlink WiFi, or if the router's subnet was changed, point Dishylink's router address at where it is now.":
    "Tu router de Starlink está en marcha, pero este dispositivo no está en la red de {address}. Conectate al WiFi de Starlink o, si cambió la subred del router, apuntá la dirección de router de Dishylink a donde está ahora.",
  "Bypass mode is on, so the Starlink router is switched off and a third-party router runs your network. WiFi, the client list and the router's own settings all come from it, so there's nothing to show here. Everything on the dish is unaffected.":
    "El modo bypass está activo, así que el router de Starlink está apagado y otro router maneja tu red. El WiFi, la lista de clientes y los ajustes del router salen de ese equipo, así que acá no hay nada que mostrar. En la antena no cambia nada.",
  "The dish isn't reporting a Starlink router, so this kit either doesn't have one or it's powered off. WiFi and connected devices come from the router, so there's nothing to show here. Everything on the dish is unaffected.":
    "La antena no informa un router de Starlink, así que este kit no tiene uno o está apagado. El WiFi y los dispositivos conectados salen del router, así que acá no hay nada que mostrar. En la antena no cambia nada.",
  "Couldn't reach the Starlink router at {address}. Another device may be using that address, the router may be in bypass mode or on a different network, or it may be at an address other than the one Dishylink is set to use.":
    "No se pudo llegar al router de Starlink en {address}. Puede que otro dispositivo use esa dirección, que el router esté en modo bypass o en otra red, o que esté en una dirección distinta de la que tiene Dishylink.",
  "Couldn't reach the Starlink router at {address}. Working out why; most short silences are the router restarting.":
    "No se pudo llegar al router de Starlink en {address}. Estamos viendo por qué; la mayoría de los silencios cortos son el router reiniciándose.",

  // Events
  "Events & outages": "Eventos y cortes",
  "{count} event": "{count} evento",
  "{count} events": "{count} eventos",
  "no outages recorded in the current window": "no hay cortes registrados en esta ventana",
  "Ping Network Interruption": "Interrupción de pings",
  "Radio frequency link looked fine but pings to the ground station/POP failed — traffic wasn't actually flowing.":
    "El enlace de radio se veía bien, pero fallaron los pings a la estación terrestre — el tráfico en realidad no circulaba.",
  "Downlink Network Interruption": "Interrupción de bajada",
  "Dish was pointed at a satellite but received no decodable downlink signal.":
    "La antena apuntaba a un satélite pero no recibió una señal de bajada que se pudiera decodificar.",
  "No satellite in range": "Ningún satélite a la vista",
  "No Starlink satellite was overhead to connect to.":
    "No había ningún satélite de Starlink arriba para conectarse.",
  "No service scheduled": "Sin servicio asignado",
  "Network gave your cell no time slot (seen during network congestion, service issues, account problems, or right after boot before a schedule downloads).":
    "La red no le dio un turno a tu celda (pasa con congestión, problemas de servicio, problemas de cuenta, o justo después de arrancar, antes de que baje un horario).",
  "Unknown Event": "Evento desconocido",
  "Unknown event": "Evento desconocido",
  "Dish couldn't classify the drop.": "La antena no pudo clasificar el corte.",
  "Dish's view obstructed": "Vista de la antena obstruida",
  "Something physically blocked the dish's view of the sky (branch, roof, pole), so it dropped the satellite.":
    "Algo tapó físicamente la vista de la antena al cielo (una rama, un techo, un poste) y soltó el satélite.",
  Overheated: "Sobrecalentada",
  "The dish's internal temperature exceeded safe limits (hot climate + direct sun) and it shut down to cool off.":
    "La temperatura interna de la antena superó el límite seguro (clima caluroso y sol directo) y se apagó para enfriarse.",
  "Heavy rain/snow degraded signal-to-noise below usable level.":
    "Lluvia o nieve fuerte bajaron la relación señal-ruido por debajo de lo usable.",
  "Starlink booting": "Starlink arrancando",
  "Dish was rebooting / powering up.": "La antena se estaba reiniciando o encendiendo.",
  "Searching for satellites": "Buscando satélites",
  "Dish was scanning the sky to lock onto satellites (after boot or being moved).":
    "La antena barría el cielo para enganchar satélites (después de arrancar o de moverla).",
  Repositioning: "Reorientando",
  "The dish's motors were physically moving it (repositioning/realigning); RF is muted while it moves.":
    "Los motores de la antena la estaban moviendo; la radio queda en silencio mientras se mueve.",
  "Dish stowed": "Antena guardada",
  "Dish was folded in stow position.": "La antena estaba plegada en posición de guardado.",
  "Scheduled sleep": "Suspensión programada",
  'Scheduled sleep window (the "snooze" schedule in the app).':
    "Ventana de suspensión programada (el horario de reposo de la app).",
  "Dish was running its cable diagnostic.": "La antena estaba corriendo el diagnóstico del cable.",
  "Transmission paused": "Transmisión en pausa",
  "Dish stopped transmitting (RF inhibited — for safety, or commanded off).":
    "La antena dejó de transmitir (radio inhibida, por seguridad o porque se lo ordenaron).",
  "Router powered on": "Router encendido",
  "The router lost and regained power (unplugged/replugged, or a power blip).":
    "El router perdió y recuperó la energía (se desenchufó, o hubo un corte breve).",
  "Device switched WiFi band": "El dispositivo cambió de banda WiFi",
  "A connected device moved between the 2.4 GHz and 5 GHz bands. This is normal when devices are optimizing their connection for best WiFi performance.":
    "Un dispositivo conectado pasó de 2,4 GHz a 5 GHz o al revés. Es normal cuando buscan la mejor conexión WiFi.",
  "Ethernet cable link to dish disconnected": "Se desconectó el cable Ethernet a la antena",
  "The ethernet link between the router and the dish went dead. Expected for a few seconds while either device reboots; at any other time, check the cable at both ends.":
    "El enlace Ethernet entre el router y la antena se cayó. Es esperable unos segundos si alguno se reinicia; en cualquier otro momento, revisá el cable en ambos extremos.",
  "Router lost its keepalive ping (IPv4)": "El router perdió el ping de control (IPv4)",
  "The router's own ping to the ground station went unanswered. It watches the link with these pings; losing them means the path looked unhealthy to the router, not that your traffic stopped — data usually keeps flowing right through it.":
    "El ping del router a la estación terrestre no tuvo respuesta. El router vigila el enlace con esos pings; perderlos significa que el camino le pareció mal, no que tu tráfico se haya detenido — los datos suelen seguir pasando.",
  "Router lost its keepalive ping (IPv6)": "El router perdió el ping de control (IPv6)",
  "As the IPv4 drop, on the IPv6 path. Seen alone it usually means only IPv6 was affected, which most traffic can route around.":
    "Igual que la caída de IPv4, pero en el camino IPv6. Si aparece sola, en general solo se afectó IPv6, y la mayoría del tráfico puede rodearlo.",
  "Router lost contact with the dish briefly": "El router perdió contacto con la antena un momento",
  "The router's keepalive ping to the dish over the Ethernet cable went unanswered. Expected while the dish reboots; otherwise it points at the cable between them.":
    "El ping de control del router a la antena por el cable Ethernet no tuvo respuesta. Es esperable mientras la antena se reinicia; si no, apunta al cable que las une.",
  "High downlink packet loss": "Alta pérdida de paquetes de bajada",
  "A raised share of incoming packets was lost. The connection stayed up — this is quality degrading, not service stopping.":
    "Se perdió una parte alta de los paquetes que entraban. La conexión siguió — es la calidad la que baja, no el servicio el que se corta.",
  "Device moved to another access point": "El dispositivo pasó a otro punto de acceso",
  "A connected device handed off between the router and a mesh node, or between radios.":
    "Un dispositivo conectado pasó del router a un nodo mesh, o de una radio a otra.",
  "Public IP address changed": "Cambió la dirección IP pública",
  "Starlink issued the router a different public IPv4 address — normal on a CGNAT network.":
    "Starlink le dio al router otra dirección IPv4 pública — es normal en una red con CGNAT.",
  "thermal shutdown": "apagado térmico",
  "thermal shutdown (ongoing)": "apagado térmico (en curso)",
  "thermal throttle": "limitación térmica",
  "thermal throttle (ongoing)": "limitación térmica (en curso)",
  "power supply thermal throttle": "limitación térmica de la fuente",
  "power supply thermal throttle (ongoing)": "limitación térmica de la fuente (en curso)",
  "Thermal throttle (ongoing)": "Limitación térmica (en curso)",

  // Speed test
  "Measures download, upload, and latency through your Starlink link.":
    "Mide descarga, subida y latencia a través de tu enlace Starlink.",
  "Measuring download…": "Midiendo la descarga…",
  "Measuring upload…": "Midiendo la subida…",
  "Done.": "Listo.",
  "Test failed — check the connection and try again.":
    "La prueba falló — revisá la conexión y probá de nuevo.",
  "Run again": "Repetir",
  "Try again": "Reintentar",
  Go: "Empezar",
  "Measured against Cloudflare · may read lower than tests to a nearby server":
    "Medido contra Cloudflare · puede dar menos que una prueba a un servidor cercano",

  // Data usage
  "Local session": "Sesión local",
  Total: "Total",
  "↓ Download": "↓ Descarga",
  "↑ Upload": "↑ Subida",
  "{when} · no data — the historian wasn't running":
    "{when} · sin datos — el grabador no estaba en marcha",
  "Data usage needs the history recorder running. Start it with npm run historian and Dishylink will meter traffic from now on.":
    "El consumo necesita el grabador de historial en marcha. Inicialo con npm run historian y Dishylink va a medir el tráfico desde ahora.",
  "collected {percent}% of this period": "se registró el {percent}% de este período",
  " — totals cover only the time the recorder was running":
    " — los totales cubren solo el tiempo en que el grabador estuvo en marcha",
  "Dishylink integrates the dish's own per-second throughput telemetry into per-minute volume, on this machine. It tracks your real traffic from the moment the historian started — it is not Starlink's billing meter, which lives in their cloud and counts in UTC.":
    "Dishylink integra la telemetría de velocidad por segundo de la antena en volumen por minuto, en esta computadora. Sigue tu tráfico real desde que arrancó el grabador — no es el medidor de facturación de Starlink, que vive en su nube y cuenta en UTC.",
  "Couldn't reach Starlink's usage service. Check your internet and try again.":
    "No se pudo llegar al servicio de consumo de Starlink. Revisá tu internet y probá de nuevo.",
  "Loading Starlink billing data…": "Cargando los datos de facturación de Starlink…",
  "Starlink hasn't reported a billing cycle for this service line yet.":
    "Starlink todavía no informó un ciclo de facturación para esta línea de servicio.",
  Data: "Datos",
  "{amount} included (unlimited)": "{amount} incluidos (ilimitado)",
  "of {amount} included": "de {amount} incluidos",
  "billing cycle": "ciclo de facturación",
  "This is Starlink's own billing meter, read from your account. It's complete and counted in UTC — the authoritative figure your statement uses.":
    "Este es el medidor de facturación de Starlink, leído de tu cuenta. Está completo y se cuenta en UTC — es la cifra que usa tu resumen.",
  "Devices Usage": "Consumo por dispositivo",
  "How much data each device has used this month. The total keeps adding up even if a device leaves and rejoins your network, and it starts over at the beginning of each month.":
    "Cuántos datos usó cada dispositivo este mes. El total sigue sumando aunque un dispositivo se vaya y vuelva a la red, y se reinicia al empezar cada mes.",
  "Clear all?": "¿Borrar todo?",
  "Clear all": "Borrar todo",
  "Usage unavailable — historian not reachable.":
    "Consumo no disponible — no se llega al grabador.",
  "The device you are using counts Dishylink's own checks of your dish and router as its data. To leave them out,":
    "El dispositivo que estás usando cuenta las consultas de Dishylink a la antena y al router como datos suyos. Para dejarlas afuera,",
  "pick it under app's settings": "elegilo en los ajustes de la app",
  "Reset this month's usage for {name}": "Reiniciar el consumo de este mes de {name}",
  "Delete usage record for {name}": "Borrar el registro de consumo de {name}",
  Today: "Hoy",
  Day: "Día",
  Week: "Semana",
  Month: "Mes",

  // Energy and latency detail
  "Long-term energy needs the history recorder running. Start it with npm run historian and it will build up day / week / month history from now on.":
    "La energía a largo plazo necesita el grabador de historial en marcha. Inicialo con npm run historian y va a armar el historial por día, semana y mes desde ahora.",
  "{when} · {total} kWh": "{when} · {total} kWh",
  "{when} · {total} kWh — only {sampled} of {expected} min recorded":
    "{when} · {total} kWh — solo {sampled} de {expected} min registrados",
  " — total covers only the time the recorder was running":
    " — el total cubre solo el tiempo en que el grabador estuvo en marcha",
  Live: "En vivo",
  Quality: "Calidad",
  "Latency quality score": "Puntaje de calidad de latencia",
  "Long-term latency needs the history recorder running. Start it with npm run historian and it will build up day / week history from now on.":
    "La latencia a largo plazo necesita el grabador de historial en marcha. Inicialo con npm run historian y va a armar el historial por día y semana desde ahora.",
  "Packet loss": "Pérdida de paquetes",
  "p95 latency": "latencia p95",
  " — figures cover only the time the recorder was running":
    " — las cifras cubren solo el tiempo en que el grabador estuvo en marcha",
  "{when} · service was down": "{when} · el servicio estaba caído",
  "{when} · no data — the recorder wasn't running":
    "{when} · sin datos — el grabador no estaba en marcha",
  "{when} · {detail}": "{when} · {detail}",
  "{when} · {detail} — only {sampled} of {expected} min recorded":
    "{when} · {detail} — solo {sampled} de {expected} min registrados",
  "Latency quality summarizes the period as a single 0–100 score with a letter grade, weighing typical latency, jitter, worst-case spikes, and packet loss together rather than just the average. A connection that's mostly fast but occasionally stutters scores lower than one that's a little slower but steady, since that unevenness is what you'd actually notice in a game, a call, or a video stream.":
    "La calidad de latencia resume el período en un puntaje de 0 a 100 con una letra, y pesa la latencia típica, la variación, los picos peores y la pérdida de paquetes, no solo el promedio. Una conexión casi siempre rápida pero que a veces se traba puntúa menos que una un poco más lenta y pareja, porque esa irregularidad es lo que se nota en un juego, una llamada o un video.",
  Average: "Promedio",
  "over the selected window": "en la ventana elegida",
  "nothing recorded in this window": "no se registró nada en esta ventana",
  "recorded {span} of this window": "se registraron {span} de esta ventana",
  "recorded {percent}% of this window": "se registró el {percent}% de esta ventana",
  "energy used {note}": "energía usada {note}",
  "What is {subject}?": "¿Qué es {subject}?",
  "Download throughput is the rate data arrives from the internet to your dish, in bits per second. It spikes while you're actively pulling data and idles near zero when nothing is downloading.":
    "La velocidad de descarga es el ritmo al que llegan los datos de internet a tu antena, en bits por segundo. Sube cuando estás bajando algo y queda cerca de cero cuando no se descarga nada.",
  "Upload throughput is the rate data leaves your dish for the internet. It's typically much lower than download and rises when you send large files, back up data, or make video calls.":
    "La velocidad de subida es el ritmo al que salen los datos de tu antena hacia internet. Suele ser bastante menor que la descarga y sube cuando mandás archivos grandes, hacés copias o videollamadas.",
  "The Starlink dish and router both send test pings to the internet many times per minute. Latency measures how long, in milliseconds, a request takes to go to the internet and back. High latency may impact your experience with online gaming, video calls, and web browsing. It may be caused by extreme weather or periods of high network usage.":
    "La antena y el router de Starlink mandan pings de prueba a internet muchas veces por minuto. La latencia mide cuánto tarda, en milisegundos, un pedido en ir a internet y volver. Una latencia alta puede afectar juegos en línea, videollamadas y la navegación. Puede deberse a clima extremo o a momentos de mucho uso de la red.",
  "Starlink and the Starlink router both send test pings to the internet many times per minute. It is normal for a few pings to drop without your connection noticeably suffering. Sustained dips are what matter, and they line up with the outages marked on the chart.":
    "Starlink y el router mandan pings de prueba a internet muchas veces por minuto. Es normal que se pierdan algunos sin que la conexión se note mal. Lo que importa son las caídas sostenidas, y coinciden con los cortes marcados en el gráfico.",
  "the router's own pings to its point of presence, over a rolling five minutes":
    "los pings del propio router a su punto de presencia, en una ventana móvil de cinco minutos",
  "nothing recorded in this window — the router wasn't answering, or nothing was running to record it":
    "no se registró nada en esta ventana — el router no respondía, o no había nada en marcha para grabarlo",
  "Power draw is how much electricity the Starlink terminal is using. It rises under heavy load and when the dish heats itself to melt snow or ice.":
    "El consumo eléctrico es cuánta electricidad está usando el terminal Starlink. Sube con mucha carga y cuando la antena se calienta para derretir nieve o hielo.",

  // Alignment empty
  "Couldn't reach the Starlink dish — alignment needs a live reading. This updates on its own once the dish is back online.":
    "No se pudo llegar a la antena de Starlink — la alineación necesita una lectura en vivo. Se actualiza sola cuando la antena vuelva.",

  // Account
  "Couldn't reach your Starlink account.": "No se pudo llegar a tu cuenta de Starlink.",
  "Loading your Starlink account…": "Cargando tu cuenta de Starlink…",
  Disconnect: "Desconectar",
  Inactive: "Inactivos",
  "Starlink ID": "ID de Starlink",
  "Serial number": "Número de serie",
  "Kit number": "Número de kit",
  "Software version": "Versión de software",
  "Last updated": "Última actualización",
  "Time obstructed": "Tiempo obstruido",
  "Last connected": "Última conexión",
  "Router ID": "ID del router",
  "Hardware version": "Versión de hardware",
  Clients: "Clientes",
  Bypassed: "En bypass",
  "Starlink Router 3": "Router Starlink 3",
  "Starlink Router (Gen 2)": "Router Starlink (Gen 2)",
  "Starlink Router (Gen 1)": "Router Starlink (Gen 1)",
  "Starlink Router ({hw})": "Router Starlink ({hw})",
  "Mesh ({count} hop)": "Mesh ({count} salto)",
  "Mesh ({count} hops)": "Mesh ({count} saltos)",
  offline: "sin conexión",
  inactive: "inactivo",

  // Device facts and pause
  active: "activo",
  "idle · {span}": "inactivo · {span}",
  "Connected to": "Conectado a",
  Manufacturer: "Fabricante",
  "Signal-to-noise": "Señal a ruido",
  Bandwidth: "Ancho de banda",
  "MCS index": "Índice MCS",
  "Spatial streams": "Flujos espaciales",
  "Tx rate": "Tasa de transmisión",
  "Connected for": "Conectado desde hace",
  "Data used this month": "Datos usados este mes",
  "Data used (this connection)": "Datos usados (esta conexión)",
  "Paused · limit": "Pausado · límite",
  Pausing: "Pausando",
  Unpausing: "Reanudando",
  Unpause: "Reanudar",
  Pause: "Pausar",
  "Pause “{name}”?": "¿Pausar «{name}»?",
  "This will pause internet access for this device. It stays connected to your network, and you can unpause it at any time.":
    "Esto pausa el acceso a internet de este dispositivo. Sigue conectado a tu red, y podés reanudarlo cuando quieras.",
  "The router has not applied this yet. Give it a moment, then try again.":
    "El router todavía no aplicó esto. Dale un momento y probá de nuevo.",
  "Starlink rejected the device update: {detail}":
    "Starlink rechazó la actualización del dispositivo: {detail}",
  "Starlink rejected the config change: {detail}":
    "Starlink rechazó el cambio de configuración: {detail}",
  "Starlink couldn't apply the change: {detail}": "Starlink no pudo aplicar el cambio: {detail}",
  "Starlink did not answer in time.": "Starlink no respondió a tiempo.",
  "Starlink did not answer the device update in time. Try again.":
    "Starlink no respondió a tiempo la actualización del dispositivo. Probá de nuevo.",
  "Starlink did not answer the config change in time. Try again.":
    "Starlink no respondió a tiempo el cambio de configuración. Probá de nuevo.",
  "Starlink did not answer the router change in time. Try again.":
    "Starlink no respondió a tiempo el cambio del router. Probá de nuevo.",
  "This is the device you are using, so it cannot be paused from here.":
    "Este es el dispositivo que estás usando, así que no se puede pausar desde acá.",
  "An authorized account is required.": "Hace falta una cuenta autorizada.",
  "An authorized account is required — sign in to use this feature.":
    "Hace falta una cuenta autorizada — iniciá sesión para usar esta función.",
  "An authorized account is required —": "Hace falta una cuenta autorizada —",
  "to use this feature.": "para usar esta función.",
  "Starlink can't reach your router right now, so it couldn't pass the change on. This clears on its own, usually within 4 to 5 minutes. Try again then.":
    "Starlink no llega a tu router ahora, así que no pudo pasar el cambio. Se resuelve solo, en general en 4 o 5 minutos. Probá de nuevo entonces.",
  "Couldn't connect (HTTP {status}).": "No se pudo conectar (HTTP {status}).",
  "Couldn’t connect.": "No se pudo conectar.",

  // Rules
  "Manage data limits, schedules and timers, across the devices on your network.":
    "Administrá límites de datos, horarios y temporizadores en los dispositivos de tu red.",
  "New rule": "Nueva regla",
  "Actions for {name}": "Acciones para {name}",
  "Edit rule": "Editar regla",
  "Start cycle over": "Empezar el ciclo de nuevo",
  "Restart timer": "Reiniciar el temporizador",
  "Remove rule": "Quitar regla",
  "Group devices and set their limits": "Agrupá dispositivos y definí sus límites",
  "No rules yet. A rule can cap data, run a timer, or schedule when its devices are online.":
    "Todavía no hay reglas. Una regla puede limitar datos, correr un temporizador o programar cuándo están en línea sus dispositivos.",
  "The recorder isn’t answering, so rules can’t be read or changed.":
    "El grabador no responde, así que no se pueden leer ni cambiar las reglas.",
  Limit: "Límite",
  "Pauses once a set amount of data is used, and frees up when the cycle turns over.":
    "Pausa cuando se usa una cantidad de datos, y se libera cuando termina el ciclo.",
  "Pauses outside the hours you set, on chosen weekdays or dates.":
    "Pausa fuera de las horas que definís, en los días o fechas elegidos.",
  Timer: "Temporizador",
  "Pauses once a countdown runs out, starting from when you save.":
    "Pausa cuando se acaba una cuenta regresiva, contada desde que guardás.",
  "Starlink billing (needs your account)": "Facturación de Starlink (hace falta tu cuenta)",
  "Starlink billing ({day})": "Facturación de Starlink ({day})",
  "Paused, outside its schedule": "Pausada, fuera de su horario",
  "Paused, time is up": "Pausada, se acabó el tiempo",
  "Paused, limit reached": "Pausada, llegó al límite",
  "{count} device · {bytes} in total": "{count} dispositivo · {bytes} en total",
  "{count} devices · {bytes} in total": "{count} dispositivos · {bytes} en total",
  "of {cap}": "de {cap}",
  "Limit: {cap}": "Límite: {cap}",
  "No cap": "Sin tope",
  "Active · {paused} of {total} paused": "Activa · {paused} de {total} en pausa",
  "Not scheduled today": "Hoy no está programada",
  "Resumes in {when}": "Se reanuda en {when}",
  "Opens in {when}": "Se abre en {when}",
  "Closes in {when}": "Se cierra en {when}",
  "{percent}% used": "{percent}% usado",
  "Resets in {when}": "Se reinicia en {when}",
  Online: "En línea",
  Offline: "Sin conexión",
  "Online during these times, paused the rest of the days.":
    "En línea en estos horarios, en pausa el resto del día.",
  "Paused during these times, online otherwise.":
    "En pausa en estos horarios, en línea el resto del tiempo.",
  "Every week": "Cada semana",
  "Date range": "Rango de fechas",
  "Pick a date": "Elegí una fecha",
  "Runs past midnight into the next day.": "Sigue después de medianoche, al día siguiente.",
  "Set a schedule": "Definir un horario",
  "Add another time": "Agregar otro horario",
  "Possible duplicate device": "Posible dispositivo duplicado",
  "{count} more to review": "{count} más para revisar",
  "This device appears twice, both named {name}. This happens when a device changes its Wi-Fi address and your router treats it as new.":
    "Este dispositivo aparece dos veces, los dos con el nombre {name}. Pasa cuando un dispositivo cambia su dirección de Wi-Fi y el router lo trata como nuevo.",
  "Combining keeps one device with {bytes} this month, and joins their usage history.":
    "Al unirlos queda un dispositivo con {bytes} este mes, y se junta su historial de consumo.",
  "These cover different months, so their usage history is joined but the monthly figures stay as they are.":
    "Cubren meses distintos, así que se junta el historial de consumo pero las cifras mensuales quedan como están.",
  "Same device": "Es el mismo",
  "Different devices": "Son distintos",
  "last seen {when}": "visto {when}",

  // Prompts and account connect
  "A rating takes ten seconds, but it's the one thing that helps other Starlink owners find the app.":
    "Una valoración lleva diez segundos, y es lo que ayuda a que otros dueños de Starlink encuentren la app.",
  "Rate on {store}": "Valorar en {store}",
  "I built it in my free time, because nothing like it existed. Your one-off or recurring contribution does a lot to keep it maintained and updated. Please show the project some support if you can!":
    "Lo armé en mi tiempo libre, porque no existía nada parecido. Un aporte único o recurrente ayuda mucho a mantenerlo y actualizarlo. Si podés, dale una mano al proyecto.",
  "Maybe later": "Más tarde",
  "Don't ask again": "No volver a preguntar",
  "See your plan, data usage, service address, and every dish and router on the account, and enable supported router controls such as pausing connected devices. Your session stays encrypted on this device and is only ever sent to Starlink.":
    "Vas a ver tu plan, el consumo, la dirección de servicio y cada antena y router de la cuenta, y vas a poder usar los controles del router que están disponibles, como pausar dispositivos. La sesión queda cifrada en este dispositivo y solo se envía a Starlink.",
  "Sign in with Starlink": "Iniciar sesión con Starlink",
  "A Starlink login window opens — nothing is shared with anyone but Starlink.":
    "Se abre la ventana de inicio de sesión de Starlink — no se comparte nada con nadie más que Starlink.",
  "Sign-in didn’t complete.": "El inicio de sesión no se completó.",
  "Sign-in failed.": "Falló el inicio de sesión.",
  "Sign-in was cancelled.": "Se canceló el inicio de sesión.",
  "Cloud not started.": "La nube no arrancó.",
  "In a new tab, sign in at": "En una pestaña nueva, iniciá sesión en",
  "Open DevTools ({keys}) and switch to the":
    "Abrí las herramientas de desarrollo ({keys}) y pasá a la pestaña",
  "Open DevTools (F12 / ⌥⌘I) and switch to the Network tab.":
    "Abrí las herramientas de desarrollo (F12 / ⌥⌘I) y pasá a la pestaña Network.",
  "Under Request Headers, find cookie: and copy its entire value.":
    "En Request Headers, buscá cookie: y copiá el valor completo.",
  "Reload the page, then click any request to starlink.com in the list.":
    "Recargá la página y hacé clic en cualquier pedido a starlink.com de la lista.",
  Under: "En",
  ", find": ", buscá",
  "and copy its": "y copiá su valor",
  entire: "completo",
  "Paste it below and Connect. (Don't use the console's document.cookie — it drops the part we need.)":
    "Pegalo abajo y tocá Conectar. (No uses document.cookie de la consola — se pierde la parte que hace falta.)",
  "Adds account details and supported router controls. The session is written to a local .starlink-cookie file on this machine and only ever sent to Starlink.":
    "Agrega los datos de la cuenta y los controles del router que están disponibles. La sesión se guarda en un archivo local .starlink-cookie de esta computadora y solo se envía a Starlink.",
  "⌘↵ to submit": "⌘↵ para enviar",

  // Settings leftovers
  "Not known": "No se conoce",
  "Your current WiFi password": "Tu contraseña de WiFi actual",
  "WiFi password": "Contraseña de WiFi",
  DNS: "DNS",
  "Connecting…": "Conectando…",
  "Connect through Cloud": "Conectar por la nube",
  "Your devices, read from your Starlink account until the router answers again.":
    "Tus dispositivos, leídos de tu cuenta de Starlink hasta que el router vuelva a responder.",

  // Recovery
  "The dashboard hit a display error and couldn’t recover on its own.":
    "El panel tuvo un error de visualización y no pudo recuperarse solo.",
  Reload: "Recargar",
};
