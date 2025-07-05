// src/results.js

import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';

// ——————————————————————————————————————————————————————————————————————
// 1. Description maps
const loveLangMap = {
  "Words of Affirmation": "You thrive on heartfelt compliments and spoken appreciation.",
  "Acts of Service":      "Actions speak louder than words—you feel loved when help arrives.",
  "Receiving Gifts":      "Tangible tokens show you how much you’re cherished.",
  "Quality Time":         "Undivided attention and shared moments fill your soul.",
  "Physical Touch":       "Touch is your language of connection and security."
};
const westernMap = { /* …same as before… */ };
const chineseMap = { /* …same as before… */ };
const numerologyMap = { /* …same as before… */ };

// Utility to calculate life path
function computeLifePath(dateStr) {
  if (!dateStr) return null;
  let sum = dateStr.replace(/-/g,'').split('').map(Number).reduce((a,b)=>a+b,0);
  while (sum>9 && ![11,22].includes(sum)) {
    sum = sum.toString().split('').map(Number).reduce((a,b)=>a+b,0);
  }
  return sum;
}

// Render all soul results
function loadAndRender() {
  const data = JSON.parse(localStorage.getItem('soulQuiz'))||{};

  document.getElementById('res-name').textContent       = data.name||'Friend';
  document.getElementById('res-birthdate').textContent  = data.birthdate||'--';
  document.getElementById('res-connection').textContent = data.connectionType||'--';

  const love = data.loveLanguage||'--';
  document.getElementById('res-loveLang').textContent  = love;
  document.getElementById('res-loveDesc').textContent  = loveLangMap[love]||'Description not available.';

  const wz = data.zodiacSign||'--';
  document.getElementById('res-astro').textContent      = wz;
  document.getElementById('res-astro-desc').textContent = westernMap[wz]||'Description not available.';

  const cz = data.chineseSign||'--';
  document.getElementById('res-castro').textContent      = cz;
  document.getElementById('res-castro-desc').textContent = chineseMap[cz]||'Description not available.';

  let lp = data.lifePathNumber;
  if (!lp) {
    lp = computeLifePath(data.birthdate);
    data.lifePathNumber = lp;
    localStorage.setItem('soulQuiz',JSON.stringify(data));
  }
  document.getElementById('res-numerology').textContent = lp||'--';
  document.getElementById('res-num-desc').textContent   = numerologyMap[lp]||'Numerology meaning not available.';

  document.getElementById('ai-analysis').innerHTML = `
    <h3>🧠 AI Soul Insight</h3>
    <p>Dear <strong>${data.name}</strong>, your soul resonates with the energy of a <strong>${wz}</strong> — ${westernMap[wz]||''}</p>
    <p>Your love language, <strong>${love}</strong>, shows that ${loveLangMap[love]||''}</p>
    <p>As a <strong>${cz}</strong> in Chinese astrology, you’re ${chineseMap[cz]||''}</p>
    <p>Your Life Path number <strong>${lp}</strong> indicates you are ${numerologyMap[lp]||''}</p>
  `;
}

// Initialize EmailJS and feedback form
function initFeedback() {
  emailjs.init('SV7ptjuNI88paiVbz'); // your public key

  const form = document.getElementById('feedback-form');
  const status = document.getElementById('feedback-status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = 'Sending…';
    emailjs.send('service_ifo7026','feedback_request',{
      email:   form.email.value,
      page:    form.page.value,
      rating:  form.rating.value,
      message: form.message.value
    })
    .then(() => {
      status.textContent = '✅ Thank you for your feedback!';
      form.reset();
    })
    .catch(err => {
      console.error('EmailJS error:',err);
      status.textContent = '❌ Failed to send feedback. Please try again later.';
    });
  });
}

// Hook PDF download and rendering
window.addEventListener('DOMContentLoaded', () => {
  loadAndRender();
  initFeedback();
});

window.addEventListener('load', () => {
  const btn = document.getElementById('downloadBtn');
  btn.addEventListener('click', () => {
    btn.style.display = 'none';
    window.scrollTo(0,0);
    html2pdf().set({
      margin:0.5, filename:'soulink-soul-results.pdf',
      image:{ type:'jpeg',quality:0.98 },
      html2canvas:{ scale:2 },
      jsPDF:{ unit:'in',format:'letter',orientation:'portrait' }
    })
    .from(document.getElementById('pdf-content'))
    .save()
    .finally(()=> btn.style.display = '');
  });
});
