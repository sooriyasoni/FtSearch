//caching the whole site
const cacheName = 'v2'

//call install event
self.addEventListener('install', (e) => {
    console.log('Service Worker for site: Installed');
})

//call Activate Event
self.addEventListener('activate', (e) => {
    console.log('Service  Worker for site : Activated')
    //Remove Unwanted caches
    e.waitUntil(caches.keys()
        .then(cacheNames => {
            return Promise.all(cacheNames.map(cache => {
                if (cache != cacheName) {
                    console.log('Servicw worker:clear old cache');
                    return caches.delete(cache)
                }
            }))
        }))
})

//call fetch event 
self.addEventListener('fetch', (e) => {
    console.log('service  Worker for site : Clone fetching');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                //make clone of response 
                const resClone = res.clone();
                //open a cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        //add response to cache 
                        cache.put(e.request, resClone);
                    });
                console.log('here', resClone)
                return res
            })
            .catch((err) => {
                caches.match(e.request).then(res => res)
            }))
})