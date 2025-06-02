document.addEventListener("DOMContentLoaded", () => {
    const galleryOutput = document.getElementById("galleryOutput");
    const soulGallery = localStorage.getItem("soulGallery");

    if (soulGallery) {
        galleryOutput.innerHTML = soulGallery;
    } else {
        galleryOutput.textContent = "No soul portraits found. Start your journey!";
    }
});

function downloadGallery() {
    const galleryText = localStorage.getItem("soulGallery") || "";
    const blob = new Blob([galleryText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my_soul_gallery.txt";
    a.click();
    URL.revokeObjectURL(url);
}
