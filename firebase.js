
import firebase,{ initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUpQ_yqGk8Mx4MUioh4y4Px8nXFDjHJi8",
    authDomain: "thera-web.firebaseapp.com",
    projectId: "thera-web",
    storageBucket: "thera-web.appspot.com",
    messagingSenderId: "259489550169",
    appId: "1:259489550169:web:45825b4157a7db7b02c648"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = app.firestore()
