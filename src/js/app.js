if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('http://localhost:3009/service-worker.js')
    .then(function(registration) {
      console.log("Service Worker Registered in app");
    })
    .catch(function(err) {
      console.log("Service Worker Failed to Register in app", err);
    })

}

const pushServerPublicKey = "BIaw7ppewyFcLemIzvVlsB4b3RMd0_SXpt2DOALxsB3FUTd729focefUUQrl7j1GvfHLMoOfyZvvWtailNg87Vo";

/**
 * 
 * using the registered service worker creates a push notification subscription and returns it
 * 
 */
function createNotificationSubscription() {
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready.then(function(serviceWorker) {
    // subscribe and return the subscription
    return serviceWorker.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: pushServerPublicKey
    })
    .then(function(subscription) {
      subscription=JSON.stringify(subscription)
      console.log("User is subscribed.", subscription);
      JSON.stringify(createNotificationSubscription())
      return JSON.parse(subscription);
    });
  });
}

function notifyMe() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    
    // const notification = new Notification("Hi there!");
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log(JSON.stringify(createNotificationSubscription()))
        const notification = new Notification("Hi there!");
        // 
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}




// Function to perform HTTP request
// var get = function(url) {
//   return new Promise(function(resolve, reject) {

//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 var result = xhr.responseText
//                 result = JSON.parse(result);
//                 resolve(result);
//             } else {
//                 reject(xhr);
//             }
//         }
//     };
    
//     xhr.open("GET", url, true);
//     xhr.send();

//   }); 

  
notifyMe()

// get('https://api.nasa.gov/planetary/earth/imagery?api_key=fWfSMcDzyHfMuH3BW6jiIUBYaj3hKRyKBRTBqgEQ')
//   .then(function(response) {
//     // There is an issue with the image being pulled from the API, so using a different one instead
//     document.getElementsByClassName('targetImage')[0].src = "https://api.nasa.gov/images/earth.png";

//   })
//   .catch(function(err) {
//     console.log("Error", err);
//   })



