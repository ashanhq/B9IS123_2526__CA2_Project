const API_URL = "http://localhost:5000/api/properties";
let currentEditId = null;

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

// OPEN EDIT FORM
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {
    e.preventDefault();

    const card = e.target.closest(".card");
    if (!card) return;

    currentEditId = e.target.dataset.id; //

    const title = card.querySelector(".title").innerText;
    const meta = card.querySelector(".meta").innerText;
    const desc = card.querySelector(".description")
      ? card.querySelector(".description").innerText
      : card.querySelector("p").innerText;

    const [location, price, beds, baths] = meta.split("•").map(v => v.trim());

    editTitle.value = title;
    editLocation.value = location;
    editPrice.value = price.replace("€", "");
    editBeds.value = beds.split(" ")[0];
    editBaths.value = baths.split(" ")[0];
    editDesc.value = desc;

    if (editModal) editModal.style.display = "block";
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

// SAVE EDITS – SEND PUT TO DB
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

// Build Card
function createPropertyCard(p) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = p._id;

  const titleText = `${p.type || "Property"} in ${p.location || ""}`;
  const metaText = `${p.location || ""} • €${p.price ?? ""} • ${p.beds ?? 0} bed • ${p.baths ?? 0} bath`;
  const descText = p.description || "No description provided.";

   const isIndexPage = window.location.pathname.includes("index.html") || window.location.pathname === "/"; 

  card.innerHTML = `
    <div class="title">${titleText}</div>
    <div class="meta">${metaText}</div>
    <div class="description">${descText}</div>

    <div class="card-actions">
       <a class="btn" href="property.html?id=${p._id}">View details</a>
      ${!isIndexPage 
        ? `<button class="btn edit-btn" data-id="${p._id}">Edit</button>
           <button class="btn delete-btn" data-id="${p._id}">Delete</button>`
        : "" }
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

//Search Form Submit
document.getElementById("searchForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const q = document.getElementById("q").value.trim().toLowerCase();
  const type = document.getElementById("type").value;
  const beds = document.getElementById("bedrooms").value;

  try {
    const res = await fetch(API_URL);
    const properties = await res.json();

  //Filter Property Results
    let filtered = properties.filter(p => {
      const matchesLocation = p.location.toLowerCase().includes(q);
      const matchesType = type ? p.type === type : true;
      const matchesBeds = beds ? p.beds >= Number(beds) : true;

      return matchesLocation && matchesType && matchesBeds;
    });


  //Render Filtered Property Cards
    const container = document.getElementById("listings");
    container.innerHTML = "";

    if (!filtered.length) {
      container.innerHTML = "<p>No properties match your search.</p>";
      return;
    }

    filtered.forEach(p => {
      const card = createPropertyCard(p);
      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
  }
});


// initialload
document.addEventListener("DOMContentLoaded", loadProperties);



