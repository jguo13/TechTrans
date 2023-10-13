import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }
export const db = getFirestore(app);