const images = document.querySelectorAll(".gallery-track img");
const galleryTrack = document.getElementById("galleryTrack");
const fullscreen = document.getElementById("fullscreen");
const fullImg = document.getElementById("fullImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const fsPrev = document.getElementById("fsPrev");
const fsNext = document.getElementById("fsNext");

let currentIndex = 0;

// Open fullscreen
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    fullscreen.classList.add("active");
    fullImg.src = img.src;
    currentIndex = index;
  });
});

// Close fullscreen
closeBtn.addEventListener("click", () => fullscreen.classList.remove("active"));
fullscreen.addEventListener("click", (e) => {
  if (e.target === fullscreen) fullscreen.classList.remove("active");
});

// Gallery navigation
function updateGallery() {
  const offset = -currentIndex * (images[0].offsetWidth + 20); // 20 = gap
  galleryTrack.style.transform = `translateX(${offset}px)`;
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateGallery();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateGallery();
  }
});

// Fullscreen navigation
function updateFullscreen() {
  fullImg.src = images[currentIndex].src;
}

fsPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  updateFullscreen();
});

fsNext.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
  updateFullscreen();
});
let zoomLevel = 1;

// Zoom buttons
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const resetZoomBtn = document.getElementById("resetZoom");

// Apply zoom
function applyZoom() {
  fullImg.style.transform = `scale(${zoomLevel})`;
}

// Zoom in
zoomInBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  zoomLevel += 0.2;
  applyZoom();
});

// Zoom out
zoomOutBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (zoomLevel > 0.4) { // prevent disappearing
    zoomLevel -= 0.2;
    applyZoom();
  }
});

// Reset zoom
resetZoomBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  zoomLevel = 1;
  applyZoom();
});

// Mouse wheel zoom
fullscreen.addEventListener("wheel", (e) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    zoomLevel += 0.1; // scroll up = zoom in
  } else {
    if (zoomLevel > 0.4) zoomLevel -= 0.1; // scroll down = zoom out
  }
  applyZoom();
});