document.addEventListener("DOMContentLoaded", () => {
  // Avatar
  const avatar = document.getElementById("avatarPreview");
  const storedImg = localStorage.getItem("userProfileImage");
  if (storedImg) {
    avatar.src = storedImg;
    avatar.classList.remove("hidden");
  }

  // Intro card data
  const name = localStorage.getItem("userName");
  const loveLang = localStorage.getItem("userLoveLanguage");
  const coreVal = localStorage.getItem("userCoreValue");

  const introCard = document.getElementById("introCard");
  const nameEl = document.getElementById("userNameDisplay");
  const langEl = document.getElementById("loveLanguageDisplay");
  const valEl = document.getElementById("coreValueDisplay");

  if (name || loveLang || coreVal) {
    introCard.classList.remove("hidden");
    nameEl.textContent = `👤 ${name || "Your Name"}`;
    langEl.textContent = loveLang || "–";
    valEl.textContent = coreVal || "–";
  }
});
