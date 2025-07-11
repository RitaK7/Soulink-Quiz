// ─── DATA MAPS ─────────────────────────────────────────────────────
const loveLangMap = {
  "Words of Affirmation": "You thrive on heartfelt compliments and spoken appreciation.",
  "Acts of Service": "Actions speak louder than words—you feel loved when help arrives.",
  "Receiving Gifts": "Tangible tokens show you how much you’re cherished.",
  "Quality Time": "Undivided attention and shared moments fill your soul.",
  "Physical Touch": "Touch is your language of connection and security."
};

const westernMap = {
  Aries:      "bold and ambitious, driven by passion.",
  Taurus:     "grounded and reliable, with a love for beauty.",
  Gemini:     "curious and adaptable, thrives on communication.",
  Cancer:     "deeply intuitive and emotionally in tune.",
  Leo:        "radiates confidence, charisma, and creativity.",
  Virgo:      "meticulous, thoughtful, and practical.",
  Libra:      "balanced and fair, seeks harmony in all things.",
  Scorpio:    "intense and mysterious, driven by deep emotions.",
  Sagittarius:"adventurous and optimistic, seeking freedom and wisdom.",
  Capricorn:  "disciplined and ambitious, striving for success.",
  Aquarius:   "innovative thinker, humanitarian at heart.",
  Pisces:     "deeply empathetic, artistic, and spiritual."
};

const chineseMap = {
  Rat:    "quick-witted and resourceful, often finding success in creative ways.",
  Ox:     "strong, dependable, and trustworthy.",
  Tiger:  "brave, competitive, and unpredictable.",
  Rabbit: "gentle, quiet, and elegant.",
  Dragon: "confident, intelligent, and enthusiastic.",
  Snake:  "wise, discreet, and strategic.",
  Horse:  "energetic, independent, and impatient.",
  Goat:   "gentle-hearted and creative, sometimes moody.",
  Monkey: "clever, curious, and mischievous.",
  Rooster:"observant, hardworking, and courageous.",
  Dog:    "loyal, honest, and prudent.",
  Pig:    "generous, compassionate, and diligent."
};

// ─── UTIL: Life Path Calculation ──────────────────────────────────
function computeLifePath(dob) {
  let sum = dob.replace(/[^0-9]/g,'')
               .split('').map(n=>+n)
               .reduce((a,b)=>a+b,0);
  while (sum>9 && ![11,22,33].includes(sum)) {
    sum = sum.toString().split('').map(n=>+n).reduce((a,b)=>a+b,0);
  }
  return sum;
}

// ─── RENDER RESULTS ───────────────────────────────────────────────
function renderResults() {
  const data = JSON.parse(localStorage.getItem("soulQuiz") || "{}");
  const { name="Soul Seeker", birthdate, loveLanguage, zodiacSign, chineseSign } = data;
  const lifePath = birthdate ? computeLifePath(birthdate) : "Unknown";

  // Greeting
  document.getElementById("greeting-card").innerHTML = `
    <h3>🌟 Hello, ${name}!</h3>
    <p>You were born on <strong>${birthdate}</strong> and you’re looking for <strong>${data.goal||"Self-Discovery"}</strong>.</p>
    <p>Your primary love language is <strong>${loveLanguage}</strong>.</p>
  `;

  // Love Language
  document.getElementById("love-card").innerHTML = `
    <h3>💖 Love Language</h3>
    <p>${loveLanguageMapOrDefault(loveLanguage)}</p>
  `;

  // Western Zodiac
  document.getElementById("western-card").innerHTML = `
    <h3>♐ Western Zodiac</h3>
    <p><strong>${zodiacSign}</strong></p>
    <p>${westernMap[zodiacSign] || "Unknown traits."}</p>
  `;

  // Chinese Zodiac
  document.getElementById("chinese-card").innerHTML = `
    <h3>🐉 Chinese Zodiac</h3>
    <p><strong>${chineseSign}</strong></p>
    <p>${chineseMap[chineseSign] || "Unknown traits."}</p>
  `;

  // Numerology
  document.getElementById("numerology-card").innerHTML = `
    <h3>🔢 Numerology (Life Path)</h3>
    <p>Your Life Path number is <strong>${lifePath}</strong>.</p>
    <p>${numerologyDescription(lifePath)}</p>
  `;

  // AI Insight
  document.getElementById("ai-insight-content").innerHTML = `
    <p>Dear <strong>${name}</strong>, your soul resonates with the energy of a <strong>${zodiacSign}</strong> — ${westernMap[zodiacSign] || ""}</p>
    <p>Your love language, <strong>${loveLanguage}</strong>, shows that ${loveLangMap[loveLanguage]}</p>
    <p>As a <strong>${chineseSign}</strong> in Chinese astrology, you’re ${chineseMap[chineseSign]}</p>
    <p>Your Life Path number <strong>${lifePath}</strong> indicates ${numerologyDescription(lifePath)}</p>
  `;
}

// ─── HELPERS ─────────────────────────────────────────────────────
function loveLanguageMapOrDefault(key) {
  return loveLangMap[key] || "Unknown";
}

function numerologyDescription(num) {
  const desc = {
    1: "a trailblazer and independent spirit.",
    2: "a peacemaker yearning for balance.",
    3: "a creative communicator full of joy.",
    4: "a solid foundation builder.",
    5: "a freedom seeker and explorer.",
    6: "a nurturer and caregiver at heart.",
    7: "a seeker of truth, introspective and wise.",
    8: "an achiever driven by abundance.",
    9: "a humanitarian with a big vision."
  };
  return desc[num] || "";
}

// ─── FEEDBACK (EmailJS) ──────────────────────────────────────────
function initFeedback() {
  emailjs.init("SV7ptjuNI88paiVbz"); // tavo Public Key

  const form   = document.getElementById("feedback-form");
  const status = document.getElementById("feedback-message");
  const btn    = form.querySelector("button");

  form.addEventListener("submit", e => {
    e.preventDefault();
    status.textContent = "📨 Sending…";
    btn.disabled = true;

    emailjs.sendForm("service_3j9h9ei", "template_99hg4ni", form)
      .then(() => {
        status.textContent = "✅ Feedback sent!";
        btn.textContent   = "Sent ✓";
      })
      .catch(err => {
        console.error("EmailJS Error:", err);
        status.textContent = "❌ Send failed, please try again.";
        btn.disabled = false;
      });
  });
}

// ─── PDF DOWNLOAD ────────────────────────────────────────────────
function initPDF() {
  document.getElementById("download-pdf").addEventListener("click", () => {
    const el = document.getElementById("results-output");
    html2pdf().set({ margin: .5, filename: "Soulink-Results.pdf", html2canvas:{ scale:2 }}).from(el).save();
  });
}

// ─── ON LOAD ─────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  renderResults();
  initFeedback();
  initPDF();
});
