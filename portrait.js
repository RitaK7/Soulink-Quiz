document.addEventListener("DOMContentLoaded", function () {
  const language = localStorage.getItem("language");
  const value = localStorage.getItem("value");
  const dream = localStorage.getItem("dream");

  const container = document.getElementById("portraitContent");
  const imageContainer = document.getElementById("portraitImageContainer");

  if (!language || !value || !dream) {
    container.innerHTML = "<p>Missing data for portrait. Please start from the beginning.</p>";
    return;
  }

  container.innerHTML = `
    <p>You are a Soul Seeker of <strong>${value}</strong>,</p>
    <p>who speaks in <strong>${language}</strong>,</p>
    <p>and dreams to <strong>${dream}</strong>.</p>
  `;

  const img = document.createElement("img");
  img.src = "https://source.unsplash.com/400x200/?" + value.toLowerCase();
  img.alt = "Soul Portrait Visual";
  img.style.borderRadius = "12px";
  img.style.marginTop = "16px";

  imageContainer.appendChild(img);
});