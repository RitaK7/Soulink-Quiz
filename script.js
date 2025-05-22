
document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const language = document.getElementById("language").value;
  const value = document.getElementById("value").value;
  const dream = document.getElementById("dream").value.trim();

  if (!dream) {
    alert("Please enter your dream before revealing your soul!");
    return;
  }

  const resultURL = `result.html?language=${encodeURIComponent(language)}&value=${encodeURIComponent(value)}&dream=${encodeURIComponent(dream)}`;
  window.location.href = resultURL;
});
