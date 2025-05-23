const params = new URLSearchParams(window.location.search);
const language = params.get("language");
const value = params.get("value");
const dream = params.get("dream");

const icons = {
  "Kindness": "🕊️",
  "Freedom": "🦋",
  "Adventure": "⛰️",
  "Trust": "🤝",
  "Creativity": "🎨"
};

const container = document.getElementById("portrait");

if (!language || !value || !dream) {
  container.innerHTML = `
    <h2>Your Soul Portrait</h2>
    <p>Missing data for portrait. Please start from the beginning.</p>
    <a href="index.html"><button>Back</button></a>
  `;
} else {
  const icon = icons[value] || "✨";
  const shareURL = encodeURIComponent(window.location.href);
  container.innerHTML = `
    <h2>Your Soul Portrait</h2>
    <div class="soul-graphic">${icon}</div>
    <p>You are a Soul Seeker of <strong>${value}</strong>, who speaks in <strong>${language}</strong> and dreams to <strong>${dream}</strong>.</p>
    <button id="downloadBtn">Download as Image</button>
    <div class="share">
      <p>Share your portrait:</p>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${shareURL}" target="_blank">Facebook</a> |
      <a href="https://twitter.com/intent/tweet?text=Check out my Soul Portrait!&url=${shareURL}" target="_blank">Twitter</a>
    </div>
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