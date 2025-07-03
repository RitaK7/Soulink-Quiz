// src/results.js

// ——————————————————————————————————————————————————————————————————————
// 1. Description maps
const loveLangMap = {
  "Words of Affirmation": "You thrive on heartfelt compliments and spoken appreciation.",
  "Acts of Service":      "Actions speak louder than words—you feel loved when help arrives.",
  "Receiving Gifts":      "Tangible tokens show you how much you’re cherished.",
  "Quality Time":         "Undivided attention and shared moments fill your soul.",
  "Physical Touch":       "Touch is your language of connection and security."
};

const westernMap = {
  Aries:      "Energetic pioneer, courageous and direct.",
  Taurus:     "Steadfast builder, reliable and sensual.",
  Gemini:     "Versatile thinker, curious and quick-witted.",
  Cancer:     "Compassionate nurturer, intuitive and protective.",
  Leo:        "Charismatic leader, warm-hearted and creative.",
  Virgo:      "Analytical helper, detail-oriented and kind.",
  Libra:      "Harmonious diplomat, fair and relationship-focused.",
  Scorpio:    "Passionate investigator, intense and resourceful.",
  Sagittarius:"Adventurous philosopher, optimistic and honest.",
  Capricorn:  "Ambitious strategist, disciplined and responsible.",
  Aquarius:   "Visionary innovator, independent and humanitarian.",
  Pisces:     "Empathic dreamer, artistic and compassionate."
};

const chineseMap = {
  Rat:     "Quick-witted and resourceful, a natural problem-solver.",
  Ox:      "Strong and dependable, building stability through hard work.",
  Tiger:   "Bold and competitive, inspiring courage in others.",
  Rabbit:  "Gentle and elegant, valuing peace and kindness.",
  Dragon:  "Charismatic powerhouse, confident and enthusiastic.",
  Snake:   "Wise and graceful, trusting deep intuition.",
  Horse:   "Energetic adventurer, free-spirited and warm-hearted.",
  Goat:    "Calm artist, empathetic and serene.",
  Monkey:  "Playful trickster, witty and clever.",
  Rooster: "Observant organizer, hardworking and proud.",
  Dog:     "Loyal companion, honest and protective.",
  Pig:     "Generous soul, compassionate and laid-back."
};

const numerologyMap = {
  1:  "Leader and pioneer, forging new paths.",
  2:  "Diplomat and peacemaker, harmonious and sensitive.",
  3:  "Creative communicator, expressive and optimistic.",
  4:  "Practical builder, stable and disciplined.",
  5:  "Adventurous seeker, free-spirited and curious.",
  6:  "Nurturing caregiver, responsible and loving.",
  7:  "Introspective thinker, spiritual and analytical.",
  8:  "Executive powerhouse, ambitious and successful.",
  9:  "Humanitarian idealist, compassionate and wise."
};

// ——————————————————————————————————————————————————————————————————————
// 2. Utility to calculate life path (if missing)
function computeLifePath(dateStr) {
  if (!dateStr) return null;
  let sum = dateStr
    .replace(/-/g, '')
    .split('')
    .map(Number)
    .reduce((a, b) => a + b, 0);

  while (sum > 9 && ![11, 22].includes(sum)) {
    sum = sum
      .toString()
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  return sum;
}

// ——————————————————————————————————————————————————————————————————————
// 3. Render function
function loadAndRender() {
  const data = JSON.parse(localStorage.getItem('soulQuiz')) || {};

  // Basics
  document.getElementById('res-name').textContent       = data.name           || 'Friend';
  document.getElementById('res-birthdate').textContent  = data.birthdate      || '--';
  document.getElementById('res-connection').textContent = data.connectionType || '--';

  // Love Language
  const love = data.loveLanguage || '--';
  document.getElementById('res-loveLang').textContent  = love;
  document.getElementById('res-loveDesc').textContent  = loveLangMap[love]  || 'Description not available.';

  // Western Zodiac
  const wz = data.zodiacSign || '--';
  document.getElementById('res-astro').textContent       = wz;
  document.getElementById('res-astro-desc').textContent  = westernMap[wz]     || 'Description not available.';

  // Chinese Zodiac
  const cz = data.chineseSign || '--';
  document.getElementById('res-castro').textContent      = cz;
  document.getElementById('res-castro-desc').textContent = chineseMap[cz]     || 'Description not available.';

  // Numerology / Life Path
  let lp = data.lifePathNumber;
  if (!lp) {
    lp = computeLifePath(data.birthdate);
    data.lifePathNumber = lp;
    localStorage.setItem('soulQuiz', JSON.stringify(data));
  }
  document.getElementById('res-numerology').textContent = lp || '--';
  document.getElementById('res-num-desc').textContent   = numerologyMap[lp]   || 'Numerology meaning not available.';

  // AI Insight block
  const insightHTML = `
    <h3>🧠 AI Soul Insight</h3>
    <p>Dear <strong>${data.name}</strong>, your soul resonates with the energy of a <strong>${wz}</strong> — ${westernMap[wz]||''}</p>
    <p>Your love language, <strong>${love}</strong>, shows that ${loveLangMap[love]||''}</p>
    <p>As a <strong>${cz}</strong> in Chinese astrology, you’re ${chineseMap[cz]||''}</p>
    <p>Your Life Path number <strong>${lp}</strong> indicates you are ${numerologyMap[lp]||''}</p>
  `;
  document.getElementById('ai-analysis').innerHTML = insightHTML;
}

// ——————————————————————————————————————————————————————————————————————
// 4. Hook render + PDF download
document.addEventListener('DOMContentLoaded', () => {
  loadAndRender();
});

window.addEventListener('load', () => {
  const btn = document.getElementById('downloadBtn');
  btn.addEventListener('click', () => {
    // Hide the button so it won't appear in the PDF
    btn.style.display = 'none';

    // Ensure the top of content is visible
    window.scrollTo(0, 0);

    const element = document.getElementById('pdf-content');
    html2pdf()
      .set({
        margin:       0.5,
        filename:     'soulink-soul-results.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .from(element)
      .save()
      .finally(() => {
        // Restore the button's visibility
        btn.style.display = '';
      });
  });
});
