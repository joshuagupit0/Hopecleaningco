
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(
    "#choose .choose-cont .five-col > div"
  );

  console.log("Choose cards found:", cards.length);

  if (!cards.length) return;

  const chooseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-active");
        } else {
          entry.target.classList.remove("scroll-active");
        }
      });
    },
    {
      threshold: 0.9,
      rootMargin: "-20% 0px -40% 0px"
    }
  );

  cards.forEach((card) => {
    chooseObserver.observe(card);
  });
});
