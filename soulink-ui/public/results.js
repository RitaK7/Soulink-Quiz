
// ———————————————————————————————————————————————————————
// 1. Description maps
const loveLangMap = {
  "Words of Affirmation": "You thrive on heartfelt compliments and spoken appreciation.",
  "Acts of Service": "Actions speak louder than words—you feel loved when help arrives.",
  "Receiving Gifts": "Tangible tokens show you how much you’re cherished.",
  "Quality Time": "Undivided attention and shared moments fill your soul.",
  "Physical Touch": "Touch is your language of connection and security."
};

const westernMap = {
  Aries: "bold and ambitious, diving headfirst into challenging situations.",
  Taurus: "reliable and patient, valuing comfort and stability.",
  Gemini: "adaptable and outgoing, thriving in social situations.",
  Cancer: "intuitive and emotionally deep, caring for those they love.",
  Leo: "radiant and expressive, craving recognition and love.",
  Virgo: "analytical and detail-oriented, always seeking self-improvement.",
  Libra: "balanced and diplomatic, driven by harmony and beauty.",
  Scorpio: "passionate and powerful, diving deep into emotional truths.",
  Sagittarius: "adventurous and optimistic, seeking freedom and wisdom.",
  Capricorn: "disciplined and responsible, climbing steadily toward their goals.",
  Aquarius: "innovative and independent, marching to the beat of their own drum.",
  Pisces: "empathetic and dreamy, living in a world of feeling and imagination."
};

const chineseMap = {
  Rat: "quick-witted and resourceful, often finding success in creative ways.",
  Ox: "strong and dependable, respected for perseverance.",
  Tiger: "brave and competitive, born to lead and protect.",
  Rabbit: "gentle and compassionate, seeking peace and beauty.",
  Dragon: "confident and charismatic, a natural visionary.",
  Snake: "wise and intuitive, thriving in deep thought and elegance.",
  Horse: "energetic and cheerful, always moving forward.",
  Goat: "kind and artistic, drawn to tranquility and expression.",
  Monkey: "clever and curious, full of playful ideas.",
  Rooster: "observant and honest, standing proud in their values.",
  Dog: "loyal and just, a faithful companion through life.",
  Pig: "generous and warm-hearted, embracing joy and comfort."
};

const numerologyMap = {
  1: "a natural-born leader, independent and ambitious.",
  2: "a peacemaker, intuitive and cooperative.",
  3: "a creative soul, joyful and expressive.",
  4: "practical and disciplined, a builder of strong foundations.",
  5: "freedom-loving and adventurous, embracing change.",
  6: "a nurturer, loving and responsible.",
  7: "a seeker of truth, introspective and wise.",
  8: "ambitious and powerful, focused on success.",
  9: "compassionate and humanitarian, guided by purpose."
};

function computeLifePath(dateStr) {
  if (!dateStr) return null;
  const digits = dateStr.replace(/\D/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
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
    <p>Dear <strong>${data.name || 'Friend'}</strong>, your soul resonates with the energy of a <strong>${wz}</strong> — ${westernMap[wz] || ''}</p>
    <p>Your love language, <strong>${love}</strong>, shows that ${loveLangMap[love] || ''}</p>
    <p>As a <strong>${cz}</strong> in Chinese astrology, you’re ${chineseMap[cz] || ''}</p>
    <p>Your Life Path number <strong>${lp}</strong> indicates you are ${numerologyMap[lp] || ''}</p>
  `;
}

function initFeedback() {
  emailjs.init('SV7ptjuNI88paiVbz');
  const form = document.getElementById('feedback-form');
  const status = document.getElementById('feedback-status');

  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = 'Sending…';
    emailjs.send(
      'service_ifo7026',
      'template_1rn1v8j',
      {
        email: form.email.value,
        page: form.page.value,
        rating: form.rating.value,
        message: form.message.value
      },
      'SV7ptjuNI88paiVbz'
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

window.addEventListener('load', () => {
  const btn = document.getElementById('downloadBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.classList.add('hide-for-pdf');
    window.scrollTo(0, 0);
    html2pdf()
      .set({
        margin: 0.5,
        filename: 'soulink-soul-results.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .from(document.getElementById('pdf-content'))
      .save()
      .finally(() => btn.classList.remove('hide-for-pdf'));
  });
});
