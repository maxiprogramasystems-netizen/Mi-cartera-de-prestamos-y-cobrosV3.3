/* Sube el número de V cuando publiques una versión nueva.
   La app descarga la versión nueva sola cuando hay internet y avisa al cliente para que la acepte con un toque. */
const V='cartera-v15';
const REQ=["./","index.html"];
const OPT=["manifest.webmanifest","favicon.ico","icon-32.png","icon-48.png","icon-192.png","icon-512.png","icon-maskable-192.png","icon-maskable-512.png","apple-touch-icon.png"];
const get=u=>fetch(new Request(u,{cache:'reload'}));
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{
  await Promise.all(REQ.map(async u=>{const r=await get(u);if(!r.ok)throw new Error('No se pudo descargar '+u);await c.put(u,r)}));
  await Promise.all(OPT.map(u=>get(u).then(r=>r.ok?c.put(u,r):null).catch(()=>null)))}))});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||new URL(q.url).origin!==location.origin)return;
  e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(q,{ignoreSearch:true});if(hit)return hit;
    try{const r=await fetch(q);if(r&&r.status===200)c.put(q,r.clone());return r}
    catch(err){if(q.mode==='navigate'){const i=await c.match('index.html');if(i)return i}throw err}}))});
