const bookBtn = document.getElementById("bookBtn");
    const popupOverlay = document.getElementById("popupOverlay");
    const acceptBtn = document.getElementById("acceptBtn");
    const declineBtn = document.getElementById("declineBtn");

    // Show popup when booking button is clicked
    bookBtn.addEventListener("click", () => {
      popupOverlay.style.display = "flex";
    });

    // Accept terms
    acceptBtn.addEventListener("click", () => {
      popupOverlay.style.display = "none";
      alert("Thank you for accepting! Redirecting to booking...");
      window.location.href = "booking.html"; // replace with your booking page
    });

    // Decline terms
    declineBtn.addEventListener("click", () => {
      popupOverlay.style.display = "none";
      alert("You must accept the Terms to proceed.");
    });