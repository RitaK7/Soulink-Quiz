
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("galleryOutput");
  const downloadBtn = document.getElementById("downloadBtn");

  const data = localStorage.getItem("soulGallery") || "";
  output.textContent = data;

  downloadBtn.addEventListener("click", () => {
    const blob = new Blob([data], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "my_soul_gallery.txt";
    a.click();
  });
});
