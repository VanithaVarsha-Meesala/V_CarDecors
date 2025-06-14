// js/upload.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { products } from './productsData.js';


const firebaseConfig = {
  apiKey: "AIzaSyAgSkljJJ239bdTJhKmAyRs9Gju5_RM9ZQ",
  authDomain: "v-cardecors-df3a0.firebaseapp.com",
  projectId: "v-cardecors-df3a0",
  storageBucket: "v-cardecors-df3a0.appspot.com",
  messagingSenderId: "434124372202",
  appId: "1:434124372202:web:88c7d3604379c05fbdff93",
  measurementId: "G-YJW8REWW0V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadProducts() {
  for (const prod of products) {
    try {
      await addDoc(collection(db, "products"), prod);
      console.log("✅ Uploaded:", prod.name);
    } catch (error) {
      console.error("❌ Failed to upload:", prod.name, error);
    }
  }
  alert("🎉 All Products Uploaded Successfully!");
}

uploadProducts();
