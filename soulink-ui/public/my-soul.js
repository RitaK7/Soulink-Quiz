// ─── APRAŠAI ──────────────────────────────────────────────────────
const westernDescriptions = {
  Aries:      "Bold and ambitious, driven by passion.",
  Taurus:     "Grounded and reliable, with a love for beauty.",
  Gemini:     "Curious and adaptable, thriving on communication.",
  Cancer:     "Deeply intuitive and emotionally in tune.",
  Leo:        "Radiates confidence, charisma, and creativity.",
  Virgo:      "Meticulous, thoughtful, and practical.",
  Libra:      "Balanced and fair, seeking harmony in all things.",
  Scorpio:    "Intense and mysterious, driven by deep emotions.",
  Sagittarius:"Adventurous and optimistic, seeking freedom and wisdom.",
  Capricorn:  "Disciplined and ambitious, striving for success.",
  Aquarius:   "Innovative thinker, humanitarian at heart.",
  Pisces:     "Deeply empathetic, artistic, and spiritual."
};

const loveLanguageDescriptions = {
  "Words of Affirmation": "You thrive on heartfelt compliments and spoken appreciation.",
  "Acts of Service":      "Actions speak louder than words—you feel loved when help arrives.",
  "Receiving Gifts":      "Tangible tokens show you how much you’re cherished.",
  "Quality Time":         "Undivided attention and shared moments fill your soul.",
  "Physical Touch":       "Touch is your language of connection and security."
};

const chineseDescriptions = {
  Rat:    "Quick-witted and resourceful, often finding success in creative ways.",
  Ox:     "Strong, dependable, and trustworthy.",
  Tiger:  "Brave, competitive, and unpredictable.",
  Rabbit: "Gentle, quiet, and elegant.",
  Dragon: "Confident, intelligent, and enthusiastic.",
  Snake:  "Wise, discreet, and strategic.",
  Horse:  "Energetic, independent, and impatient.",
  Goat:   "Gentle-hearted and creative, sometimes moody.",
  Monkey: "Clever, curious, and mischievous.",
  Rooster:"Observant, hardworking, and courageous.",
  Dog:    "Loyal, honest, and prudent.",
  Pig:    "Generous, compassionate, and diligent."
};

const lifePathDescriptions = {
  1: "A trailblazer and independent spirit.",
  2: "A peacemaker yearning for balance.",
  3: "A creative communicator full of joy.",
  4: "A solid foundation builder.",
  5: "A freedom seeker and explorer.",
  6: "A nurturer and caregiver at heart.",
  7: "A seeker of truth, introspective and wise.",
  8: "An achiever driven by abundance.",
  9: "A humanitarian with a big vision."
};

// ─── PAGALBINĖS FUNKCIJOS ────────────────────────────────────────
function getWesternZodiac(dob) {
  const [year, month, day] = dob.split('-').map(Number);
  const m = month, d = day;
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Aquarius';
  if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) return 'Pisces';
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Aries';
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Taurus';
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'Gemini';
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'Cancer';
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Leo';
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Virgo';
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'Libra';
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'Scorpio';
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'Sagittarius';
  return 'Capricorn';
}

function getChineseZodiac(dob) {
  const year = Number(dob.split('-')[0]);
  const animals = [
    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
  ];
  return animals[(year - 4) % 12];
}

function getLifePathNumber(dob) {
  let sum = dob.replace(/-/g, '').split('')
               .map(n => +n).reduce((a, b) => a + b, 0);
  while (sum > 9 && ![11,22,33].includes(sum)) {
    sum = sum.toString().split('')
             .map(n => +n).reduce((a, b) => a + b, 0);
  }
  return sum;
}

// ─── RENDERINIMAS ───────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const soulQuiz = JSON.parse(localStorage.getItem('soulQuiz') || '{}');
  const profile  = JSON.parse(localStorage.getItem('profile')  || '{}');

  // Sinchronizuojame birthdate lauką
  if (profile.birthday) profile.birthdate = profile.birthday;

  // Merginame duomenis (redaguoti užgožia quiz)
  const data = { ...soulQuiz, ...profile };

  // Jeigu nėra vardo, rodome nukreipimą
  if (!data.name) {
    document.getElementById('soul-profile').innerHTML =
      '<p>No profile data found. <a href="edit-profile.html">Edit your profile first.</a></p>';
    return;
  }

  // Apskaičiuojame ženklus ir skaičių
  const western = getWesternZodiac(data.birthdate);
  const chinese = getChineseZodiac(data.birthdate);
  const life     = getLifePathNumber(data.birthdate);

  // Sudedame galutinį HTML
  document.getElementById('soul-profile').innerHTML = `
    <section class="card highlight">
      <h2>Welcome, ${data.name}!</h2>
      <p><em>Your soul profile at a glance</em></p>
    </section>

    <section class="card">
      <h3>📚 Personal Details</h3>
      <p><strong>Birth Date:</strong> ${data.birthdate}</p>
      <p><strong>About Me:</strong> ${data.bio || '—'}</p>
    </section>

    <section class="card">
      <h3>🔗 What You Seek</h3>
      <p><strong>Connection Type:</strong> ${data.connectionType || '—'}</p>
      <p><strong>Love Language:</strong> ${data.loveLanguage || '—'}</p>
      <p>${loveLanguageDescriptions[data.loveLanguage] || ''}</p>
    </section>

    <section class="card">
      <h3>🎯 Hobbies & Core Values</h3>
      <p><strong>Hobbies:</strong> ${(data.hobbies || []).join(', ') || '—'}</p>
      <p><strong>Core Values:</strong> ${(data.values  || []).join(', ') || '—'}</p>
    </section>

    <section class="card">
      <h3>✨ Western Zodiac: ${western}</h3>
      <p>${westernDescriptions[western]}</p>
      <h3>✨ Chinese Zodiac: ${chinese}</h3>
      <p>${chineseDescriptions[chinese]}</p>
      <h3>🔢 Life Path Number: ${life}</h3>
      <p>${lifePathDescriptions[life]}</p>
    </section>

    <div class="buttons">
      <a href="edit-profile.html" class="btn">Edit Profile</a>
      <a href="soul-chart.html"    class="btn">Soul Chart</a>
      <a href="soul-coach.html"    class="btn">Soul Coach</a>
    </div>

    <p class="premium-note">
      🔒 Some features are exclusive to <strong>Soulink Premium</strong>. 
      <a href="signup.html">Upgrade now.</a>
    </p>
  `;
});
