document.addEventListener("DOMContentLoaded", () => {
  const language = localStorage.getItem("soul_language") || "mystery";
  const value = localStorage.getItem("soul_value") || "uniqueness";
  const dream = localStorage.getItem("soul_dream") || "a secret path";

  const phrases = {
    intro: [
      "You are a heart-led creator,",
      "You radiate soulful energy,",
      "You walk a luminous path,"
    ],
    connector: [
      "whose love language is",
      "guided by the essence of",
      "who expresses love through"
    ],
    finale: [
      `and you dream to ${dream}.`,
      `while holding close the dream: ${dream}.`,
      `and your soul whispers: ${dream}.`
    ]
  };

  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const insight = \`\${random(phrases.intro)} \${random(phrases.connector)} <strong>\${language}</strong>,
  your core value is <strong>\${value}</strong>, \${random(phrases.finale)}\`;

  document.getElementById("insightText").innerHTML = insight;
});