import * as firebase from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBsGndTacp6dfoR6eFGgfiE9XiJVIEGflw",
  authDomain: "rent-it-3eb1d.firebaseapp.com",
  projectId: "rent-it-3eb1d",
  storageBucket: "rent-it-3eb1d.appspot.com",
  messagingSenderId: "853892588489",
  appId: "1:853892588489:web:e6b925c056c15145017e18",
  measurementId: "G-4E90JBC3Z4",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage();
// export const storage = getStorage();

export const uploadToFirebaseStorage = async (id, imageUpload, isItem) => {
  if (imageUpload === null) {
    return;
  }

  var path = "";

  if (isItem) {
    path = "items/";
  } else {
    path = "users/";
  }

  var pathId = `/${id}/`;

  // Use o nome da fila para renomear a imagem
  const imageName = "foto-perfil" || imageUpload.name;

  const imageRef = storageRef(storage, `${path + pathId + imageName}`);

  await uploadBytes(imageRef, imageUpload);
};
