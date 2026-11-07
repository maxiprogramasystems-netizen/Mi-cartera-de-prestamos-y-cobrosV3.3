# Préstamos y Cobros

Aplicación web para controlar una cartera de préstamos: clientes, intereses, cuotas, pagos, capital disponible y recordatorios. Funciona sin servidor: todo se guarda en el navegador del dispositivo.

## Funciones

- Clientes con notas y observaciones, búsqueda y edición. Al guardar un cliente nuevo la app ofrece crear su préstamo, y cada cliente tiene el atajo «Crear préstamo».
- Cada préstamo es independiente: se elige el cliente de forma explícita (sin cliente preseleccionado por defecto), lleva su propio código (P-001, P-002…), sus cuotas y sus pagos, y se confirma antes de crearlo.
- Préstamos con interés simple o sobre saldo, mora, observaciones y filtros por estado.
- La lista de Préstamos muestra por defecto solo los vigentes (activos y en mora). Los finalizados salen de esa lista pero siguen guardados: se ven en el filtro «Finalizados» (un renglón por cliente, con los códigos de sus préstamos) o en «Todos». Al buscar por nombre o código también aparecen.
- Cuotas en verde cuando se pagan, estado "Abonó" en pagos parciales y "Finalizado" al saldar la deuda.
- Capital: aportes, retiros, dinero disponible para prestar, capital en la calle y ganancias.
- Aviso un día antes del cobro (notificación del navegador) y botón de WhatsApp para avisar al cliente, con mensaje opcional por préstamo.
- Al crear un préstamo aparece su aprobación: valor aprobado, número de cuotas y todas las fechas de pago, como imagen para compartir (también desde «Ver aprobación» en el préstamo).
- Pago en un toque: la próxima cuota aparece ya lista con su valor y el botón «Pagar»; también «Pagar todo el saldo». El pago manual o abono queda en «Otro valor o abono».
- «Pagar solo intereses»: si el cliente no puede pagar la cuota completa, abona solo el interés de la cuota (valor editable). No baja capital ni saldo, cuenta como ganancia, aplaza un período esa cuota y las siguientes (no queda en mora) y genera su recibo. Se deshace eliminando ese pago.
- Recibo de pago como imagen para compartir (cuotas pagadas y pendientes, saldo y próximo pago), con opción de deshacer el pago recién hecho y de imprimir el recibo clásico.
- Colores de estado: cuota pagada en verde, cuota atrasada en rojo con alerta en el Panel.
- Botón de sol/luna en la cabecera para cambiar entre tema claro y oscuro.
- Recibos imprimibles, reportes, exportar e importar respaldo (.json): al importar se elige «Fusionar» (agrega lo que falta) o «Reemplazar todo».
- Cada cuota del cronograma tiene su botón «Pagar» (si hay cuotas anteriores pendientes, se pagan también).
- «✎ Editar» por cuota (columna «Editar cuota», entre «Estado» y «Pagar»): cambia a mano el valor de una cuota pendiente o con abono si el cliente paga de menos o en otras fechas. Vacío = vuelve al original. Las cuotas pagadas no se editan.
- Reportes > «Estado de clientes»: filtros Al día, Por finalizar, Finalizados y En mora; «Recibo» envía por WhatsApp el estado de cuenta (o paz y salvo) como imagen o texto, las veces que quieras; «Nuevo crédito» abre el formulario con el cliente elegido. «🎁 Ofrecer crédito» abre un mensaje cordial editable (con valor disponible opcional) para enviar por WhatsApp como texto o imagen; la app anota la fecha y las veces que se envió. El Panel avisa de los clientes por terminar (faltan N cuotas, ajustable en Reportes) o finalizados en los últimos 30 días para ofrecerles un nuevo crédito.
- Copias internas: una automática al día (las últimas 5) más una antes de importar, restaurar, borrar o actualizar; se restauran desde Ajustes o Reportes.
- Huella / Face ID con «Mantener la huella siempre activa» y «Reasignar huella» (Ajustes). Requiere abrir la app desde https.
- Aviso de actualización con la casilla «Notificaciones pendientes por aplicar» y botones Aceptar / Soporte.
- Interruptor remoto `estado.json` (ver abajo).
- Contraseña con código de recuperación de 4 a 6 dígitos.
- Temas claro, oscuro o automático, con varios colores y fondos.

## Cómo usarla

1. Abre `index.html` en el navegador, o publícala con GitHub Pages: Settings > Pages > Deploy from a branch > `main` / `root`.
2. Desde el móvil puedes instalarla con "Agregar a pantalla de inicio".

## Estructura

**Todos los archivos van sueltos en la raíz del repositorio, sin carpetas.** Es importante que `index.html`, `manifest.webmanifest`, `sw.js`, `favicon.ico` y todos los `icon-*.png` estén juntos; si falta alguno, el navegador no deja instalar la app.

```
index.html              La app completa (HTML, CSS y JS)
manifest.webmanifest    Datos para instalarla como app
sw.js                   Funcionamiento sin conexión y actualizaciones con aviso
favicon.ico             Icono de la pestaña
estado.json             Interruptor remoto (activa: true / false)
icon-*.png              Icono de la app (32 a 2048 px, PNG transparente), maskable y apple-touch
screenshot-*.png        Capturas para el diálogo de instalación
```

## Actualizaciones futuras

- Los datos se guardan con una versión de esquema (`VER`) y una función `migrate()` que completa lo que falte. Para agregar campos nuevos, añade una migración en `MIG` y sube `VER`; los datos de los usuarios no se pierden.
- La clave de almacenamiento (`prestamos_v1`) no cambia entre versiones.
- Al publicar una versión nueva, cambia el valor de `V` en `sw.js` (y `APPV` en `index.html`). Cuando el cliente abre la app con internet, la versión nueva se descarga sola y aparece el aviso «Hay una mejora lista»; se aplica al tocar «Actualizar». Hasta entonces sigue funcionando la versión anterior. También hay un botón «Buscar actualización» en Ajustes.
- Las novedades de cada versión se escriben en `NEWS` (index.html) y se muestran una sola vez.
- Haz siempre un respaldo desde Reportes antes de reemplazar archivos.

## Historial

- 3.6: corrige que los préstamos nuevos quedaran asignados al primer cliente de la lista (el selector del formulario lo preseleccionaba). Se añade código por préstamo y migración de datos (`VER` 4); los datos existentes se conservan.

- 3.7: aprobación del préstamo con cuotas y fechas de pago; pago en un toque; recibos y aprobación como imagen para compartir; actualizaciones con aviso de aceptación; la fecha de «hoy» ahora usa la hora local (antes usaba UTC); plural correcto de la frecuencia («mensuales»). No cambia el esquema de datos (`VER` 4): los datos existentes se conservan.

- 3.8: se reponen las mejoras que se perdieron con la actualización: botón «Pagar» por cuota (con columna Mora), copias internas y restauración, importar con fusión, huella / Face ID, interruptor remoto `estado.json` y casilla «Notificaciones pendientes por aplicar» con Aceptar / Soporte. No cambia el esquema de datos (`VER` 4).

- 3.14: Reportes > «Estado de clientes» (Al día / Por finalizar / Finalizados / En mora), recibo de estado de cuenta y paz y salvo por WhatsApp, atajo «Nuevo crédito», aviso en el Panel de clientes para ofrecer nuevo crédito y tarjeta «Clientes al día». Los estados se calculan con los datos existentes; solo se guarda el ajuste `cfg.finN` (cuotas para «por finalizar»). No cambia el esquema de datos (`VER` 4).

- 3.15: botón «🎁 Ofrecer crédito» en Panel y Reportes para clientes finalizados, por finalizar o al día: mensaje cordial editable, valor disponible opcional (sugiere el último préstamo), imagen «Crédito disponible» para compartir y registro de la última oferta enviada (`oferta`, `nOf` en el cliente, campos opcionales). No cambia el esquema de datos (`VER` 4): los datos existentes se conservan.

- 3.16: botón «Pagar solo intereses» (pago con `tipo:'int'`, campo opcional): aplaza la cuota pendiente y las siguientes un período por cada pago, sin tocar capital ni saldo; suma a ganancias y capital recibido; recibo «Abono a intereses · cuota aplazada al…»; aviso desde 3 aplazamientos; no cobra la mora ya generada. No cambia el esquema de datos (`VER` 4): los datos y copias existentes se conservan.

- 3.17: la aprobación del préstamo (imagen y mensaje de WhatsApp) ya no muestra el interés ni el «Total a pagar»; el cliente solo ve valor aprobado, cuotas, valor de cada cuota y fechas de pago. **No volver a agregar esas filas en `approval()`.** El resumen interno del préstamo no cambia. No cambia el esquema de datos (`VER` 4).

- 3.20: «Editar cuota»: botón ✎ por cuota para cambiar su valor a mano (se marca con ✎ y muestra el original al pasar el cursor). El valor nuevo se usa en saldo, «Pagar», recibos y avisos de WhatsApp. Se guarda en el préstamo como dato opcional `ov` ({nº de cuota: valor}); capital e interés de esa cuota se ajustan en proporción. En celular se oculta la columna «Pagado» y el abono se muestra bajo «Abonó». No cambia el esquema de datos (`VER` 4): los préstamos existentes no cambian. Incluye todo lo de la 3.17.

- 3.21: la lista de Préstamos oculta por defecto los finalizados (filtro «Vigentes»), para que un cliente con varias renovaciones no aparezca repetido. El filtro «Finalizados» agrupa por cliente y «Todos» muestra todo. Solo cambia lo que se ve: no se borra ni modifica ningún dato, la lista de clientes queda igual y `sched()`, pagos, capital, reportes y recibos no se tocan. No cambia el esquema de datos (`VER` 4). Incluye todo lo de la 3.20.

## Interruptor remoto (estado.json)

`estado.json` va en la raíz junto a `index.html`. Para bloquear la app: `{"activa": false, "mensaje": "Texto que verá el usuario"}`. Para reactivarla: `{"activa": true}`. Se consulta al abrir, al volver a la app y cada 5 minutos. Si el archivo no existe o no se puede leer, la app sigue funcionando. Aun bloqueada, el usuario puede exportar su respaldo. `sw.js` nunca guarda este archivo en caché.

## Notas

- La contraseña protege el acceso en el dispositivo; no cifra los datos ni los respaldos.
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
