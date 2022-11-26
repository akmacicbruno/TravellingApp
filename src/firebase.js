import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyChO72_OD8d01l9xLZk4lgFRzb5xyD0pHg",
  authDomain: "travel-app-59042.firebaseapp.com",
  databaseURL: "https://travel-app-59042-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "travel-app-59042",
  storageBucket: "travel-app-59042.appspot.com",
  messagingSenderId: "829484853946",
  appId: "1:829484853946:web:8207600bcc567a1527f083",
  measurementId: "G-JBQ4T07G26"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
