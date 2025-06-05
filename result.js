// result.js – generate soulprint analysis and reflection

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("soulUser"));
  if (!user) return;

  document.getElementById("name").textContent = user.name;
  document.getElementById("birthdate").textContent = user.birthdate;
  document.getElementById("loveLanguage").textContent = user.loveLanguage;
  document.getElementById("zodiac").textContent = user.zodiac;
  document.getElementById("chineseSign").textContent = user.chineseSign;
  document.getElementById("coreValue").textContent = user.coreValue;

  document.getElementById("summary").textContent = generateSummary(user);
  document.getElementById("aiReflection").textContent = generateReflection(user);
});

function generateSummary(user) {
  return `You are a soul guided by ${user.coreValue}, expressing love through ${formatLoveLang(user.loveLanguage)}.
  Your zodiac signs, ${capitalize(user.zodiac)} and ${capitalize(user.chineseSign)}, add layers of depth to your personality.`;
}

function generateReflection(user) {
  // simple rule-based AI-style reflection
  let message = "";

  switch (user.coreValue) {
    case "freedom":
      message += "Your soul seeks independence and open horizons. Embrace change and trust your path.";
      break;
    case "loyalty":
      message += "Your soul is devoted and strong. You bring trust and warmth to those around you.";
      break;
    case "growth":
      message += "You're on a journey of constant transformation. Let curiosity lead your evolution.";
      break;
    case "adventure":
      message += "You carry a spark of spontaneity. Follow excitement, but stay anchored in your truth.";
      break;
    case "creativity":
      message += "Your essence is imaginative. Share your light through artistic expression and intuition.";
      break;
    case "kindness":
      message += "You radiate warmth and empathy. The world softens in your presence.";
      break;
    default:
      message += "Your unique soul shines in ways beyond words. Trust your heart.";
  }

  return message;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function formatLoveLang(lang) {
  const map = {
    words: "words of affirmation",
    touch: "physical touch",
    time: "quality time",
    acts: "acts of service",
    gifts: "receiving gifts"
  };
  return map[lang] || lang;
}
