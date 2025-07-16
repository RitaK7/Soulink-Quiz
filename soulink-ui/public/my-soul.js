// ─── PAGALBINĖS FUNKCIJOS ────────────────────────────────────────

// Iš localStorage gauname datas arba gražiname tuščią objektą
function getData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}

// Western zodiakas pagal gimimo datą
function getWesternZodiac(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const day = d, month = m;
  // Šiek tiek apkarpytas zodiako logika
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Aries';
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Taurus';
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'Gemini';
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'Cancer';
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Leo';
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Virgo';
  if ((month == 9 && day >= 23) || (month ==10 && day <= 22)) return 'Libra';
  if ((month ==10 && day >= 23) || (month ==11 && day <= 21)) return 'Scorpio';
  if ((month ==11 && day >= 22) || (month ==12 && day <= 21)) return 'Sagittarius';
  if ((month ==12 && day >= 22) || (month == 1 && day <= 19)) return 'Capricorn';
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'Aquarius';
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'Pisces';
  return '';
}

// Chinese zodiac
function getChineseZodiac(dateStr) {
  if (!dateStr) return '';
  const year = Number(dateStr.split('-')[0]);
  const animals = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
  return animals[(year - 4) % 12];
}

// Life Path skaičius
function getLifePathNumber(dateStr) {
  if (!dateStr) return '';
  let sum = dateStr.replace(/-/g,'').split('')
                   .map(n => parseInt(n,10))
                   .reduce((a,b)=>a+b,0);
  while (sum > 9 && ![11,22,33].includes(sum)) {
    sum = sum.toString().split('').map(n=>+n).reduce((a,b)=>a+b,0);
  }
  return sum;
}

// Aprašymai
const loveLangMap = {
  "Words of Affirmation":"You thrive on heartfelt compliments and spoken appreciation.",
  "Acts of Service":"Actions speak louder than words—you feel loved when help arrives.",
  "Receiving Gifts":"Tangible tokens show you how much you’re cherished.",
  "Quality Time":"Undivided attention and shared moments fill your soul.",
  "Physical Touch":"Touch is your language of connection and security."
};
const zodiacDesc = {
  Aries:"bold and ambitious, driven by passion.",
  Taurus:"grounded and reliable, with a love for beauty.",
  Gemini:"curious and adaptable, thrives on communication.",
  Cancer:"deeply intuitive and emotionally in tune.",
  Leo:"radiates confidence, charisma, and creativity.",
  Virgo:"meticulous, thoughtful, and practical.",
  Libra:"balanced and fair, seeks harmony in all things.",
  Scorpio:"intense and mysterious, driven by deep emotions.",
  Sagittarius:"adventurous and optimistic, seeking freedom and wisdom.",
  Capricorn:"disciplined and ambitious, striving for success.",
  Aquarius:"innovative thinker, humanitarian at heart.",
  Pisces:"deeply empathetic, artistic, and spiritual."
};
const chineseDesc = {
  Rat:"quick-witted and resourceful, often finding success in creative ways.",
  Ox:"strong, dependable, and trustworthy.",
  Tiger:"brave, competitive, and unpredictable.",
  Rabbit:"gentle, quiet, and elegant.",
  Dragon:"confident, intelligent, and enthusiastic.",
  Snake:"wise, discreet, and strategic.",
  Horse:"energetic, independent, and impatient.",
  Goat:"gentle-hearted and creative, sometimes moody.",
  Monkey:"clever, curious, and mischievous.",
  Rooster:"observant, hardworking, and courageous.",
  Dog:"loyal, honest, and prudent.",
  Pig:"generous, compassionate, and diligent."
};
const lifePathDescriptions = {
  1:"a trailblazer and independent spirit.",
  2:"a peacemaker yearning for balance.",
  3:"a creative communicator full of joy.",
  4:"a solid foundation builder.",
  5:"a freedom seeker and explorer.",
  6:"a nurturer and caregiver at heart.",
  7:"a seeker of truth, introspective and wise.",
  8:"an achiever driven by abundance.",
  9:"a humanitarian with a big vision."
};


// ─── PAKEITIMAS: RODYTI PROFILĮ ─────────────────────────────────  
window.addEventListener('DOMContentLoaded', () => {
  const profile = getData('soulQuiz');    // žmogiški duomenys
  const extra   = getData('profile');     // papildomi laukai
  const container = document.getElementById('soul-profile');

  if (!profile.name) {
    container.innerHTML = `
      <p>No profile found. <a href="quiz.html">Take the Quiz</a> first.</p>
    `;
    return;
  }

  const westSign = getWesternZodiac(profile.birthdate);
  const chiSign  = getChineseZodiac(profile.birthdate);
  const lifeNum  = getLifePathNumber(profile.birthdate);

  container.innerHTML = `
    <section class="card highlight">
      <h2>Welcome, ${profile.name}!</h2>
      <p><em>Your soul profile at a glance</em></p>
    </section>

    <section class="card">
      <h3>📚 Personal Details</h3>
      <p><strong>Birth Date:</strong> ${profile.birthdate}</p>
      <p><strong>About Me:</strong> ${extra.bio || extra.about || '—'}</p>
    </section>

    <section class="card">
      <h3>🔗 What You Seek</h3>
      <p><strong>Connection Type:</strong> ${profile.goal || '—'}</p>
      <p><strong>Love Language:</strong> ${profile.loveLanguage || '—'}</p>
      <p>${loveLangMap[profile.loveLanguage] || ''}</p>
    </section>

    <section class="card">
      <h3>🎯 Hobbies & Core Values</h3>
      <p><strong>Hobbies:</strong> ${(extra.hobbies||[]).join(', ') || '—'}</p>
      <p><strong>Core Values:</strong> ${(extra.values||[]).join(', ') || '—'}</p>
    </section>

    <section class="card">
      <h3>✨ Western Zodiac: ${westSign}</h3>
      <p>${zodiacDesc[westSign] || ''}</p>
      <h3>✨ Chinese Zodiac: ${chiSign}</h3>
      <p>${chineseDesc[chiSign] || ''}</p>
      <h3>🔢 Life Path Number: ${lifeNum}</h3>
      <p>${lifePathDescriptions[lifeNum] || ''}</p>
    </section>

    <!-- NUOTRAUKOS PO VISOS PROGR. -->
    <section class="card">
      <h3>🖼️ Your Photos</h3>
      ${extra.photo1 ? `<img src="${extra.photo1}" class="preview">` : ''}
      ${extra.photo2 ? `<img src="${extra.photo2}" class="preview">` : ''}
      ${extra.photo3 ? `<img src="${extra.photo3}" class="preview">` : ''}
    </section>

    <div class="buttons">
      <a href="edit-profile.html" class="btn">Edit Profile</a>
      <a href="soul-chart.html"     class="btn">Soul Chart</a>
      <a href="soul-coach.html"     class="btn">Soul Coach</a>
    </div>

    <p class="premium-note">
      🔒 Some features are exclusive to <strong>Soulink Premium</strong>.
      <a href="signup.html">Upgrade now.</a>
    </p>
  `;
});
