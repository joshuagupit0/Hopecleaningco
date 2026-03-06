
    const popupOverlay = document.getElementById("popupOverlay");
    const acceptBtn = document.getElementById("acceptBtn");
    const declineBtn = document.getElementById("declineBtn");

    //Pop-terms
    document.addEventListener("click", function(event) {
    if (event.target.id === "bookBtn" || event.target.id === "bookBtn1" || event.target.id === "bookBtn2") {
      popupOverlay.style.display = "flex";
    }
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
