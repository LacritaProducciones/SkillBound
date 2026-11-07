/* Service worker de avisos (Firebase Cloud Messaging).
   Pega aqui el MISMO firebaseConfig que pusiste en index.html. */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAGsKX71sh57j941xFCNwrIg6Z8xXWHmEk",
  authDomain: "skillbound-25bbb.firebaseapp.com",
  projectId: "skillbound-25bbb",
  storageBucket: "skillbound-25bbb.firebasestorage.app",
  messagingSenderId: "87324612447",
  appId: "1:87324612447:web:e47ec8e6a198335f7e08ea"
});

try{ firebase.messaging(); }catch(e){}   // FCM muestra solo el aviso cuando la web esta cerrada

self.addEventListener('notificationclick', function(event){
  event.notification.close();
  const d = event.notification.data || {};
  const fcm = d.FCM_MSG && d.FCM_MSG.notification && d.FCM_MSG.notification.click_action;
  const target = d.url || (d.FCM_MSG && d.FCM_MSG.data && d.FCM_MSG.data.url) || fcm || './';
  event.waitUntil(clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list){
    for(const c of list){ if('focus' in c){ c.navigate && c.navigate(new URL(target, self.registration.scope).href); return c.focus(); } }
    return clients.openWindow(new URL(target, self.registration.scope).href);
  }));
});
