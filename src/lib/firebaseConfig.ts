import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK2DBhx2t6cRT1DrLoeVd5OT1iE6sXz-E",
  authDomain: "assessment-4177d.firebaseapp.com",
  projectId: "assessment-4177d",
  storageBucket: "assessment-4177d.appspot.com",
  messagingSenderId: "795642251364",
  appId: "1:795642251364:web:5f4ef748cb8290df973771",
  measurementId: "G-LEBYJN3Z0D"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
