const matches = [
  {
    name: "Aurora",
    compatibility: 92,
    language: "Words of Affirmation",
    value: "Kindness"
  },
  {
    name: "Lukas",
    compatibility: 87,
    language: "Physical Touch",
    value: "Adventure"
  },
  {
    name: "Isla",
    compatibility: 85,
    language: "Acts of Service",
    value: "Trust"
  }
];

const matchList = document.getElementById("matchList");

matches.forEach(match => {
  const card = document.createElement("div");
  card.className = "match-card";
  card.innerHTML = `
    <h2>${match.name}</h2>
    <p><strong>Compatibility:</strong> ${match.compatibility}%</p>
    <p><strong>Love Language:</strong> ${match.language}</p>
    <p><strong>Core Value:</strong> ${match.value}</p>
    <button class="like-btn">❤️ Like</button>
    <button class="view-btn">View More</button>
  `;
  matchList.appendChild(card);
});