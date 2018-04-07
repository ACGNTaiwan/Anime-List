var SLOW_TIME = 3000;

this.addEventListener('install', function(event) {
    console.log('Installed service worker');
    event.waitUntil(
        caches.open('al-cache').then(function(cache) {
            cache.addAll([
                '/',
                './index.html',
                './css/style.css',
                './js/index.js',
                './2018.01/anime2018.01.min.js',
                './2018.04/anime2018.04.min.js',
                './2017.10/anime2017.10.min.js',
                './2017.07/anime2017.07.min.js'
            ]);
        })
    );
});
this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // 來來來，代理可以搞一些代理的事情

            // 如果 Service Worker 有自己的返回，就直接返回，減少一次 http 請求
            if (response) {
                return response;
            }

            // 如果 service worker 沒有返回，那就得直接請求真實遠程服務
            var request = event.request.clone(); // 把原始請求拷過來
            return fetch(request).then(function(httpRes) {

                // http請求的返回已被抓到，可以處置了。

                // 請求失敗了，直接返回失敗的結果就好了。。
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                // 請求成功的話，將請求緩存起來。
                var responseClone = httpRes.clone();
                caches.open('al-cache').then(function(cache) {
                    cache.put(event.request, responseClone);
                });

                return httpRes;
            });
        })
    );
});