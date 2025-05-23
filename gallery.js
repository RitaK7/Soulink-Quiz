function getToday() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

document.addEventListener("DOMContentLoaded", () => {
  const language = localStorage.getItem("soul_language") || "(unknown)";
  const value = localStorage.getItem("soul_value") || "(unknown)";
  const dream = localStorage.getItem("soul_dream") || "(unknown)";
  const date = getToday();

  const summary = \`\${date} – You are a soulful being, led by the value of "\${value}", speaking the language of "\${language}", and dreaming of "\${dream}".\`;

  document.getElementById("galleryContent").innerText = summary;
  localStorage.setItem("soul_gallery_entry", summary);
});

function downloadText() {
  const text = localStorage.getItem("soul_gallery_entry");
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = "my_soul_gallery.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
}