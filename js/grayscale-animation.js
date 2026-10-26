document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".about .two-col .about-left, .home-service, .home, .hero-pack, .services .serv-con .card-serv img, .home-service, .home, .hero-pack, .home-booking"
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.8
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
});