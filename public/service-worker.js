/**
 * The name of the cache to use for storing static assets.
 */
const CACHE_NAME = 'retro-games-cache-v1';

/**
 * A list of URLs to cache for offline use.
 */
const urlsToCache = [
    'index.html',
    'tetris.html',
    'stylesheet/style.css',
    'js/index.js',
    'js/tetris2/Arena.js',
    'js/tetris2/Game.js',
    'js/tetris2/Main.js',
    'js/tetris2/Pieces.js',
    'js/tetris2/Player.js',
    'js/tetris2/TetrisRenderer.js',
    'js/tetris2/Utils.js',
    'js/common/Renderer.js',
    'audio/tetris_music.mp3',
    'img/tetris.png',
    'img/snake.png',
    'img/qbasic.png',
    'img/pacman.png',
];

/**
 * Install event handler: opens cache and adds all specified URLs.
 */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return Promise.all(
                urlsToCache.map(url => {
                    return cache.add(url).catch(err => {
                        // console.error(`❌ Failed to cache ${url}`, err);
                    });
                })
            );
        })
    );
});

/**
 * Fetch event handler: serves files from cache, falls back to network,
 * and displays cached index.html if offline and document was requested.
 */
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }

            return fetch(event.request).catch(() => {
                if (event.request.destination === 'document') {
                    return caches.match('index.html');
                }
            });
        })
    );
});

