import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZQ6EODJqZXoCoLZgV0l68ESGhlYveohs",
  authDomain: "dev-todo-a9b98.firebaseapp.com",
  projectId: "dev-todo-a9b98",
  storageBucket: "dev-todo-a9b98.firebasestorage.app",
  messagingSenderId: "394585601175",
  appId: "1:394585601175:web:d184fa993fbd1e179825d2",
  measurementId: "G-8F1BEE4YK4"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
