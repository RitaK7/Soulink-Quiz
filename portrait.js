const params = new URLSearchParams(window.location.search);
const language = params.get("language");
const value = params.get("value");
const dream = params.get("dream");

const container = document.getElementById("portrait");

if (!language || !value || !dream) {
  container.innerHTML = `
    <h2>Your Soul Portrait</h2>
    <p>Missing data for portrait. Please start from the beginning.</p>
    <a href="index.html"><button>Back</button></a>
  `;
} else {
  container.innerHTML = `
    <h2>Your Soul Portrait</h2>
    <p>You are a Soul Seeker of <strong>${value}</strong>, who speaks in <strong>${language}</strong> and dreams to <strong>${dream}</strong>.</p>
    <button id="downloadBtn">Download as Image</button>
  `;

  document.getElementById("downloadBtn").addEventListener("click", () => {
    html2canvas(document.getElementById("portrait")).then(canvas => {
      const link = document.createElement("a");
      link.download = "soul-portrait.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  });
}