
// Soul Profile Rendering Script – Cleaned and Final

window.addEventListener("DOMContentLoaded", () => {
  const quiz = JSON.parse(localStorage.getItem("soulQuiz")  || "{}");
  const prof = JSON.parse(localStorage.getItem("profile")   || "{}");
  const el   = document.getElementById("soul-profile");

  if (!quiz.name) {
    el.innerHTML = `<p>No profile data. <a href="quiz.html">Take the Quiz</a> first.</p>`;
    return;
  }

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

  const westernDescriptions = {
    Sagittarius: "Sagittarians are free spirits and adventurers, always chasing truth and wisdom."
  };
  const loveLanguageDescriptions = {
    "Acts of Service": "Actions speak louder than words – you love when someone lightens your load."
  };
  const chineseDescriptions = {
    Rat: "Rats are clever and resourceful, with quick minds and charming personalities."
  };
  const lifePathDescriptions = {
    7: "Life Path 7: You’re a seeker, analytical and spiritual."
  };

  const west = getWesternZodiac(quiz.birthdate);
  const chi  = getChineseZodiac(quiz.birthdate);
  const life = getLifePathNumber(quiz.birthdate);

  el.innerHTML = `
    <section class="card">
      <h3>🖼️ Your Photos</h3>
      <div style="display:flex; flex-wrap:wrap; gap:1rem;">
        ${prof.photo1? `<img src="${prof.photo1}" class="preview">` : ""}
        ${prof.photo2? `<img src="${prof.photo2}" class="preview">` : ""}
        ${prof.photo3? `<img src="${prof.photo3}" class="preview">` : ""}
      </div>
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
