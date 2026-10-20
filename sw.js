/* Copyright (c) 2026 Marina Bay's Cafe. All rights reserved. */
var CACHE = 'mbc-v22';
var FILES = [
  './',
  './index.html',
  './money-counter.html',
  './expenses.html',
  './printers.html',
  './pos.html',
  './menu.html',
  './recipes.html',
  './inventory.html',
  './inventory-default.js',
  './app.css',
  './wide.css',
  './brand.css',
  './shift.html',
  './calendar.html',
  './data.html',
  './shift-lib.js',
  './app-data.js',
  './menu-default.js',
  './printer.js',
  './security.js',
  './cloud.js',
  './firebase-config.js',
  './sync.html',
  './security.html',
  './receipt-logo.js',
  './icons/receipt-logo.png',
  './icons/sea.jpg',
  './manifest-money-counter.webmanifest',
  './manifest-expenses.webmanifest',
  './icons/favicon-32.png',
  './icons/logo-64.png',
  './icons/counter-192.png',
  './icons/counter-512.png',
  './icons/counter-apple-touch-icon.png',
  './icons/expenses-192.png',
  './icons/expenses-512.png',
  './icons/expenses-apple-touch-icon.png',
  './manifest-app.webmanifest',
  './icons/app-192.png',
  './icons/app-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

// Network first so updates show up, fall back to cache when offline
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var u = new URL(e.request.url);
  // only handle our own files and the Firebase library files; leave all Firebase network traffic alone
  if (u.origin !== self.location.origin && u.hostname !== 'www.gstatic.com') return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match('./index.html'); });
    })
  );
});
