
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const language = params.get("language");
  const value = params.get("value");
  const dream = params.get("dream");

  const portraitText = document.getElementById("portraitText");

  if (!language || !value || !dream) {
    portraitText.innerText = "Missing data for portrait. Please start from the beginning.";
    return;
  }

  portraitText.innerText = `You are a Soul Seeker of ${value}, who speaks in ${language} and dreams to "${dream}". Your soul radiates this unique energy and is drawn to people who resonate on this same frequency.`;
});
