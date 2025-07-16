
// my-soul.js

function getSoulData() {
  const quiz = JSON.parse(localStorage.getItem('soulQuiz')) || {};
  const profile = JSON.parse(localStorage.getItem('profile')) || {};

  const name = quiz.name || 'Soul Seeker';
  const birthdate = quiz.birthdate || 'Unknown';
  const zodiac = quiz.zodiacSign || 'Unknown';
  const chinese = quiz.chineseSign || 'Unknown';
  const loveLang = quiz.loveLanguage || 'Unknown';
  const lifePath = quiz.lifePath || 'Unknown';
  const hobbies = quiz.hobbies || '—';
  const values = quiz.values || '—';
  const aboutMe = profile.aboutMe || 'Not shared yet';
  const type = quiz.relationType || 'Romantic or Friendship';
  const country = quiz.country || '—';
  const photo1 = profile.photo1 || '';
  const photo2 = profile.photo2 || '';

  const insights = {
    "Words of Affirmation": "You thrive on kind words and meaningful praise.",
    "Acts of Service": "You show you care through thoughtful help and kind deeds.",
    "Receiving Gifts": "You appreciate symbolic gestures of love and thought.",
    "Quality Time": "You value undivided attention and shared moments.",
    "Physical Touch": "You connect through closeness and physical presence.",
    "Unknown": "Your love language is still a mystery to be explored."
  };

  const westernZodiac = {
    "Aries": "You are bold, energetic, and love challenges.",
    "Taurus": "You value stability, loyalty, and sensory pleasures.",
    "Gemini": "You are curious, witty, and love communication.",
    "Cancer": "You are deeply intuitive, caring, and home-loving.",
    "Leo": "You are creative, passionate, and love to be admired.",
    "Virgo": "You are practical, analytical, and detail-oriented.",
    "Libra": "You value harmony, beauty, and social connections.",
    "Scorpio": "You are intense, powerful, and love transformation.",
    "Sagittarius": "You are adventurous, idealistic, and crave freedom.",
    "Capricorn": "You are disciplined, ambitious, and value success.",
    "Aquarius": "You are visionary, quirky, and value innovation.",
    "Pisces": "You are sensitive, dreamy, and deeply empathetic.",
    "Unknown": "Zodiac traits await your discovery."
  };

  const chineseZodiac = {
    "Rat": "Clever, quick-witted, resourceful.",
    "Ox": "Strong, reliable, fair.",
    "Tiger": "Brave, confident, unpredictable.",
    "Rabbit": "Gentle, elegant, alert.",
    "Dragon": "Strong, charismatic, lucky.",
    "Snake": "Wise, mysterious, determined.",
    "Horse": "Energetic, independent, impatient.",
    "Goat": "Kind, calm, creative.",
    "Monkey": "Smart, curious, versatile.",
    "Rooster": "Hardworking, observant, confident.",
    "Dog": "Loyal, honest, cautious.",
    "Pig": "Compassionate, generous, diligent.",
    "Unknown": "The stars are silent for now."
  };

  const profileHtml = `
    <div class="card highlight">
      <h3>${name}</h3>
      <p><strong>Birthdate:</strong> ${birthdate}</p>
      <p><strong>Relation Type:</strong> ${type}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Hobbies:</strong> ${hobbies}</p>
      <p><strong>Values:</strong> ${values}</p>
      <p><strong>About Me:</strong> ${aboutMe}</p>
    </div>
    <div class="card">
      <h3>🖼️ Your Photos</h3>
      ${photo1 ? `<img src="${photo1}" class="preview">` : ''}
      ${photo2 ? `<img src="${photo2}" class="preview">` : ''}
    </div>
    <div class="card">
      <h3>💖 Love Language Insight</h3>
      <p>${insights[loveLang]}</p>
    </div>
    <div class="card">
      <h3>♓ Western Zodiac Insight</h3>
      <p>${westernZodiac[zodiac]}</p>
    </div>
    <div class="card">
      <h3>🐉 Chinese Zodiac Insight</h3>
      <p>${chineseZodiac[chinese]}</p>
    </div>
    <div class="card">
      <h3>🔢 Life Path Number</h3>
      <p>${lifePath}</p>
    </div>
  `;

  document.getElementById('soul-profile').innerHTML = profileHtml;
}

window.addEventListener('DOMContentLoaded', getSoulData);
