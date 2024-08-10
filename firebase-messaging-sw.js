// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAokwVdu-x452qjv_hqDOFGr5x4JDTHLKY",
  authDomain: "onde-ta.firebaseapp.com",
  projectId: "onde-ta",
  storageBucket: "onde-ta.appspot.com",
  messagingSenderId: "682066979444",
  appId: "1:682066979444:web:8facebb72b60e1ccbd7f21",
  measurementId: "G-FFX8NFSDRM"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
