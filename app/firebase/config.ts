import {getApps, getApp, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey:"AIzaSyCxImfAh2O82ID7MlR4S3BthxKT1uwSbcw",
    authDomain:"testly-92aeb.firebaseapp.com",
    projectId:"testly-92aeb",
    storageBucket:"testly-92aeb.appspot.com",
    messagingSenderId:"357578171316",
    appId:"1:357578171316:web:657f6d9e51dea97380c8e1"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, app, firestore};





