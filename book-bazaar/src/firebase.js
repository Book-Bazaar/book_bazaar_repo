// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app';
// import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDsQzm1VwWubxXEChOyRZU15-0VTjQ0fCc',
  authDomain: 'book-bazaar-190.firebaseapp.com',
  projectId: 'book-bazaar-190',
  storageBucket: 'book-bazaar-190.appspot.com',
  messagingSenderId: '159178332538',
  appId: '1:159178332538:web:9ee7045cf01839ebd61ec3',
  measurementId: 'G-NB42BBJ1MZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;
