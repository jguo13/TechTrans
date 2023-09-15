import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAwyjy7Cj1IW3YuuEaK8Z8Gyk0nztGzNK8",
    authDomain: "techtransproj.firebaseapp.com",
    projectId: "techtransproj",
    storageBucket: "techtransproj.appspot.com",
    messagingSenderId: "172021931133",
    appId: "1:172021931133:web:c0a360d594fc5e2828a514",
    measurementId: "G-7LLWWTKQHN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }
export const db = getFirestore(app);