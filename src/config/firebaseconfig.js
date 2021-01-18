import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyC2pq1nDwNN-LhTriyC8Gea3iAC9YgX6Cg",
    authDomain: "gwapp-dev.firebaseapp.com",
    databaseURL: "https://gwapp-dev-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gwapp-dev",
    storageBucket: "gwapp-dev.appspot.com",
    messagingSenderId: "737231530552",
    appId: "1:737231530552:web:80e1107bf9c92a107d14cd",
    measurementId: "G-ZH1C7B14XD"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();