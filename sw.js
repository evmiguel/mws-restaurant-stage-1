self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('restaurant-cache').then(function(cache) {
			return cache.addAll([
				'/',
				'/restaurant.html',
				'css/restaurant.css',
				'css/styles.css',
				'img/1.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'img/10.jpg',
				'js/dbhelper.js',
				'js/main.js',
				'js/restaurant_info.js',
				'data/restaurants.json'
			])
		})
	)
})

self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if(response) return response

				// Need to clone the request because it is being used twice
		        // once by browser and once by cache
				let fetchRequest = event.request.clone();

			   return fetch(fetchRequest).then(
		          function(response) {
		            // Check if we received a valid response
		            if(!response || response.status !== 200 || response.type !== 'basic') {
		              return response;
		            }

		            // Need to clone the response because it is being used twice
		            // once by browser and once by cache
		            var responseToCache = response.clone();

		            caches.open('restaurant-cache')
		              .then(function(cache) {
		                cache.put(event.request, responseToCache);
		              });

		            return response;
		          }
		        );
		})
	)
})