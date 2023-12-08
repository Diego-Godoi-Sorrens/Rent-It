import { initializeApp } from "firebase/app";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsGndTacp6dfoR6eFGgfiE9XiJVIEGflw",
  authDomain: "rent-it-3eb1d.firebaseapp.com",
  projectId: "rent-it-3eb1d",
  storageBucket: "rent-it-3eb1d.appspot.com",
  messagingSenderId: "853892588489",
  appId: "1:853892588489:web:e6b925c056c15145017e18",
  measurementId: "G-4E90JBC3Z4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// import 'firebase/storage';
// export const storage = app.storage();

export const uploadToFirebaseStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Nenhum arquivo fornecido para upload.'));
      return;
    }

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);

    const uploadTask = fileRef.put(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Acompanhar o progresso do upload se necessário
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Progresso do Upload: ${progress}%`);
      },
      (error) => {
        // Lidar com erros durante o upload
        reject(error);
      },
      () => {
        // Upload concluído com sucesso
        resolve();
      }
    );
  });
}