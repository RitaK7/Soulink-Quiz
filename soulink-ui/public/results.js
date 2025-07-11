// Love language descriptions
const loveLangMap = {
  "Words of Affirmation": "You thrive on heartfelt compliments and spoken appreciation.",
  "Acts of Service": "Actions speak louder than words—you feel loved when help arrives.",
  "Receiving Gifts": "Tangible tokens show you how much you’re cherished.",
  "Quality Time": "Undivided attention and shared moments fill your soul.",
  "Physical Touch": "Touch is your language of connection and security."
};

// Western zodiac
const westernMap = {
  Aries: "Bold and ambitious, driven by passion.",
  Taurus: "Grounded and reliable, with a love for beauty.",
  Gemini: "Curious and adaptable, thrives on communication.",
  Cancer: "Deeply intuitive and emotionally in tune.",
  Leo: "Radiates confidence, charisma, and creativity.",
  Virgo: "Meticulous, thoughtful, and practical.",
  Libra: "Seeks balance, harmony, and deep connection.",
  Scorpio: "Intense, loyal, and magnetically mysterious.",
  Sagittarius: "Adventurous spirit with a philosophical mind.",
  Capricorn: "Disciplined, goal-oriented, and wise beyond years.",
  Aquarius: "Innovative, independent, and visionary thinker.",
  Pisces: "Empathetic dreamer, deeply spiritual and creative."
};

// Chinese zodiac
const chineseMap = {
  Rat: "Intelligent and resourceful, quick-witted and clever.",
  Ox: "Strong, dependable, and determined.",
  Tiger: "Brave, competitive, and confident.",
  Rabbit: "Gentle, quiet, and elegant.",
  Dragon: "Ambitious, energetic, and charismatic.",
  Snake: "Wise, graceful, and analytical.",
  Horse: "Energetic, free-spirited, and strong-willed.",
  Goat: "Calm, gentle, and compassionate.",
  Monkey: "Inventive, playful, and curious.",
  Rooster: "Observant, hardworking, and courageous.",
  Dog: "Loyal, honest, and deeply faithful.",
  Pig: "Generous, diligent, and sincere."
};

// Life path
function computeLifePath(dateStr) {
  const digits = dateStr.replace(/\D/g, "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split("").reduce((a, b) => a + Number(b), 0);
  }
  return sum;
}

function loadAndRender() {
  const data = JSON.parse(localStorage.getItem('soulQuiz')) || {};

  const name = data.name || "Soul Seeker";
  const birth = data.birthdate || "Unknown";
  const love = data.loveLanguage || "Unknown";
  const western = data.zodiacSign || "Unknown";
  const chinese = data.chineseSign || "Unknown";
  const path = computeLifePath(birth);

  document.getElementById("summary-card").innerHTML = `
    <h3>🌟 Hello, ${name}!</h3>
    <p>Your Soulprint reveals a unique energy map. Here's what we discovered:</p>
    <ul>
      <li><strong>💖 Love Language:</strong> ${loveLangMap[love] || "Unknown"}</li>
      <li><strong>♓ Western Zodiac:</strong> ${westernMap[western] || "Unknown"}</li>
      <li><strong>🐉 Chinese Sign:</strong> ${chineseMap[chinese] || "Unknown"}</li>
      <li><strong>🔢 Life Path Number:</strong> ${path}</li>
    </ul>
  `;

  document.getElementById("detail-card").innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Birth Date:</strong> ${birth}</p>
    <p><strong>Love Language:</strong> ${love}</p>
    <p><strong>Western Zodiac:</strong> ${western}</p>
    <p><strong>Chinese Zodiac:</strong> ${chinese}</p>
    <p><strong>Life Path:</strong> ${path}</p>
  `;
}

function initFeedback() {
  emailjs.init("UYuKR_3UnPjeqJFL7");
  const form = document.getElementById("feedback-form");
  const status = document.getElementById("feedback-message");
  const button = form.querySelector("button");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "📨 Sending…";
    button.disabled = true;
    button.textContent = "Sending…";

    emailjs.send("service_3j9h9ei", "template_99hg4ni", {
      user_email: form.user_email.value,
      page: form.page.value,
      rating: form.rating.value,
      message: form.message.value,
      to_email: "ritakairiene7@gmail.com"
    }).then(() => {
      status.textContent = "✅ Message sent!";
      button.textContent = "Sent ✓";
    }).catch(err => {
      console.error("EmailJS Error:", err);
      status.textContent = "❌ Send failed";
      button.disabled = false;
      button.textContent = "Send Feedback";
    });
  });
}

function initPDFDownload() {
  document.getElementById("download-pdf")
    .addEventListener("click", () => {
      const element = document.getElementById("pdf-section");
      html2pdf().set({
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'Soulink-Results.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 }
      }).from(element).save();
    });
}

window.addEventListener("DOMContentLoaded", () => {
  loadAndRender();
  initFeedback();
  initPDFDownload();
});
