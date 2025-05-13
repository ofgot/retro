const CACHE_NAME = 'retro-games-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/tetris.html',

    '/stylesheet/style.css',

    '/js/main.js',
    '/js/tetris/Game.js',
    '/js/tetris/Player.js',
    '/js/tetris/TetrisRenderer.js',
    '/js/tetris/Utils.js',
    '/audio/tetris_music.mp3',
    '/img/tetris.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
