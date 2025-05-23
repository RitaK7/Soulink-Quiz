document.getElementById('quizForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const language = document.getElementById('language').value;
  const value = document.getElementById('value').value;
  const dream = document.getElementById('dream').value.trim();

  if (!language || !value || !dream) {
    alert('Please fill out all fields before revealing your soul!');
    return;
  }

  const url = `soul-portrait.html?language=${encodeURIComponent(language)}&value=${encodeURIComponent(value)}&dream=${encodeURIComponent(dream)}`;
  window.location.href = url;
});
