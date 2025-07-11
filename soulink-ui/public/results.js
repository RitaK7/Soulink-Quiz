// Description Maps
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
  "Libra": "balanced and fair, seeks harmony in all things.",
  "Scorpio": "intense and mysterious, driven by deep emotions.",
  "Sagittarius": "adventurous spirit with a philosophical mind.",
  "Capricorn": "disciplined and ambitious, striving for success.",
  "Aquarius": "innovative thinker, humanitarian at heart.",
  "Pisces": "deeply empathetic, artistic, and spiritual."
};

const chineseMap = {
  "Rat": "intelligent and resourceful, quick-witted and clever.",
  "Ox": "strong, dependable, and trustworthy.",
  "Tiger": "brave, competitive, and unpredictable.",
  "Rabbit": "gentle, quiet, and elegant.",
  "Dragon": "confident, intelligent, and enthusiastic.",
  "Snake": "wise, discreet, and strategic.",
  "Horse": "energetic, independent, and impatient.",
  "Goat": "gentle-hearted and creative, sometimes moody.",
  "Monkey": "clever, curious, and mischievous.",
  "Rooster": "observant, hardworking, and courageous.",
  "Dog": "loyal, honest, and prudent.",
  "Pig": "generous, compassionate, and diligent."
};

function computeLifePath(dob) {
  const digits = dob.replace(/[^0-9]/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

function loadAndRender() {
  const data = JSON.parse(localStorage.getItem("soulQuiz")) || {};
  const { name, birthdate, loveLanguage, zodiacSign, chineseSign } = data;
  const lifePath = birthdate ? computeLifePath(birthdate) : "Unknown";

  const aiText = `
    <h3>🌟 Hello, ${name || "Soul Seeker"}!</h3>
    <p>Your Soulprint reveals a unique energy map. Here's what we discovered:</p>
    <p>💖 <strong>Love Language:</strong> ${loveLanguage}: ${loveLangMap[loveLanguage] || "Unknown"}.</p>
    <p>♈ <strong>Western Zodiac:</strong> ${zodiacSign}: ${westernMap[zodiacSign] || "Unknown"}.</p>
    <p>🐉 <strong>Chinese Sign:</strong> ${chineseSign}: ${chineseMap[chineseSign] || "Unknown"}.</p>
    <p>🔢 <strong>Life Path Number:</strong> ${lifePath}</p>
  `;

  const userData = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Birth Date:</strong> ${birthdate}</p>
    <p><strong>Love Language:</strong> ${loveLanguage}</p>
    <p><strong>Western Zodiac:</strong> ${zodiacSign}</p>
    <p><strong>Chinese Zodiac:</strong> ${chineseSign}</p>
    <p><strong>Life Path:</strong> ${lifePath}</p>
  `;

  document.getElementById("ai-description").innerHTML = aiText;
  document.getElementById("user-data").innerHTML = userData;
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
    })
      .then(() => {
        status.textContent = "✅ Message sent!";
        button.textContent = "Sent ✓";
      })
      .catch((err) => {
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
      html2pdf()
        .set({
          margin: [0.5, 0.5, 0.5, 0.5],
          filename: "Soulink-Results.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 }
        })
        .from(element)
        .save();
    });
}

window.addEventListener("DOMContentLoaded", () => {
  loadAndRender();
  initFeedback();
  initPDFDownload();
});
