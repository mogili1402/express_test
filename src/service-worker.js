// Set a name for the current cache
var cacheName = 'v1'; 
console.log(self.navigator,self.navigator.serviceWorker)
// Default files to always cache
var cacheFiles = [
	'./',
	'./index.html',
	'./js/app.js',
	'./css/reset.css',
	'./css/style.css',
	'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic,700italic'
]


self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    // e.waitUntil Delays the event until the Promise is resolved
   e.waitUntil( self.skipWaiting())
});


self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

    e.waitUntil(

    	// Get all the cache keys (cacheName)
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {

					// Delete that cached file
					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	); // end e.waitUntil

});

// self.addEventListener('fetch', function(e) {
// 	console.log('[ServiceWorker] Fetch', e.request.url);

// 	// e.respondWidth Responds to the fetch event
// 	e.respondWith(

// 		// Check in cache for the request being made
// 		caches.match(e.request)


// 			.then(function(response) {

// 				// If the request is in the cache
// 				if ( response ) {
// 					console.log("[ServiceWorker] Found in Cache", e.request.url, response);
// 					// Return the cached version
// 					return response;
// 				}

// 				// If the request is NOT in the cache, fetch and cache

// 				var requestClone = e.request.clone();
// 				return fetch(requestClone)
// 					.then(function(response) {

// 						if ( !response ) {
// 							console.log("[ServiceWorker] No response from fetch ")
// 							return response;
// 						}

// 						var responseClone = response.clone();

// 						//  Open the cache
// 						caches.open(cacheName).then(function(cache) {

// 							// Put the fetched response in the cache
// 							cache.put(e.request, responseClone);
// 							console.log('[ServiceWorker] New Data Cached', e.request.url);

// 							// Return the response
// 							return response;
			
// 				        }); // end caches.open

// 					})
// 					.catch(function(err) {
// 						console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
// 					});


// 			}) // end caches.match(e.request)
// 	); // end e.respondWith
// });
function kl(){
	importScripts("./service-worker.js")
}

self.addEventListener('push', function(e) {
	console.log("push",navigator.serviceWorker 	)
	console.log(navigator,navigator.serviceWorker)
	kl()
	console.log("new push updated")
    // navigator.serviceWorker.register('http://localhost:3000/sw.js')
    // .then(function(registration) {
    //   console.log("Service Worker Registered 123 iin sw");
    // })
    // .catch(function(err) {
    //   console.log("Service Worker Failed to Register", err);
    // })
    



});

