// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvpTtmb0rSbBvlWRb3qlpZ61mjr2fm0gc",
  authDomain: "my-app-83b4b.firebaseapp.com",
  databaseURL: "https://my-app-83b4b-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "my-app-83b4b",
  storageBucket: "my-app-83b4b.appspot.com",
  messagingSenderId: "543670882710",
  appId: "1:543670882710:web:c8f1e42d956786b721cdb7",
  measurementId: "G-DZVSP50Q32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the database for components to use.
const database = getDatabase(app);

export { database };
export default app;