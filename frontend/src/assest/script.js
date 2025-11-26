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