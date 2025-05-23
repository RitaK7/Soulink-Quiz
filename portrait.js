window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const language = params.get("language");
  const value = params.get("value");
  const dream = params.get("dream");

  if (!language || !value || !dream) {
    document.getElementById("portrait").innerHTML = "<p>Missing data for portrait. Please start from the beginning.</p>";
    return;
  }

  const container = document.getElementById("portrait");
  container.innerHTML = `
    <div class="card">
      <h2>Soul Archetype</h2>
      <p>You are a Soul Seeker of <strong>${value}</strong>, who speaks in <strong>${language}</strong> and dreams to "<strong>${dream}</strong>".</p>
    </div>
  `;

  document.getElementById("downloadBtn").addEventListener("click", () => {
    html2canvas(container).then(canvas => {
      const link = document.createElement("a");
      link.download = "soul-portrait.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  });
};