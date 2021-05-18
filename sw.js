// sw.js - Service Worker

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Success
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // Failed
        console.log('ServiceWorker registration failed: ', err);
      });
    });
}

var CACHE_NAME = 'my-site-cache-v1'
var urlsToCache = ['https://cse110lab6.herokuapp.com/entries'];

self.addEventListener('install', function(event) {
    // Installation steps
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
        })
    );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Returns the response (cache hit)
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });

  self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
  });
