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
- Botón **Pagar** en cada cuota por pagar (detalle del préstamo): registra el pago con un toque, con fecha de hoy, tras una confirmación. Paga lo que falta de esa cuota y, si hay anteriores pendientes, también las incluye (los pagos se aplican en orden). Muestra «Pago registrado» con enlace al recibo. El formulario «Registrar pago o abono» sigue disponible para abonos parciales. En el celular la columna de acciones queda fija para que Pagar siempre se vea.
- Los mensajes de WhatsApp a los clientes (recordatorio de mañana, pago vencido, cuota individual y recibo) llevan al final el resumen «Cuotas pagadas: X de N» y «Cuotas pendientes por pagar: Y». El texto original de cada mensaje no cambia; el resumen se añade debajo. El recibo en pantalla también muestra esa fila.
- Actualizaciones en línea: cuando la persona tiene internet, la app descarga sola la versión nueva y muestra la casilla «Notificaciones pendientes por aplicar» con el mensaje «Por favor acepte la actualización o póngase en contacto con soporte», un botón Aceptar y, si está configurado, un botón Soporte.
- Datos protegidos: copias internas automáticas (una al día y otra antes de actualizar, importar o borrar), restauración desde Ajustes > Datos protegidos, recuperación automática si el dato guardado se daña, aviso si no se puede guardar y solicitud de almacenamiento persistente al navegador.
- Entrada con huella, rostro (Face ID) o el bloqueo del teléfono, además de la contraseña (que queda como respaldo). Requiere abrir la app desde https y tener la biometría configurada en el dispositivo; se activa en Ajustes > Huella / Face ID. La huella se guarda también dentro de los datos, y con «Mantener la huella siempre activa» (activada por defecto) la app la vuelve a registrar sola si se pierde, por ejemplo después de una actualización, de un respaldo importado o de usar otro teléfono. Si no puede hacerlo sola, lo avisa en la casilla de notificaciones pendientes. Hay un botón «Reasignar huella» para registrarla de nuevo cuando quieras.
- Bloqueo automático al volver a la app (al instante, 1, 5 o 15 minutos, o nunca), configurable en Ajustes.
- Temas claro, oscuro o automático, con varios colores y fondos.

## Cómo usarla

1. Abre `index.html` en el navegador, o publícala con GitHub Pages: Settings > Pages > Deploy from a branch > `main` / `root`.
2. Desde el móvil puedes instalarla con "Agregar a pantalla de inicio".

## Estructura

**Todos los archivos van sueltos en la raíz del repositorio, sin carpetas.** Es importante que `index.html`, `manifest.webmanifest`, `sw.js`, `favicon.ico` y todos los `icon-*.png` estén juntos; si falta alguno, el navegador no deja instalar la app.

```
index.html              La app completa (HTML, CSS y JS)
estado.json             Interruptor remoto y teléfono de soporte
manifest.webmanifest    Datos para instalarla como app
sw.js                   Funcionamiento sin conexión
favicon.ico             Icono de la pestaña
icon-*.png              Icono de la app (32 a 2048 px, PNG transparente), maskable y apple-touch
screenshot-*.png        Capturas para el diálogo de instalación
```

## Actualizaciones futuras

- Los datos se guardan con una versión de esquema (`VER`) y una función `migrate()` que completa lo que falte. Para agregar campos nuevos, añade una migración en `MIG` y sube `VER`; los datos de los usuarios no se pierden.
- La clave de almacenamiento (`prestamos_v1`) no cambia entre versiones.
- Al publicar una versión nueva, cambia el valor de `V` en `sw.js` y el de `SWV` en `index.html` (los dos iguales) para que los dispositivos reciban la actualización.
- Haz siempre un respaldo desde Reportes antes de reemplazar archivos.

## Actualizaciones en línea

- Al publicar una versión nueva en GitHub Pages, cada dispositivo la detecta cuando se conecta a internet (al abrir la app, al volver a ella, al recuperar la conexión y cada 30 minutos).
- La versión se descarga sola, pero no se aplica hasta que la persona pulsa **Aceptar** en la casilla de pendientes. Mientras no acepte, la app sigue funcionando con la versión que ya tiene (incluso sin internet). Al aceptar, la app guarda antes una copia interna de los datos y se recarga, y al abrir la versión nueva muestra «Aplicación actualizada. Tus datos y tu huella se conservaron».
- **Para publicar una versión nueva** cambia el mismo número en dos sitios: `V` en `sw.js` y `SWV` en `index.html` (por ejemplo `cartera-v16` en ambos). Si solo cambias uno, la persona verá la casilla aunque ya tenga la versión nueva.
- Botón de soporte: escribe el teléfono (con indicativo, solo números) en `"soporte"` dentro de `estado.json`. Si lo dejas vacío, la casilla no muestra el botón.

## Reglas de originalidad (para toda mejora futura)

1. Solo se añaden cosas: no se quitan ni se cambian funciones, textos ni el aspecto que ya existen. Los mensajes existentes conservan su redacción y las mejoras se agregan debajo.
2. La clave de almacenamiento `prestamos_v1` y el formato de los datos no cambian; si hace falta un campo nuevo, se añade con una migración en `MIG` y se sube `VER`.
3. Los datos nunca se pierden: cada cambio que toca datos hace antes una copia interna.
4. Antes de publicar, comprobar: crear cliente y préstamo, registrar un pago, abrir el recibo, enviar los avisos de WhatsApp, exportar e importar respaldo, bloquear y desbloquear, y desactivar y reactivar con `estado.json`.

## Interruptor remoto (habilitar / deshabilitar la cartera)

El archivo `estado.json` de la raíz del repositorio controla si la app funciona:

```json
{ "activo": true,  "mensaje": "...", "soporte": "573001234567" }   →  la cartera funciona normal
{ "activo": false, "mensaje": "Texto que verá la persona." }   →  la cartera se bloquea
```

Para deshabilitarla: abre `estado.json` en GitHub, pulsa el lápiz (Edit), cambia `true` por `false`, escribe el mensaje y pulsa Commit changes. Para volver a habilitarla, cambia a `true`. Los datos de cada dispositivo no se borran; al reactivar, todo vuelve como estaba.

- La app lo consulta al abrirse, al volver a ella, al recuperar internet y cada 5 minutos. GitHub Pages puede tardar de 1 a 10 minutos en publicar el cambio.
- Solo `"activo": false` bloquea. Si el archivo falta, está mal escrito o no hay internet, se mantiene el último estado conocido (nunca bloquea por un error).
- Es un bloqueo de software: detiene el uso normal de la app, pero no cifra ni borra los datos del teléfono.

## Historial

- 4.0: botón Pagar en cada cuota por pagar; la huella / Face ID se conserva y se reasigna sola tras actualizar (opción «Mantener la huella siempre activa» y botón «Reasignar huella»); la app abre siempre desde su copia guardada y aplica las actualizaciones cuando la persona acepta; copia interna de los datos antes de abrir cada versión nueva y mensaje de confirmación tras actualizar. Los datos y su formato no cambian (`VER` sigue en 4).
- 3.9: los mensajes a los clientes incluyen cuotas pagadas y pendientes por pagar; actualizaciones en línea con casilla de notificaciones pendientes y botón de soporte (`soporte` en `estado.json`); copias internas automáticas, restauración, recuperación de datos dañados y almacenamiento persistente. `sw.js` ya no se activa solo: espera a que la persona acepte. Los datos y su formato no cambian (`VER` sigue en 4).
- 3.8: interruptor remoto con `estado.json`. Nuevo archivo `estado.json`; `sw.js` no lo guarda en caché.
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
