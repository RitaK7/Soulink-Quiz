window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const love = params.get('love');
  const value = params.get('value');
  const dream = params.get('dream');

  const portraitDiv = document.getElementById('portraitResult');

  if (!love || !value || !dream) {
    portraitDiv.innerHTML = "<p>Missing data for portrait. Please start from the beginning.</p>";
    return;
  }

  const description = `
    <h2>You are a Soul Seeker of <em>${value}</em></h2>
    <p>You speak in <strong>${love}</strong> and dream to <em>${dream}</em>.</p>
    <p>This reveals your deep nature: a harmonious spirit guided by your inner values and vision.</p>
  `;

  portraitDiv.innerHTML = description;
};