
document.addEventListener("DOMContentLoaded", function() {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);
    });

  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML("beforeend", data);
    });
});
