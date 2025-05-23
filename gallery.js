
document.addEventListener("DOMContentLoaded", function() {
  // TEST DATA SIMULATION
  localStorage.setItem("soulGallery", "You are a Soul Seeker with a creative spark and deep intuition.");

  const output = document.getElementById("galleryOutput");
  const storedData = localStorage.getItem("soulGallery");
  output.textContent = storedData ? storedData : "No data available.";

  document.getElementById("downloadBtn").addEventListener("click", function() {
    const blob = new Blob([output.textContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "my_soul_gallery.txt";
    link.click();
  });
});
