import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgqPgX26sW8pfhDocm6WJrAIi_KaUTRto",
  authDomain: "todoist-tut-f568d.firebaseapp.com",
  projectId: "todoist-tut-f568d",
  storageBucket: "todoist-tut-f568d.appspot.com",
  messagingSenderId: "336017893932",
  appId: "1:336017893932:web:07835df540ffa937187f89"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { auth, firestore };
