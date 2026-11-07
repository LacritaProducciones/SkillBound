# Skillbound: guía rápida

## Qué hay en la carpeta
| Archivo | Para qué sirve |
|---|---|
| `index.html` | La web completa (ya con la imagen nueva de la chica rosa) |
| `firebase-messaging-sw.js` | Hace que los avisos lleguen aunque la web esté cerrada |
| `manifest.webmanifest` + iconos | Permiten "instalar" la web en el celular |
| `firestore.rules` | Reglas de seguridad de la base de datos (paso 7) |
| `functions/` | Envía el aviso a todos cuando subes algo (paso 10) |

Sube TODO a GitHub, en la misma carpeta (`functions/` incluida).

## Pasos para la base de datos (Firebase, gratis)
1. Entra a https://console.firebase.google.com y crea un proyecto.
2. **Firestore Database** → Crear base de datos (modo producción).
3. **Authentication** → Comenzar → Sign-in method → activa **Correo/contraseña**.
4. Authentication → **Users** → Add user: pon el correo y contraseña con los que tú entrarás como admin.
5. Authentication → **Settings → Authorized domains** → agrega tu dirección de GitHub Pages (`tu-usuario.github.io`). Sin esto el login no funciona.
6. Configuración del proyecto (engranaje) → **Tus apps** → crea una app web `</>` → copia el `firebaseConfig`.
   Pégalo en **dos sitios**: arriba del `<script>` de `index.html` (`FIREBASE_CONFIG`) y en `firebase-messaging-sw.js`. Escribe tu correo en `ADMIN_EMAIL`.
7. Firestore → pestaña **Reglas** → pega el contenido de `firestore.rules`, cambia `ADMIN_EMAIL_AQUI` por tu correo → Publicar.
8. Listo: lo que subas lo ve todo el mundo; solo tu cuenta puede publicar o editar.

## Pasos para los avisos de Chrome
9. Configuración del proyecto → **Cloud Messaging** → "Certificados push web" → **Generar par de claves**. Copia esa clave y pégala en `VAPID_KEY` (en `index.html`, al inicio del segundo bloque `<script>`).
10. Para que el aviso llegue con la web **cerrada**:
    - Firebase necesita el plan **Blaze** (pago por uso; para una web pequeña el uso queda dentro de la cuota gratis, pero pide tarjeta).
    - Cambia `SITE_URL` en `functions/index.js` por tu dirección de GitHub Pages.
    - En tu computador: `npm install -g firebase-tools`, luego `firebase login`, `firebase init functions` (elige tu proyecto, JavaScript, NO sobrescribas `index.js`) y `firebase deploy --only functions`.
    - Sin este paso, la campana igual funciona, pero solo avisa mientras la web esté abierta.
11. Cada visitante toca la campana 🔔 de la barra y acepta el permiso.
    - **iPhone:** primero "Compartir → Añadir a pantalla de inicio" y abrirla desde ahí (iOS 16.4 o más).
    - Necesita `https` (GitHub Pages ya lo tiene).

## Por validar (decidí yo por ti)
- La imagen nueva traía el fondo negro pintado dentro; se lo quité automáticamente. Si ves un borde raro en las piernas, súbeme el PNG con transparencia real.
- La intro animada (estrella + nombre) sale una vez por visita y se salta con un toque.
- Con "reducir movimiento" activado en el celular/PC, la web se ve completa y quieta.
- `ADMIN_PASSWORD = "seyla-2026"` solo se usa si NO configuras Firebase; cámbiala o ignórala.
- Las firmas de los enlaces y el correo de admin siguen como marcadores `PON_TU_...` hasta que los completes.
- No pude probar las notificaciones reales desde aquí: pruébalas en Chrome tras el paso 10 y cuéntame.
