// ─── DATA DESCRIPTIONS ────────────────────────────────────────────
const westernDescriptions = {
  Aries:        "As an Aries, you’re courageous and energetic – a true pioneer who leads with passion.",
  Taurus:       "Taurus souls are grounded and reliable. You cherish comfort and beauty in every form.",
  Gemini:       "Geminis are curious communicators, adaptable and always seeking new ideas.",
  Cancer:       "Cancer signs are nurturing and intuitive, placing family and emotion above all.",
  Leo:          "Leos shine with confidence and warmth, natural-born leaders with generous hearts.",
  Virgo:        "Virgos are detail-oriented and analytical, striving for perfection in every task.",
  Libra:        "Libras value harmony and beauty, skilled at mediation and building relationships.",
  Scorpio:      "Scorpios are intense and magnetic, digging deep into the mysteries of life.",
  Sagittarius:  "Sagittarians are free spirits and adventurers, always chasing truth and wisdom.",
  Capricorn:    "Capricorns are disciplined and ambitious, climbing steadily toward long-term goals.",
  Aquarius:     "Aquarians are innovative thinkers and humanitarians, valuing freedom and progress.",
  Pisces:       "Pisceans are empathetic dreamers, guided by emotion and artistic inspiration."
};

const loveLanguageDescriptions = {
  "Words of Affirmation": "You thrive on verbal appreciation and heartfelt compliments.",
  "Acts of Service":      "Actions speak louder than words – you love when someone lightens your load.",
  "Receiving Gifts":      "Tangible tokens of love mean the world to you and show you’re cherished.",
  "Quality Time":         "Undivided attention and shared experiences fill your cup.",
  "Physical Touch":       "Touch is your primary language of affection and security."
};

const chineseDescriptions = {
  Rat:     "Rats are clever and resourceful, with quick minds and charming personalities.",
  Ox:      "Oxen are strong and dependable, building their lives on hard work and honesty.",
  Tiger:   "Tigers are brave and competitive, drawing admiration with their daring spirit.",
  Rabbit:  "Rabbits are gentle and compassionate, seeking peace and comfort in relationships.",
  Dragon:  "Dragons are charismatic and confident, destined for leadership and creativity.",
  Snake:   "Snakes are wise and enigmatic, trusting their intuition to guide them.",
  Horse:   "Horses are energetic and free-spirited, loving adventure and independence.",
  Goat:    "Goats are calm and artistic, appreciating beauty and deep connections.",
  Monkey:  "Monkeys are witty and playful, always the life of the party.",
  Rooster: "Roosters are observant and hardworking, with a strong sense of pride.",
  Dog:     "Dogs are loyal and honest, devoted friends who protect and support you.",
  Pig:     "Pigs are generous and warm-hearted, valuing comfort and good company."
};

const lifePathDescriptions = {
  1:  "Life Path 1: You’re a natural-born leader, independent and ambitious.",
  2:  "Life Path 2: You’re a peacemaker, intuitive and diplomatic.",
  3:  "Life Path 3: You’re a creative communicator, optimistic and expressive.",
  4:  "Life Path 4: You’re a builder, practical and disciplined.",
  5:  "Life Path 5: You’re an adventurer, freedom-loving and adaptable.",
  6:  "Life Path 6: You’re a nurturer, responsible and caring.",
  7:  "Life Path 7: You’re a seeker, analytical and spiritual.",
  8:  "Life Path 8: You’re an executive, driven and successful.",
  9:  "Life Path 9: You’re a humanitarian, generous and compassionate.",
  11: "Life Path 11 (Master Teacher): You have high ideals and deep intuition.",
  22: "Life Path 22 (Master Builder): You can turn dreams into reality on a grand scale."
};

// ─── ASTRO & NUMEROLOGY ────────────────────────────────────────────
function getWesternZodiac(dateStr) {
  const d = new Date(dateStr), m = d.getMonth() + 1, day = d.getDate();
  if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return "Aries";
  if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return "Taurus";
  if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return "Gemini";
  if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return "Cancer";
  if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return "Leo";
  if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return "Virgo";
  if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return "Libra";
  if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return "Scorpio";
  if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return "Sagittarius";
  if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return "Capricorn";
  if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return "Aquarius";
  if ((m === 2 && day >= 19) || (m === 3 && day <= 20)) return "Pisces";
  return "Unknown";
}

function getChineseZodiac(dateStr) {
  const year = new Date(dateStr).getFullYear();
  return ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"][(year - 1900) % 12];
}

function getLifePathNumber(dateStr) {
  let sum = dateStr.replace(/-/g, "").split("").map(Number).reduce((a,b)=>a+b,0);
  while (sum > 9 && ![11,22].includes(sum)) {
    sum = sum.toString().split("").map(Number).reduce((a,b)=>a+b,0);
  }
  return sum;
}

// ─── RENDER ONCE READY ─────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  const quiz = JSON.parse(localStorage.getItem("soulQuiz")  || "{}");
  const prof = JSON.parse(localStorage.getItem("profile")   || "{}");
  const el   = document.getElementById("soul-profile");

  if (!quiz.name) {
    el.innerHTML = `<p>No profile data. <a href="quiz.html">Take the Quiz</a> first.</p>`;
    return;
  }

  const west = getWesternZodiac(quiz.birthdate);
  const chi  = getChineseZodiac(quiz.birthdate);
  const life = getLifePathNumber(quiz.birthdate);

  el.innerHTML = `
    <section class="card">
      <h3>🖼️ Your Photos</h3>
      ${prof.photo1? `<img src="${prof.photo1}" class="preview">` : ""}
      ${prof.photo2? `<img src="${prof.photo2}" class="preview">` : ""}
      ${prof.photo3? `<img src="${prof.photo3}" class="preview">` : ""}
    </section>

    <section class="card highlight">
      <h2>Welcome, ${quiz.name}!</h2>
      <p><em>Your soul profile at a glance</em></p>
    </section>

    <section class="card">
      <h3>📚 Personal Details</h3>
      <p><strong>Birth Date:</strong> ${quiz.birthdate}</p>
      <p><strong>About Me:</strong> ${prof.bio || "—"}</p>
    </section>

    <section class="card">
      <h3>🔗 What You Seek</h3>
      <p><strong>Connection Type:</strong> ${quiz.connectionType || "—"}</p>
      <p><strong>Love Language:</strong> ${quiz.loveLanguage || "—"}</p>
      <p>${loveLanguageDescriptions[quiz.loveLanguage] || ""}</p>
    </section>

    <section class="card">
      <h3>🎯 Hobbies & Core Values</h3>
      <p><strong>Hobbies:</strong> ${(quiz.hobbies||[]).join(", ") || "—"}</p>
      <p><strong>Core Values:</strong> ${(quiz.values||[]).join(", ") || "—"}</p>
    </section>

    <section class="card">
      <h3>✨ Western Zodiac: ${west}</h3>
      <p>${westernDescriptions[west] || ""}</p>
      <h3>🐉 Chinese Zodiac: ${chi}</h3>
      <p>${chineseDescriptions[chi] || ""}</p>
      <h3>🔢 Life Path Number: ${life}</h3>
      <p>${lifePathDescriptions[life] || ""}</p>
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
