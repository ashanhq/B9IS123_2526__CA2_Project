const API_URL = "http://localhost:5000/api/properties";

document.querySelector("#addForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    price: document.querySelector("#price").value,
    type: document.querySelector("#type").value,
    location: document.querySelector("#location").value,
    beds: Number(document.querySelector("#beds").value),
    baths: Number(document.querySelector("#baths").value),
    //image: document.querySelector("#image").value 
  };