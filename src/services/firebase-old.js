import firebase from "firebase/app"
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;