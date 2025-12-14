const API_URL = "http://localhost:5000/api/properties";

    function getPropertyId() {
      const params = new URLSearchParams(window.location.search);
      return params.get("id");
    }

    async function loadProperty() {
      const id = getPropertyId();
      if (!id) return;

      try {
        const res = await fetch(`${API_URL}/${id}`);
        const p = await res.json();

        // Fill content
        document.getElementById("propertyImage").src = p.image || "https://via.placeholder.com/600x400?text=No+Image";

        document.getElementById("title").innerText =
          `${p.type} in ${p.location}`;

        document.getElementById("meta").innerText =
          `${p.location} • €${p.price} • ${p.beds} bed • ${p.baths} bath`;

        document.getElementById("description").innerText =
          p.description || "No description available.";

        // Load Google Map based on location
        document.getElementById("map").src =
          `https://www.google.com/maps?q=${encodeURIComponent(p.location)}&output=embed`;

      } catch (err) {
        document.getElementById("title").innerText = "Property not found.";
      }
    }

    loadProperty();