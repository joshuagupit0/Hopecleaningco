// --------------------- Variables ---------------------
const REVIEW_API = "https://script.google.com/macros/s/AKfycbz8Uq7Ygahii9HEINmVg5-A3ZieZqKLNq9BSJf8s8rlr0LcqJ0AJl-TmBv2T53jij_lXA/exec";
const reviewList = document.getElementById("reviewsList");
const extraReviewsDiv = document.getElementById("extraReviews");
const toggleBtn = document.getElementById("toggleReviews");
const LIMIT = 3;
let allReviews = [];
let showAll = false;

// --------------------- Load Reviews from API ---------------------
async function loadReviews() {
  try {
    const res = await fetch(REVIEW_API);
    allReviews = await res.json();
    renderReviews();
  } catch(err) {
    console.error("Failed to load reviews", err);
  }
}

// --------------------- Render Reviews ---------------------
function reviewCardHTML(r){
  return `
    <div class="card fade-in show">
      <p>${"⭐".repeat(r.rating)}</p>
      <p>"${r.review}"</p>
      <strong>- ${r.name}</strong>
    </div>
  `;
}

function renderReviews() {
  reviewList.innerHTML = "";
  extraReviewsDiv.innerHTML = "";

  // First 3 reviews
  const firstReviews = allReviews.slice(0,LIMIT);
  firstReviews.forEach(r => reviewList.innerHTML += reviewCardHTML(r));

  // Extra reviews (hidden initially)
  const extraReviews = allReviews.slice(LIMIT);
  if(extraReviews.length > 0){
    extraReviews.forEach(r => extraReviewsDiv.innerHTML += reviewCardHTML(r));
    toggleBtn.style.display = "inline-block";
    toggleBtn.innerText = showAll ? "Show less" : "Show more";
    extraReviewsDiv.style.display = showAll ? "grid" : "none";
  } else { toggleBtn.style.display = "none"; }
}

// --------------------- Toggle Extra Reviews ---------------------
toggleBtn.addEventListener("click", () => {
  showAll = !showAll;
  extraReviewsDiv.style.display = showAll ? "grid" : "none";
  toggleBtn.innerText = showAll ? "Show less" : "Show more";
});

// --------------------- Submit New Review ---------------------
document.getElementById("reviewForm").addEventListener("submit", async e => {
  e.preventDefault();
  const data = {
    name: reviewName.value,
    rating: reviewRating.value,
    review: reviewText.value
  };
  try {
    const res = await fetch(REVIEW_API, { method:"POST", body: JSON.stringify(data) });
    const result = await res.json();
    alert("Thank you! Your Review ID is "+result.reviewId);
    e.target.reset();
    loadReviews();
  } catch(err){
    alert("Failed to submit review"); 
    console.error(err);
  }
});

// --------------------- Fade-in Animation on Scroll ---------------------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });

document.querySelectorAll('section, .card, .two-col').forEach(el => {
  el.classList.add('fade-in'); 
  observer.observe(el);
});

// Load reviews initially
loadReviews();
