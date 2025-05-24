document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("memoryForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // neleidžia formos automatiškai persikrauti

    const language = document.getElementById("language").value;
    const value = document.getElementById("value").value;
    const dream = document.getElementById("dream").value;

    if (!language || !value || !dream) {
      alert("Please fill in all fields");
      return;
    }

    // URL šifravimas
    const params = new URLSearchParams({
      language,
      value,
      dream,
    });

    // Pereinama į soul-portrait.html su parametrais
    window.location.href = `soul-portrait.html?${params.toString()}`;
  });
});

