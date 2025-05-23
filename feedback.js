document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");
  const thanks = document.getElementById("thanksMessage");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.style.display = "none";
    thanks.style.display = "block";
  });
});