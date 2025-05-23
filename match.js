
document.addEventListener("DOMContentLoaded", function () {
  const matchList = document.getElementById("matchList");

  const partners = [
    { name: "Partner A", language: "Words of Affirmation", value: "Freedom", dream: "travel the world", score: 88 },
    { name: "Partner B", language: "Quality Time", value: "Kindness", dream: "peaceful family home", score: 72 },
    { name: "Partner C", language: "Physical Touch", value: "Trust", dream: "live in nature cabin", score: 91 },
    { name: "Partner D", language: "Acts of Service", value: "Adventure", dream: "launch a creative studio", score: 83 }
  ];

  partners.forEach(partner => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <strong>${partner.name}:</strong>
      ${partner.language}, ${partner.value}, Dream: ${partner.dream}
      <span class="score">${partner.score}%</span>
    `;
    matchList.appendChild(card);
  });
});
