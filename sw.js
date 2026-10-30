/* Sube el número de V (y SWV en index.html, el mismo) cuando publiques una versión nueva.
   La app carga siempre rápido desde la copia guardada; la versión nueva se descarga sola al haber internet
   y se aplica cuando la persona pulsa Aceptar en la casilla de notificaciones pendientes. */
const V='cartera-v16',F=["./", "index.html", "manifest.webmanifest", "favicon.ico", "icon-32.png", "icon-48.png", "icon-192.png", "icon-512.png", "icon-maskable-192.png", "icon-maskable-512.png", "apple-touch-icon.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>null)))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{const d=e.data||{};if(d.t==='skip')self.skipWaiting();if(d.t==='ver'&&e.source)e.source.postMessage({t:'ver',v:V})});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin||u.pathname.endsWith('estado.json'))return;
  e.respondWith(caches.open(V).then(c=>c.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res&&res.status===200)c.put(r,res.clone());return res}).catch(()=>r.mode==='navigate'?c.match('./'):Response.error()))))});
