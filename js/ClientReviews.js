const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxHuiOH7As4nGhOcNFCF4VeXZA3YQ_U6mCNC7_o-6SwbWaBaJXtauLPzTPoPUQQPsXt/exec"; // Replace with your Apps Script URL
    const track = document.getElementById("review-track");
    let clients = [];
    let index = 0;
    const cardsPerSlide = 1;
    const cardWidth = 400;

    // 10 random colors for avatars
    const colors = ["#FF5733","#33FF57","#3357FF","#FF33A8","#A833FF",
                    "#33FFF6","#FFC733","#8DFF33","#FF8333","#33A8FF"];

    // Build review card
    function addCard(client, i) {
      const card = document.createElement("div");
      card.className = "review-card";
      // Limit comment length to 500 characters
    
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.style.backgroundColor = colors[i % colors.length];
      avatar.textContent = client.name.charAt(0).toUpperCase();
      const limit = 300;
     let commentHTML = "";
     if (client.comment.length > limit) {
     const visibleText = client.comment.substring(0, limit);
      const hiddenText = client.comment.substring(limit);

      commentHTML = `
        <p class="comment">"
          ${visibleText}<span class="more-text" style="display:none;">${hiddenText}"</span>
        </p>
        <span class="view-more-btn review-btn"">
          See More
        </span>
      `;
    } else {
      commentHTML = `<p class="comment">"${client.comment}"</p>`;
    }

      
      card.appendChild(avatar);
      card.innerHTML += `
        <h3>${client.name}</h3>
        <div class="stars">${"★".repeat(client.rating)}${"☆".repeat(5-client.rating)}</div>
        ${commentHTML}
      `;
      track.appendChild(card);

      // Attach toggle functionality if "View More" exists
    const viewMoreBtn = card.querySelector(".view-more-btn");
    if (viewMoreBtn) {
      viewMoreBtn.addEventListener("click", () => {
        const moreText = card.querySelector(".more-text");
        if (moreText.style.display === "none") {
          moreText.style.display = "inline";
          viewMoreBtn.textContent = "Back";
        } else {
          moreText.style.display = "none";
          viewMoreBtn.textContent = "See More";
        }
      });
    }
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
      fetch(WEB_APP_URL)
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

      fetch(WEB_APP_URL, {
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

