var SLOW_TIME = 3000;

this.addEventListener('install', function() {
    console.log('Installed service worker');
});

this.addEventListener('fetch', function(event) {
    var url = event.request.url;

    if (url.indexOf('blocking') === -1) {
        return;
    }

    var promise = Promise.race([
        new Promise((resolve, reject) => setTimeout(
            () => reject(new Response('Request killed!')),
            SLOW_TIME
        )),
        fetch(event.request),
    ]);

    event.respondWith(promise);
});