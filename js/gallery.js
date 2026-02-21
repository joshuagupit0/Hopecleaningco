
const images = document.querySelectorAll(".gallery-track img");
const fullscreen = document.getElementById("fullscreen");
const fullImg = document.getElementById("fullImg");
const closeBtn = document.getElementById("closeBtn");

images.forEach(img => {
  img.addEventListener("click", () => {
    fullscreen.classList.add("active");
    fullImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  fullscreen.classList.remove("active");
});

fullscreen.addEventListener("click", (e) => {
  if (e.target !== fullImg) {
    fullscreen.classList.remove("active");
  }
});