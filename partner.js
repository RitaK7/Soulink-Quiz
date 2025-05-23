document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const partnerKey = params.get("partner");

  const partners = {
    a: {
      name: "Aurora",
      language: "Words of Affirmation",
      value: "Freedom",
      dream: "Travel the world"
    },
    b: {
      name: "Lukas",
      language: "Quality Time",
      value: "Kindness",
      dream: "Peaceful family home"
    },
    c: {
      name: "Isla",
      language: "Physical Touch",
      value: "Trust",
      dream: "Live in nature cabin"
    },
    d: {
      name: "Theo",
      language: "Acts of Service",
      value: "Adventure",
      dream: "Launch a creative studio"
    }
  };

  const partner = partners[partnerKey];

  if (partner) {
    document.getElementById("name").textContent = partner.name;
    document.getElementById("language").textContent = partner.language;
    document.getElementById("value").textContent = partner.value;
    document.getElementById("dream").textContent = partner.dream;
  } else {
    document.getElementById("name").textContent = "Partner not found.";
  }
});