import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// // Функція для підключення авторизації в проект
// import { getAuth } from "firebase/auth";
// // Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// // Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTs1kN1rrb7vpOODMEjz7LjMrAwGbaTNY",
  authDomain: "rn-social-app-3fbdc.firebaseapp.com",
  projectId: "rn-social-app-3fbdc",
  storageBucket: "rn-social-app-3fbdc.appspot.com",
  messagingSenderId: "409964241561",
  appId: "1:409964241561:web:c8c9b98a3658b2e1d00e08",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage();
export const db = getFirestore(app);
//OR
// firebase.initializeApp(firebaseConfig);
// export default firebase
