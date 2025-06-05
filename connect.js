// AI-generated test profiles
const testProfiles = [
  {
    name: "Luna",
    image: "https://i.pravatar.cc/150?img=12",
    relationshipType: "friendship",
    loveLanguage: "time",
    zodiac: "pisces",
    chineseSign: "rabbit",
    coreValue: "kindness"
  },
  {
    name: "Orion",
    image: "https://i.pravatar.cc/150?img=5",
    relationshipType: "both",
    loveLanguage: "words",
    zodiac: "leo",
    chineseSign: "dragon",
    coreValue: "growth"
  },
  {
    name: "Sora",
    image: "https://i.pravatar.cc/150?img=21",
    relationshipType: "romantic",
    loveLanguage: "touch",
    zodiac: "scorpio",
    chineseSign: "snake",
    coreValue: "loyalty"
  },
  {
    name: "Mira",
    image: "https://i.pravatar.cc/150?img=30",
    relationshipType: "friendship",
    loveLanguage: "acts",
    zodiac: "cancer",
    chineseSign: "goat",
    coreValue: "creativity"
  },
  {
    name: "Nova",
    image: "https://i.pravatar.cc/150?img=7",
    relationshipType: "both",
    loveLanguage: "gifts",
    zodiac: "gemini",
    chineseSign: "monkey",
    coreValue: "adventure"
  },
  {
    name: "Kai",
    image: "https://i.pravatar.cc/150?img=17",
    relationshipType: "romantic",
    loveLanguage: "time",
    zodiac: "virgo",
    chineseSign: "ox",
    coreValue: "freedom"
  }
];

function filterConnections() {
  const filters = {
    relationshipType: document.getElementById("relationshipType").value,
    loveLanguage: document.getElementById("loveLanguage").value,
    zodiac: document.getElementById("zodiac").value,
    chineseSign: document.getElementById("chineseSign").value,
    coreValue: document.getElementById("coreValue").value
  };

  const filtered = testProfiles.filter(profile => {
    return Object.keys(filters).every(key => {
      return !filters[key] || profile[key] === filters[key];
    });
  });

  displayMatches(filtered);
}

function displayMatches(matches) {
  const container = document.getElementById("matches");
  container.innerHTML = "";

  if (matches.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-500">No matches found. Try adjusting your filters.</p>';
    return;
  }

  matches.forEach(profile => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-xl shadow flex flex-col items-center text-center";
    card.innerHTML = `
      <img src="${profile.image}" alt="${profile.name}" class="w-24 h-24 rounded-full mb-2">
      <h3 class="text-lg font-semibold">${profile.name}</h3>
      <p class="text-sm text-gray-600">Zodiac: ${profile.zodiac}, Chinese: ${profile.chineseSign}</p>
      <p class="text-sm">❤️ ${profile.loveLanguage} | 🌟 ${profile.coreValue}</p>
      <p class="text-sm italic text-purple-600 mt-1">Match Level: ${Math.floor(Math.random() * 21) + 80}%</p>
    `;
    container.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", () => displayMatches(testProfiles));
