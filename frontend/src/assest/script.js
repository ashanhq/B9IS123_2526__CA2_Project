const API_URL = "http://localhost:5000/api/properties";

// Open Modal
const addListingBtn = document.querySelector(".add-listing-btn");
const addListingModal = document.getElementById("addListingModal");
// Close Buttons
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");

if (addListingBtn && addListingModal) {
  addListingBtn.addEventListener("click", function (e) {
    e.preventDefault(); // stops opening add-property.html
    addListingModal.style.display = "block";
  });

  // Close modal on (X) button
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      addListingModal.style.display = "none";
    });
  }

  // Close modal on Cancel button
  if (cancelModalBtn) {
    cancelModalBtn.addEventListener("click", function () {
      addListingModal.style.display = "none";
    });
  }

  // Optional: close modal when clicking outside content
  window.addEventListener("click", function (event) {
    if (event.target === addListingModal) {
      addListingModal.style.display = "none";
    }
  });
}

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
let currentEditId = null; // <-- MongoDB _id of property being edited ******************

// OPEN EDIT FORM
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {

    activeCard = e.target.closest(".card");
    currentEditId = e.target.dataset.id;
   

    const title = activeCard.querySelector(".title").innerText;
    const meta = activeCard.querySelector(".meta").innerText;
    const desc = activeCard.querySelector("p").innerText;


    const [location, price, beds, baths] = meta.split("•").map(v => v.trim());

    editTitle.value = title;
    editLocation.value = location;
    editPrice.value = price.replace("€", "");
    editBeds.value = beds.split(" ")[0];
    editBaths.value = baths.split(" ")[0];
    editDesc.value = desc;

    editModal.style.display = "block";
  }
});

// CLOSE EDIT MODAL
if (editCloseBtn) {
  editCloseBtn.onclick = () => {
    editModal.style.display = "none";
    currentEditId = null;
  };
}

if (cancelEditBtn) {
  cancelEditBtn.onclick = () => {
    editModal.style.display = "none";
    currentEditId = null;
  };
}

// SAVE EDITS – UPDATE DB (NOT JUST PAGE)
const editForm = document.getElementById("editForm");
if (editForm) {
  editForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!currentEditId) {
      alert("No property selected to update.");
      return;
    }

    const updated = {
      location: editLocation.value,
      price: Number(editPrice.value),
      beds: Number(editBeds.value),
      baths: Number(editBaths.value),
      description: editDesc.value
    };

    try {
      const res = await fetch(`${API_URL}/${currentEditId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Property updated in database!");

      editModal.style.display = "none";
      currentEditId = null;

      // Reload cards from DB
      loadProperties();
    } catch (err) {
      console.error("Update error:", err);
      alert("Could not update property.");
    }
  });
}

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

    <div class="card-actions">
      <a class="btn" href="#">View details</a>
      <button class="btn edit-btn" data-id="${p._id}">Edit</button>
      <button class="btn delete-btn" data-id="${p._id}">Delete</button>
    </div>
  `;

  return card;
}

//Load property
async function loadProperties() {
  const container = document.getElementById("listings");
  if (!container) return;

  container.innerHTML = "<p>Loading listings...</p>";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch properties");

    const properties = await res.json();

    if (!properties.length) {
      container.innerHTML = "<p>No properties found. Add a new listing!</p>";
      return;
    }

    container.innerHTML = "";
    properties.forEach((p) => {
      const card = createPropertyCard(p);
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Could not load properties.</p>";
  }
}

//delete property
async function deleteProperty(id) {
  const ok = confirm("Are you sure you want to delete this property?");
  if (!ok) return;

  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadProperties();
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.preventDefault();
    const id = e.target.dataset.id;
    deleteProperty(id);
  }
});

// initialload
document.addEventListener("DOMContentLoaded", loadProperties);



