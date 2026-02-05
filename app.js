// Firebase Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6vXTR-ABEPRI1P181lNXB-8SfLCG0SWY",
  projectId: "bercant-fitness",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// GLOBAL YAP
window.saveData = async function () {
  const name = document.getElementById("name").value;
  const water = document.getElementById("water").value;
  const supp = document.getElementById("supp").value;
  const food = document.getElementById("food").value;

  if (!name) {
    alert("İsim gir");
    return;
  }

  await addDoc(collection(db, "records"), {
    name,
    water,
    supp,
    food,
    date: new Date().toLocaleDateString("tr-TR"),
    time: new Date().toLocaleTimeString("tr-TR")
  });

  alert("Kaydedildi");
};

window.loadAllData = async function () {
  const container = document.getElementById("allRecords");
  container.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "records"));

  querySnapshot.forEach((document) => {
    const d = document.data();

    container.innerHTML += `
      <div class="record">
        <strong>👤 ${d.name}</strong><br>
        📅 ${d.date} ${d.time}<br>
        💧 ${d.water} L<br>
        💊 ${d.supp}<br>
        🍽 ${d.food}<br><br>
        <button onclick="deleteRecord('${document.id}')">Sil</button>
      </div>
    `;
  });
};

window.deleteRecord = async function (id) {
  await deleteDoc(doc(db, "records", id));
  loadAllData();
};
