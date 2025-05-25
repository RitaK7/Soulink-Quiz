// consent-guard.js

// Tikriname, ar duotas sutikimas
const consent = localStorage.getItem("soulinkConsent");

if (!consent) {
  // Jei nėra sutikimo, nukreipiame į consent.html
  window.location.href = "consent.html";
} else {
  console.log("Consent found:", JSON.parse(consent));
}
