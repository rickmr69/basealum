const CACHE = "basealum";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
    "lib/Op.js",
    "lib/polycustom.js",
    "lib/registraServiceWorker.js",
    "lib/util.js",
    "estilos.css",
    "favicon.ico",
    "icono.png",
    "index.html",
    "alumno.html",
    "alumnoNuevo.html",
    "manifest.json",
    "mi-footer.js",
    "__/firebase/8.0.1/firebase-auth.js",
    "__/firebase/8.0.1/firebase-app.js",
    "__/firebase/8.0.1/firebase-firestore.js",
    "__/firebase/init.js",
    '/'
];
self.addEventListener("install",
    /** @param {InstallEvent} evt */
    evt => {
        console.log("Service Worker instalado.");
        // Realiza la instalación: carga los archivos requeridos en la caché.
        evt.waitUntil(cargaCache());
    });
// Toma de la caché archivos solicitados. Los otros son descargados.
self.addEventListener("fetch",
    /** @param {FetchEvent} evt */
    evt => {
        if (evt.request.method === "GET") {
            evt.respondWith(cargaRequest(evt));
        }
    });
self.addEventListener("activate", () => console.log("Service Worker activo."));
async function cargaCache() {
    console.log("Intentando cargar cache: " + CACHE);
    const cache = await caches.open(CACHE);
    await cache.addAll(ARCHIVOS);
    console.log("Cache cargado: " + CACHE);
}
/**
* @param {FetchEvent} evt
* @returns {Promise<Response>} */
async function cargaRequest(evt) {
    const cache = await caches.open(CACHE);
    const respCache = await cache.match(evt.request, { ignoreSearch: true });
    return respCache ? respCache : fetch(evt.request);
}