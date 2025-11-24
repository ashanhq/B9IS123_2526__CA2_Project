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
