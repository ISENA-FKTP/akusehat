import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyBEnHxCYX5WREb1hWbK1n_7XZB5yzv6lmw",
  authDomain: "akusehat-bidokkes.firebaseapp.com",
  projectId: "akusehat-bidokkes",
  storageBucket: "akusehat-bidokkes.appspot.com",
  messagingSenderId: "390922870394",
  appId: "1:390922870394:web:8e3c730becb4f2ad78a5c3",
  measurementId: "G-L7TYQCHVCF",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
