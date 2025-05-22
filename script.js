
document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const language = document.getElementById("language").value;
  const value = document.getElementById("value").value;
  const dream = document.getElementById("dream").value;

  if (!language || !value || !dream) {
    alert("Please fill in all fields.");
    return;
  }

  const query = new URLSearchParams({
    language: language,
    value: value,
    dream: dream
  });

  window.location.href = `soul-portrait.html?${query.toString()}`;
});
