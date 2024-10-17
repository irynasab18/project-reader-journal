import { firebaseConfig } from '../../configs/config.js'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
    apiKey: process.env.DB_API_KEY,
    authDomain: process.env.DB_AUTH_DOMAIN,
    projectId: process.env.DB_PROJECT_ID,
    storageBucket: process.env.DB_STORAGE_BUCKET,
    messagingSenderId: process.env.DB_MESSAGING_SENDER_ID,
    appId: process.env.DB_APP_ID,
    measurementId: process.env.DB_MEASURMENT_ID
});
const auth = getAuth(app);
const myDB = getFirestore(app);

export { auth, myDB };