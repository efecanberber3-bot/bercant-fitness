const firebaseConfig = {
  apiKey: "AIzaSyA6vXTR-ABEPRI1P181lNXB-8SfLCG0SWY",
  projectId: "bercant-fitness",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function saveData() {
  const name = document.getElementById("name").value;
  const water = document.getElementById("water").value;
  const supp = document.getElementById("supp").value;
  const food = document.getElementById("food").value;

  if (!name) {
    alert("İsim gir");
    return;
  }

  db.collection("records").add({
    name,
    water,
    supp,
    food,
    date: new Date().toLocaleDateString("tr-TR"),
    time: new Date().toLocaleTimeString("tr-TR")
  });

  alert("Kaydedildi");
  loadData(name);
}

function loadData(name) {
  const recordsDiv = document.getElementById("records");
  recordsDiv.innerHTML = "";

  db.collection("records")
    .where("name", "==", name)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const d = doc.data();
        recordsDiv.innerHTML += `
          <div class="record">
            📅 ${d.date} ${d.time}<br>
            💧 Su: ${d.water} L<br>
            💊 Takviye: ${d.supp}<br>
            🍽 Yemek: ${d.food}
          </div>
        `;
      });
    });
}
