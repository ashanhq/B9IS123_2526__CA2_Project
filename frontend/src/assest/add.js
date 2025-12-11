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

   const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Property added successfully!");
    window.location.reload();
  } else {
    alert("Failed to add property");
  }
});