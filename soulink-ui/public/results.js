
// ✅ results.js – Soulink Final UX+ with Feedback animation + AI Soul Insight

const loveLangMap = {
  "Words of Affirmation": "You thrive on heartfelt compliments and spoken appreciation.",
  "Acts of Service": "Actions speak louder than words—you feel loved when help arrives.",
  "Receiving Gifts": "Tangible tokens show you how much you’re cherished.",
  "Quality Time": "Undivided attention and shared moments fill your soul.",
  "Physical Touch": "Touch is your language of connection and security."
};

const westernMap = {
  "Aries": "bold and ambitious, driven by passion.",
  "Taurus": "grounded and reliable, with a love for beauty.",
  "Gemini": "curious and adaptable, thrives on communication.",
  "Cancer": "deeply intuitive and emotionally in tune.",
  "Leo": "radiates confidence, charisma, and creativity.",
  "Virgo": "meticulous, thoughtful, and practical.",
  "Libra": "balanced, diplomatic, and values harmony.",
  "Scorpio": "intense, powerful, and passionate.",
  "Sagittarius": "free-spirited, adventurous, and wise.",
  "Capricorn": "ambitious, disciplined, and goal-oriented.",
  "Aquarius": "innovative, humanitarian, and independent.",
  "Pisces": "dreamy, sensitive, and deeply empathetic."
};

const chineseMap = {
  "Rat": "clever, charming, and sociable.",
  "Ox": "dependable, patient, and determined.",
  "Tiger": "brave, confident, and competitive.",
  "Rabbit": "gentle, kind, and creative.",
  "Dragon": "energetic, charismatic, and intelligent.",
  "Snake": "wise, intuitive, and mysterious.",
  "Horse": "active, energetic, and independent.",
  "Goat": "calm, gentle, and sympathetic.",
  "Monkey": "playful, curious, and clever.",
  "Rooster": "observant, hardworking, and courageous.",
  "Dog": "loyal, honest, and prudent.",
  "Pig": "generous, compassionate, and diligent."
};

const numerologyMap = {
  1: "a leader with strong independence and determination.",
  2: "a peacekeeper who values harmony and cooperation.",
  3: "a creative soul who brings joy and expression.",
  4: "a builder, dependable and grounded.",
  5: "a freedom-seeker who thrives on adventure.",
  6: "a nurturer with a heart for service.",
  7: "a thinker, deeply introspective and wise.",
  8: "a powerhouse with ambition and success.",
  9: "a humanitarian, selfless and compassionate."
};

function computeLifePath(dateStr) {
  if (!dateStr) return '--';
  const nums = dateStr.replace(/[^0-9]/g, '').split('').map(Number);
  let sum = nums.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

function loadAndRender() {
  const data = JSON.parse(localStorage.getItem('soulQuiz')) || {};

  const name = data.name || 'Friend';
  const birthdate = data.birthdate || '--';
  const connection = data.connectionType || '--';
  const love = data.loveLanguage || '--';
  const wz = data.zodiacSign || '--';
  const cz = data.chineseSign || '--';
  const lp = computeLifePath(data.birthdate);

  document.getElementById('res-name').textContent = name;
  document.getElementById('res-birthdate').textContent = birthdate;
  document.getElementById('res-connection').textContent = connection;
  document.getElementById('res-loveLang').textContent = love;
  document.getElementById('res-loveDesc').textContent = loveLangMap[love] || '';
  document.getElementById('res-astro').textContent = wz;
  document.getElementById('res-astro-desc').textContent = westernMap[wz] || '';
  document.getElementById('res-castro').textContent = cz;
  document.getElementById('res-castro-desc').textContent = chineseMap[cz] || '';
  document.getElementById('res-numerology').textContent = lp;
  document.getElementById('res-num-desc').textContent = numerologyMap[lp] || '';

  document.getElementById('ai-analysis').innerHTML = `
    <h3>🧠 AI Soul Insight</h3>
    <p>Dear <strong>${name}</strong>, your soul resonates with the energy of a <strong>${wz}</strong> — ${westernMap[wz] || ''}</p>
    <p>Your love language, <strong>${love}</strong>, shows that ${loveLangMap[love] || ''}</p>
    <p>As a <strong>${cz}</strong> in Chinese astrology, you’re ${chineseMap[cz] || ''}</p>
    <p>Your Life Path number <strong>${lp}</strong> indicates you are ${numerologyMap[lp] || ''}</p>
  `;
}

function initFeedback() {
  emailjs.init("SV7ptjuNI88paiVbz");

  const form = document.getElementById("feedback-form");
  const status = document.getElementById("feedback-message");
  const button = form.querySelector("button");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.textContent = "📨 Sending...";
    button.disabled = true;
    button.textContent = "Sending...";

    emailjs.send("service_ifo7026", "99hg4ni", {
      email: form.user_email.value,
      page: form.page.value,
      rating: form.rating.value,
      message: form.message.value,
    }).then(() => {
      status.textContent = "✅ Thank you for your feedback!";
      button.textContent = "Sent ✓";
    }).catch((err) => {
      console.error(err);
      status.textContent = "❌ Failed to send feedback.";
      button.disabled = false;
      button.textContent = "Send Feedback";
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadAndRender();
  initFeedback();
});
