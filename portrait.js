
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const language = urlParams.get("language");
  const value = urlParams.get("value");
  const dream = urlParams.get("dream");

  const portraitText = document.getElementById("portraitText");
  const soulText = `You are a Soul Seeker of ${value}, who speaks in ${language} and dreams to "${dream}".`;

  if (language && value && dream) {
    portraitText.textContent = soulText;
    const existing = localStorage.getItem("soulGallery") || "";
    const updated = `${existing}${soulText}
`;
    localStorage.setItem("soulGallery", updated);
  } else {
    portraitText.textContent = "Missing data for portrait. Please start from the beginning.";
  }
});
