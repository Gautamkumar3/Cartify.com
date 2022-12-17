import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4j3L0RSIoBbZUDOcoZTwj0FcQ7-qUA_g",
  authDomain: "cartify-5fab6.firebaseapp.com",
  projectId: "cartify-5fab6",
  storageBucket: "cartify-5fab6.appspot.com",
  messagingSenderId: "174781288401",
  appId: "1:174781288401:web:cf2a3bb7f477b127c89af0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
