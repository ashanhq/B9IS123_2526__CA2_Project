// Open Modal
const addListingBtn = document.querySelector(".add-listing-btn");
const addListingModal = document.getElementById("addListingModal");

// Close Buttons
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");

// Open modal when clicking the button
addListingBtn.addEventListener("click", function (e) {
  e.preventDefault(); // stops opening add-property.html
  addListingModal.style.display = "block";
});

// Close modal on (X) button
closeModalBtn.addEventListener("click", function () {
  addListingModal.style.display = "none";
});

// Close modal on Cancel button
cancelModalBtn.addEventListener("click", function () {
  addListingModal.style.display = "none";
});

// Optional: close modal when clicking outside content
window.addEventListener("click", function (event) {
  if (event.target === addListingModal) {
    addListingModal.style.display = "none";
  }
});


//Edit Listing Foam

// Elements
  const editModal = document.getElementById("editModal");
  const editCloseBtn = document.getElementById("editCloseBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");

  // Form Fields
  const editTitle = document.getElementById("editTitle");
  const editLocation = document.getElementById("editLocation");
  const editPrice = document.getElementById("editPrice");
  const editBeds = document.getElementById("editBeds");
  const editBaths = document.getElementById("editBaths");
  const editDesc = document.getElementById("editDesc");

  let activeCard = null;

  // OPEN EDIT FORM
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-btn")) {
      activeCard = e.target.closest(".card");

      let title = activeCard.querySelector(".title").innerText;
      let meta = activeCard.querySelector(".meta").innerText;
      let desc = activeCard.querySelector("p").innerText;

      let [location, price, beds, baths] = meta.split("•").map(v => v.trim());

      editTitle.value = title;
      editLocation.value = location;
      editPrice.value = price.replace("€", "");
      editBeds.value = beds.split(" ")[0];
      editBaths.value = baths.split(" ")[0];
      editDesc.value = desc;

      editModal.style.display = "block";
    }
  });

  // CLOSE MODAL
  editCloseBtn.onclick = () => editModal.style.display = "none";
  cancelEditBtn.onclick = () => editModal.style.display = "none";

   // SAVE EDITS
  document.getElementById("editForm").addEventListener("submit", function (e) {
    e.preventDefault();

    activeCard.querySelector(".title").innerText = editTitle.value;
    activeCard.querySelector(".meta").innerText =
      `${editLocation.value} • €${editPrice.value} • ${editBeds.value} bed • ${editBaths.value} bath`;
    activeCard.querySelector("p").innerText = editDesc.value;

    editModal.style.display = "none";
  });


const API_URL = "http://localhost:5000/api/properties";

function createPropertyCard(p) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = p._id;

  const titleText = `${p.type || "Property"} in ${p.location || ""}`;
  const metaText = `${p.location || ""} • €${p.price ?? ""} • ${p.beds ?? 0} bed • ${p.baths ?? 0} bath`;
  const descText = p.description || "No description provided.";

  card.innerHTML = `
    <div class="title">${titleText}</div>
    <div class="meta">${metaText}</div>
    <p>${descText}</p>
}