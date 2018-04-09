importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "img/amp_logo_white.svg",
    "revision": "ff1c832025faf6ebb36c3385ee1434c5"
  },
  {
    "url": "offline.html",
    "revision": "787f63330fc0305c02ddce38f048bc07"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "931389ae9534e0116433ba245d7ccbd2"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "fcbfa0e31cbe00db1e7e333b0b4085a9"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "15c7666e3262c9a01198cc97e3dfeee2"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "15bbfa9c5eda938db344c081acc21160"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "435fa69761cfca1bdb521ee34e0b8dd7"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "85456ca00d684bfe60a52c57b3416b8b"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "3fe1e591c8f138f676c0b4d3f9eb58de"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "3c0ded96a9d6cde35894280216bfb5d9"
  },
  {
    "url": "shell.html",
    "revision": "d645d3ece74d7ee2cd301a1e9ba61340"
  },
  {
    "url": "js/app.js",
    "revision": "e07b561b5bbbbb2bb5c2f3e94087c310"
  }
]);

self.addEventListener('install', event => {
    const urls = [
        'https://cdn.ampproject.org/v0.js',
        'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',
        'https://cdn.ampproject.org/shadow-v0.js',
        'index.html',
        '/'
    ];
    const cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(urls)));
});
/*
workbox.routing.registerRoute(/(index|\/articles\/)(.*)html|(.*)\/$/, args => {
    return workbox.strategies.networkFirst().handle(args).then(response => {
        if (!response) {
            return caches.match('offline.html');
        }
        return response;
    });
});
*/
workbox.routing.registerRoute(/(index|\/articles\/)(.*)html|(.*)\/$/, args => {
    if (args.event.request.mode !== 'navigate') {
      return workbox.strategies.cacheFirst().handle(args);
    }
    return caches.match('/shell.html', {ignoreSearch: true});
  });

workbox.routing.registerRoute(/\.(?:js|css|png|gif|jpg|svg)$/,
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(/(.*)cdn\.ampproject\.org(.*)/,
    workbox.strategies.staleWhileRevalidate()
);