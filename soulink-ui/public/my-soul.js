// Zodiako, meiles kalbos, Kinų zodiako ir numerologijos aprašymai
const westernDescriptions = { ... };
const loveLanguageDescriptions = { ... };
const chineseDescriptions = { ... };
const lifePathDescriptions = { ... };

function getWesternZodiac(dateStr) { /* ... */ }
function getChineseZodiac(dateStr) { /* ... */ }
function getLifePathNumber(dateStr) { /* ... */ }

window.addEventListener('DOMContentLoaded', () => {
  // Load quiz and profile data
  const soulData = JSON.parse(localStorage.getItem('soulQuiz') || '{}');
  const extra    = JSON.parse(localStorage.getItem('profile')  || '{}');

  // Map birthday to birthdate for consistency
  if (extra.birthday) {
    extra.birthdate = extra.birthday;
  }

  // Merge data, giving precedence to edits
  const profile = { ...soulData, ...extra };
  
  const c = document.getElementById('soul-profile');

  if (!profile.name) {
    c.innerHTML = '<p>No data found. <a href="quiz.html">Take the Quiz</a> first.</p>';
    return;
  }

  // Calculate values
  const west  = getWesternZodiac(profile.birthdate);
  const china = getChineseZodiac(profile.birthdate);
  const life  = getLifePathNumber(profile.birthdate);

  // Render HTML
  c.innerHTML = `
    <section class="card">
      <h3>🖼️ Your Photos</h3>
      ${profile.photo1?`<img src="${profile.photo1}" class="preview">`:''}
      ${profile.photo2?`<img src="${profile.photo2}" class="preview">`:''}
      ${profile.photo3?`<img src="${profile.photo3}" class="preview">`:''}
    </section>

    <section class="card highlight">
      <h2>Welcome, ${profile.name}!</h2>
      <p><em>Your soul profile at a glance</em></p>
    </section>

    <section class="card">
      <h3>📚 Personal Details</h3>
      <p><strong>Birth Date:</strong> ${profile.birthdate}</p>
      <p><strong>About Me:</strong> ${profile.bio||'—'}</p>
    </section>

    <section class="card">
      <h3>🔗 What You Seek</h3>
      <p><strong>Connection Type:</strong> ${profile.connectionType||'—'}</p>
      <p><strong>Love Language:</strong> ${profile.loveLanguage||'—'}</p>
      <p>${loveLanguageDescriptions[profile.loveLanguage]||''}</p>
    </section>

    <section class="card">
      <h3>🎯 Hobbies & Core Values</h3>
      <p><strong>Hobbies:</strong> ${(profile.hobbies||[]).join(', ')||'—'}</p>
      <p><strong>Core Values:</strong> ${(profile.values||[]).join(', ')||'—'}</p>
    </section>

    <section class="card">
      <h3>✨ Western Zodiac: ${west}</h3>
      <p>${westernDescriptions[west]||''}</p>
      <h3>✨ Chinese Zodiac: ${china}</h3>
      <p>${chineseDescriptions[china]||''}</p>
      <h3>🔢 Life Path Number: ${life}</h3>
      <p>${lifePathDescriptions[life]||''}</p>
    </section>

    <div class="buttons">
      <a href="edit-profile.html" class="btn">Edit Profile</a>
      <a href="soul-chart.html" class="btn">Soul Chart</a>
      <a href="soul-coach.html" class="btn">Soul Coach</a>
    </div>

    <p class="premium-note">🔒 Some features are exclusive to <strong>Soulink Premium</strong>. <a href="signup.html">Upgrade now.</a></p>
  `;
});
