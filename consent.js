// TODO: Check if localStorage getItem is needed
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("consentForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const agree = document.getElementById("agree").checked;
    if (!agree) {
      console.log('[ALERT] ', "You must agree to the Terms and Privacy Policy.");
      return;
    }

    const preferences = {
      aiUse: document.getElementById("aiUse").checked,
      mentorUse: document.getElementById("mentorUse").checked,
      recommendations: document.getElementById("recommendations").checked,
      anonymizedUse: document.getElementById("anonymizedUse").checked,
    };

    localStorage.setItem("soulinkConsent", JSON.stringify(preferences));
    console.log('[ALERT] ', "Preferences saved!");
    window.location.href = "index.html";
  });
});
