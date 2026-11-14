const CACHE = "newro-v8-hackathon-haptics-2026-11-15";
const ASSETS = ["./", "./index.html", "./assets/newro-experience.css", "./assets/newro-experience.js", "./assets/newro-swarm.js", "./assets/newro-course.css", "./assets/newro-course.js", "./assets/newro-flow.css", "./assets/newro-flow.js", "./assets/newro-mobile.js", "./assets/newro-polish.css", "./assets/illustrations/marketing-illustration.svg", "./assets/illustrations/product-illustration.svg", "./assets/illustrations/mentor-illustration.svg", "./manifest.webmanifest", "./icon.svg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; }).catch(() => caches.match("./index.html")));
    return;
  }
  event.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req)));
});