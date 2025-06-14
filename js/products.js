// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
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

  const carModelsSection = document.getElementById("carModels");
  const productFilter = document.getElementById("productFilter");
  const productGrid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const backBtn = document.getElementById("backBtn");

  let selectedCar = null;
  let allProducts = [];

  document.querySelectorAll(".model-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      selectedCar = btn.textContent.trim();
      carModelsSection.classList.add("hidden");
      productFilter.classList.remove("hidden");
      backBtn.classList.remove("hidden");

      await loadProducts();
      showProducts();
    });
  });

  async function loadProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    allProducts = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.compatible.includes(selectedCar)) {
        allProducts.push({ id: doc.id, ...data });
      }
    });
  }

  function showProducts(filtered = allProducts) {
    productGrid.innerHTML = "";
    filtered.forEach(prod => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}" />
        <h3>${prod.name}</h3>
        <p>Category: ${prod.category}</p>
        <p class="compatible">Compatible: ${prod.compatible.join(", ")}</p>
      `;
      productGrid.appendChild(card);
    });
  }

  document.querySelectorAll(".category-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-cat");
      const filtered = cat === "All"
        ? allProducts
        : allProducts.filter(p => p.category === cat);
      showProducts(filtered);
    });
  });

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(term));
    showProducts(filtered);
  });

  backBtn.addEventListener("click", () => {
    selectedCar = null;
    allProducts = [];
    productGrid.innerHTML = "";
    productFilter.classList.add("hidden");
    backBtn.classList.add("hidden");
    carModelsSection.classList.remove("hidden");
  });
});
