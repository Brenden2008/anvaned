if('serviceWorker' in navigator){
  console.log("looking for worker")
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}