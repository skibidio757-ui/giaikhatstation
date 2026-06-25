const firebaseConfig = {
  apiKey: "AIzaSyBuCLyl6W-mTp_P1NL-daoWqsVP0gWp4UI",
  authDomain: "giaikhatstaton.firebaseapp.com",
  projectId: "giaikhatstaton",
  storageBucket: "giaikhatstaton.firebasestorage.app",
  messagingSenderId: "292568980848",
  appId: "1:292568980848:web:7a6fa596a321c5478943b5",
  measurementId: "G-DG9LQLGZS0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
