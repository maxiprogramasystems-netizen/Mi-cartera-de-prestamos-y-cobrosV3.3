/* Sube el número de V (y SWV en index.html) cuando publiques una versión nueva: las personas la reciben solas al conectarse a internet */
const V='cartera-v15',F=["./", "index.html", "manifest.webmanifest", "favicon.ico", "icon-32.png", "icon-48.png", "icon-192.png", "icon-512.png", "icon-maskable-192.png", "icon-maskable-512.png", "apple-touch-icon.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>null)))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* La app avisa a la persona y, cuando acepta, pide aplicar la versión nueva */
self.addEventListener('message',e=>{const d=e.data||{};if(d.t==='skip')self.skipWaiting();if(d.t==='ver'&&e.source)e.source.postMessage({t:'ver',v:V})});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).pathname.endsWith('estado.json'))return;e.respondWith(fetch(e.request).then(r=>{if(r&&r.status===200){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
