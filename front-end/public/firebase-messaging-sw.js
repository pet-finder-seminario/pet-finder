importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '308205182093',
});

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler((payload) => {
    const promiseChain = clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          windowClient.postMessage(payload);
        }
      })
      .then(() => registration.showNotification('my notification title'));
    return promiseChain;
  });

  self.addEventListener('notificationclick', (event) => {
    // do what you want
    // ...
  });
}
