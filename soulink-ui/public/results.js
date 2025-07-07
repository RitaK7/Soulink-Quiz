// ———————————————————————————————————————————————————————
// Description maps (sutrumpinta demonstracijai)
const loveLangMap = {
  "Words of Affirmation": "You thrive on heartfelt compliments and spoken appreciation.",
  "Acts of Service":      "Actions speak louder than words—you feel loved when help arrives.",
  "Receiving Gifts":      "Tangible tokens show you how much you’re cherished.",
  "Quality Time":         "Undivided attention and shared moments fill your soul.",
  "Physical Touch":       "Touch is your language of connection and security."
};
const westernMap = {};
const chineseMap = {};
const numerologyMap = {};

// Utility to calculate life path (gali būti papildytas)
function computeLifePath(dateStr) {
  return 7; // demonstracinis skaičius
}

function loadAndRender() {
  const data = JSON.parse(localStorage.getItem('soulQuiz')) || {};

  document.getElementById('res-name').textContent = data.name || data.username || 'Friend';
  document.getElementById('res-birthdate').textContent = data.birthdate || '--';
  document.getElementById('res-connection').textContent = data.connectionType || data.connection || '--';

  const love = data.loveLanguage || data.loveLang || '--';
  document.getElementById('res-loveLang').textContent = love;
  document.getElementById('res-loveDesc').textContent = loveLangMap[love] || 'Description not available.';

  const wz = data.zodiacSign || data.zodiac || '--';
  document.getElementById('res-astro').textContent = wz;
  document.getElementById('res-astro-desc').textContent = westernMap[wz] || 'Description not available.';

  const cz = data.chineseSign || data.chineseZodiac || '--';
  document.getElementById('res-castro').textContent = cz;
  document.getElementById('res-castro-desc').textContent = chineseMap[cz] || 'Description not available.';

  let lp = data.lifePathNumber;
  if (!lp) {
    lp = computeLifePath(data.birthdate);
    data.lifePathNumber = lp;
    localStorage.setItem('soulQuiz', JSON.stringify(data));
  }
  document.getElementById('res-numerology').textContent = lp || '--';
  document.getElementById('res-num-desc').textContent = numerologyMap[lp] || 'Numerology meaning not available.';

  document.getElementById('ai-analysis').innerHTML = `
    <h3>🧠 AI Soul Insight</h3>
    <p>Dear <strong>${data.name || 'Friend'}</strong>, your soul resonates with the energy of a <strong>${wz}</strong>.</p>
  `;
}

function initFeedback() {
  emailjs.init("SV7ptjuNI88paiVbz");

  const form = document.getElementById('feedback-form');
  const status = document.getElementById('feedback-status');

  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = 'Sending…';

    emailjs.send(
      "service_ifo7026",
      "feedback_request",
      {
        email: form.email.value,
        page: form.page.value,
        rating: form.rating.value,
        message: form.message.value
      }
    )
    .then(() => {
      status.textContent = '✅ Thank you for your feedback!';
      form.reset();
    })
    .catch(err => {
      console.error(err);
      status.textContent = '❌ Failed to send feedback.';
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadAndRender();
  initFeedback();
});