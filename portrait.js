document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const language = params.get("language");
  const value = params.get("value");
  const dream = params.get("dream");

  const archetype = `Soul Seeker of ${value}`;
  const description = `You are a Soul Seeker of ${value}, who speaks in ${language} and dreams to "${dream}".`;

  document.getElementById("language").textContent = language;
  document.getElementById("value").textContent = value;
  document.getElementById("dream").textContent = dream;
  document.getElementById("archetype").textContent = archetype;
  document.getElementById("description").textContent = description;
});
