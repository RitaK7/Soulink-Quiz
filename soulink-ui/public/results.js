
function loadAndRender() {
  const data = JSON.parse(localStorage.getItem("soulQuiz")) || {};

  function set(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  set("name", data.name || "Soul Seeker");
  set("birthdate", data.birthdate || "Unknown");
  set("connectionType", data.connectionType || "Unknown");
  set("loveLanguage", data.loveLanguage || "Unknown");
  set("zodiacSign", data.zodiacSign || "Unknown");
  set("chineseSign", data.chineseSign || "Unknown");
  set("lifePathNumber", data.lifePathNumber || "Unknown");

  const loveDescriptions = {
    "Words of Affirmation": "You thrive on kind words and meaningful praise.",
    "Acts of Service": "Actions speak louder than words—you feel loved when help arrives.",
    "Receiving Gifts": "Gifts are a symbol of love and thoughtfulness for you.",
    "Quality Time": "You value undivided attention and shared moments.",
    "Physical Touch": "You feel most connected through physical presence and touch."
  };

  const zodiacDescriptions = {
    "Aries": "Bold, ambitious, and full of energy.",
    "Taurus": "Reliable, patient, and devoted.",
    "Gemini": "Curious, adaptable, and expressive.",
    "Cancer": "Deeply intuitive and sentimental.",
    "Leo": "Passionate, generous, and warm-hearted.",
    "Virgo": "Logical, practical, and detail-oriented.",
    "Libra": "Charming, diplomatic, and balanced.",
    "Scorpio": "Intense, mysterious, and powerful.",
    "Sagittarius": "Free-spirited, adventurous, and wise.",
    "Capricorn": "Disciplined, responsible, and ambitious.",
    "Aquarius": "Innovative, independent, and humanitarian.",
    "Pisces": "Empathetic, artistic, and wise."
  };

  const chineseDescriptions = {
    "Rat": "Clever, charming, and sociable.",
    "Ox": "Strong, reliable, and trustworthy.",
    "Tiger": "Brave, competitive, and confident.",
    "Rabbit": "Gentle, quiet, and kind.",
    "Dragon": "Energetic, fearless, and charismatic.",
    "Snake": "Wise, elegant, and enigmatic.",
    "Horse": "Energetic, independent, and impatient.",
    "Goat": "Calm, gentle, and sympathetic.",
    "Monkey": "Witty, curious, and playful.",
    "Rooster": "Hardworking, observant, and confident.",
    "Dog": "Loyal, honest, and kind.",
    "Pig": "Generous, diligent, and compassionate."
  };

  const lifePathDescriptions = {
    "1": "You are a leader, independent and self-sufficient.",
    "2": "You are a peacemaker, deeply intuitive and supportive.",
    "3": "You are a creative, optimistic communicator.",
    "4": "You are practical, disciplined, and hardworking.",
    "5": "You are a free spirit, curious and adventurous.",
    "6": "You are nurturing, responsible and loving.",
    "7": "A thinker, deeply introspective and wise.",
    "8": "You are ambitious, goal-oriented and efficient.",
    "9": "You are compassionate, generous and wise."
  };

  set("loveDescription", loveDescriptions[data.loveLanguage] || "Description here...");
  set("zodiacDescription", zodiacDescriptions[data.zodiacSign] || "Description here...");
  set("chineseDescription", chineseDescriptions[data.chineseSign] || "Description here...");
  set("lifePathDescription", lifePathDescriptions[data.lifePathNumber] || "Description here...");

  const aiText = `Dear ${data.name || "Soul Seeker"}, your soul resonates with the energy of a ${data.zodiacSign || "mystery"}.
  Your love language, ${data.loveLanguage}, shows that ${loveDescriptions[data.loveLanguage] || "you have a unique way of expressing affection."}
  As a ${data.chineseSign} in Chinese astrology, ${chineseDescriptions[data.chineseSign] || "you possess unique characteristics."}
  Your Life Path number ${data.lifePathNumber} indicates ${lifePathDescriptions[data.lifePathNumber] || "you have a unique life mission."}`;

  set("aiInsight", aiText);
}

window.onload = loadAndRender;
