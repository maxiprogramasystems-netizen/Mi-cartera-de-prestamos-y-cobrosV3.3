# Préstamos y Cobros

Aplicación web para controlar una cartera de préstamos: clientes, intereses, cuotas, pagos, capital disponible y recordatorios. Funciona sin servidor: todo se guarda en el navegador del dispositivo.

## Funciones

- Clientes con notas y observaciones, búsqueda y edición. Al guardar un cliente nuevo la app ofrece crear su préstamo, y cada cliente tiene el atajo «Crear préstamo».
- Cada préstamo es independiente: se elige el cliente de forma explícita (sin cliente preseleccionado por defecto), lleva su propio código (P-001, P-002…), sus cuotas y sus pagos, y se confirma antes de crearlo.
- Préstamos con interés simple o sobre saldo, mora, observaciones y filtros por estado.
- Cuotas en verde cuando se pagan, estado "Abonó" en pagos parciales y "Finalizado" al saldar la deuda.
- Capital: aportes, retiros, dinero disponible para prestar, capital en la calle y ganancias.
- Aviso un día antes del cobro (notificación del navegador) y botón de WhatsApp para avisar al cliente, con mensaje opcional por préstamo.
- Colores de estado: cuota pagada en verde, cuota atrasada en rojo con alerta en el Panel.
- Botón de sol/luna en la cabecera para cambiar entre tema claro y oscuro.
- Recibos imprimibles, reportes, exportar e importar respaldo (.json).
- Contraseña con código de recuperación de 4 a 6 dígitos.
- Entrada con huella, rostro (Face ID) o el bloqueo del teléfono, además de la contraseña (que queda como respaldo). Requiere abrir la app desde https y tener la biometría configurada en el dispositivo; se activa en Ajustes > Huella / Face ID.
- Bloqueo automático al volver a la app (al instante, 1, 5 o 15 minutos, o nunca), configurable en Ajustes.
- Temas claro, oscuro o automático, con varios colores y fondos.

## Cómo usarla

1. Abre `index.html` en el navegador, o publícala con GitHub Pages: Settings > Pages > Deploy from a branch > `main` / `root`.
2. Desde el móvil puedes instalarla con "Agregar a pantalla de inicio".

## Estructura

**Todos los archivos van sueltos en la raíz del repositorio, sin carpetas.** Es importante que `index.html`, `manifest.webmanifest`, `sw.js`, `favicon.ico` y todos los `icon-*.png` estén juntos; si falta alguno, el navegador no deja instalar la app.

```
index.html              La app completa (HTML, CSS y JS)
manifest.webmanifest    Datos para instalarla como app
sw.js                   Funcionamiento sin conexión
favicon.ico             Icono de la pestaña
icon-*.png              Icono de la app (32 a 2048 px, PNG transparente), maskable y apple-touch
screenshot-*.png        Capturas para el diálogo de instalación
```

## Actualizaciones futuras

- Los datos se guardan con una versión de esquema (`VER`) y una función `migrate()` que completa lo que falte. Para agregar campos nuevos, añade una migración en `MIG` y sube `VER`; los datos de los usuarios no se pierden.
- La clave de almacenamiento (`prestamos_v1`) no cambia entre versiones.
- Al publicar una versión nueva, cambia el valor de `V` en `sw.js` para refrescar la caché.
- Haz siempre un respaldo desde Reportes antes de reemplazar archivos.

## Historial

- 3.7: apertura con huella / Face ID (WebAuthn, verificada en el dispositivo) y bloqueo automático al volver a la app. No cambia el formato de los datos (`VER` sigue en 4); los ajustes de biometría se guardan aparte (`prestamos_bio`, `prestamos_lm`) y no entran en los respaldos.
- 3.6: corrige que los préstamos nuevos quedaran asignados al primer cliente de la lista (el selector del formulario lo preseleccionaba). Se añade código por préstamo y migración de datos (`VER` 4); los datos existentes se conservan.

## Notas

- La contraseña y la huella / Face ID protegen el acceso a la app en el dispositivo; no cifran los datos ni los respaldos. La huella no se guarda en la app: la verifica el sistema del teléfono.
- Los avisos de cobro se muestran mientras la app está abierta o instalada; no hay servidor que envíe mensajes con la app cerrada.
- Verifica que la tasa de interés no supere el límite legal (usura) vigente en tu país.

## Instalar como app (computador, Android, iPhone)

La instalación solo funciona abriendo la dirección https publicada en GitHub Pages; si abres `index.html` desde el disco no se puede instalar. Los navegadores no permiten instalar sin que la persona toque un botón, por eso la app muestra un aviso "Instalar" con un toque.

- Computador (Chrome o Edge): botón "Instalar" del aviso, icono de instalar en la barra de direcciones, o menú > Instalar "Préstamos y Cobros".
- Android: botón "Instalar" del aviso, o menú > Instalar app.
- iPhone: Compartir > Agregar a pantalla de inicio.
- En Ajustes > "Diagnóstico de instalación" ves qué falta si no deja instalar.
- Si ya la tenías instalada con otro icono, desinstálala y vuelve a instalarla.

Icono maestro: `icon-2048.png` (PNG transparente). Para cambiar el logo, reemplaza los `icon-*.png`, el icono incrustado en `index.html` (constante `IC`) y sube el número `v` en `sw.js`, `manifest.webmanifest` e `index.html`.
