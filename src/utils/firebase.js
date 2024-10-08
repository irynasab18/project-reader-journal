import { firebaseConfig } from '../../configs/config.js'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const myDB = getFirestore(app);

export { auth, myDB };