document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("soulForm");
  const language = document.getElementById("language");
  const value = document.getElementById("value");
  const dream = document.getElementById("dream");

  // Load from localStorage
  language.value = localStorage.getItem("soul_language") || "";
  value.value = localStorage.getItem("soul_value") || "";
  dream.value = localStorage.getItem("soul_dream") || "";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    localStorage.setItem("soul_language", language.value);
    localStorage.setItem("soul_value", value.value);
    localStorage.setItem("soul_dream", dream.value);
    alert("Saved! Your data will be remembered.");
  });
});