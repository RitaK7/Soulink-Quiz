document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".rating-stars span");
  let rating = 0;

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      rating = star.dataset.score;
      stars.forEach((s, i) => {
        s.classList.toggle("active", i < rating);
      });
    });
  });

  const form = document.getElementById("feedbackForm");
  const thanks = document.getElementById("thanksMessage");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.style.display = "none";
    thanks.style.display = "block";
  });
});