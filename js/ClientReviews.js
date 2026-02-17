const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzqhwf-o07kjlhQRVReFqGB_JKWqyGUmsZxxPe3j3YG_Ariq72jvWnraufIrqdJrqOmNQ/exec"; // Replace with your Apps Script URL
    const track = document.getElementById("review-track");
    let clients = [];
    let index = 0;
    const cardsPerSlide = 3;
    const cardWidth = 400;

    // 10 random colors for avatars
    const colors = ["#FF5733","#33FF57","#3357FF","#FF33A8","#A833FF",
                    "#33FFF6","#FFC733","#8DFF33","#FF8333","#33A8FF"];

    // Build review card
    function addCard(client, i) {
      const card = document.createElement("div");
      card.className = "review-card";

      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.style.backgroundColor = colors[i % colors.length];
      avatar.textContent = client.name.charAt(0).toUpperCase();

      card.appendChild(avatar);
      card.innerHTML += `
        <h3>${client.name}</h3>
        <div class="stars">${"★".repeat(client.rating)}${"☆".repeat(5-client.rating)}</div>
        <p class="comment">${client.comment}</p>
      `;
      track.appendChild(card);
    }

    // Slider navigation
    function updateSlider() {
      track.style.transform = `translateX(-${index * cardsPerSlide * cardWidth}px)`;
    }
    function nextSlide() {
      const maxIndex = Math.ceil(clients.length / cardsPerSlide) - 1;
      index = (index + 1) > maxIndex ? 0 : index + 1;
      updateSlider();
    }
    function prevSlide() {
      const maxIndex = Math.ceil(clients.length / cardsPerSlide) - 1;
      index = (index - 1) < 0 ? maxIndex : index - 1;
      updateSlider();
    }
    setInterval(nextSlide, 5000);

    // Fetch reviews from spreadsheet
    function loadReviews() {
      fetch('https://script.google.com/macros/s/AKfycbzqhwf-o07kjlhQRVReFqGB_JKWqyGUmsZxxPe3j3YG_Ariq72jvWnraufIrqdJrqOmNQ/exec')
        .then(res => res.json())
        .then(data => {
          clients = data;
          track.innerHTML = "";
          clients.forEach((client, i) => addCard(client, i));
          updateSlider();
        });
    }

    // Submit review
    document.getElementById("reviewForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const rating = parseInt(document.getElementById("rating").value);
      const comment = document.getElementById("comment").value;

      const newClient = {name, rating, comment};

      fetch('https://script.google.com/macros/s/AKfycbzqhwf-o07kjlhQRVReFqGB_JKWqyGUmsZxxPe3j3YG_Ariq72jvWnraufIrqdJrqOmNQ/exec', {
        method: "POST",
        body: JSON.stringify(newClient)
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById("popupMessage").textContent =
          "Your review has been submitted! Client ID: " + data.clientId;
        document.getElementById("popup").classList.add("show");
        loadReviews(); // Refresh reviews
      })
      .catch(err => console.error("Error:", err));

      this.reset();
    });

    function closePopup() {
      document.getElementById("popup").classList.remove("show");
    }

    // Load reviews on page load
    loadReviews();