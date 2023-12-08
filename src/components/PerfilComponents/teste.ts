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

  console.log(getDownloadURL(storageRef(storage, "users/17/jojo.jpeg")));


  // await uploadBytes(imageRef, imageUpload);

  const snapshot = await uploadBytes(imageRef, imageUpload);

    // Agora, obtenha o URL de download do arquivo usando o método getDownloadURL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('Arquivo carregado com sucesso. URL de download:', downloadURL);

    return downloadURL;
};


export const getFirebaseStorage = async (id, isItem) => {
  return new Promise(async (resolve, reject) => {
    const path = isItem ? 'items/' : 'users/';
    const pathId = `/${id}/`;
    const imageName = 'foto-perfil'; // Pode ser personalizado conforme necessário

    const imageRef = storageRef(storage, `${path + pathId + imageName}`);

    try {
      const snapshot = await uploadBytes(imageRef, new Uint8Array(0)); // Substitua pelo seu uploadBytes real

      // Obtenha o URL de download do arquivo usando o método getDownloadURL
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log('Arquivo carregado com sucesso. URL de download:', downloadURL);

      resolve(downloadURL);
    } catch (error) {
      console.error('Erro ao carregar a foto:', error);
      reject(error);
    }
  });
};
