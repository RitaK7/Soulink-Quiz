document.addEventListener("DOMContentLoaded", () => {
  const partnerName = "Aurora";
  const info = "Aurora shares your values in kindness and dreams of global travel. You both prioritize deep emotional connection.";

  document.getElementById("partnerName").innerText = partnerName;
  document.getElementById("partnerInfo").innerText = info;

  document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for your feedback!");
    this.reset();
  });
});