function saveMemory() {
  const input = document.getElementById("memoryInput").value.trim();
  if (!input) return alert("Please write something first!");

  let memories = JSON.parse(localStorage.getItem("soulMemories")) || [];
  memories.push(input);
  localStorage.setItem("soulMemories", JSON.stringify(memories));

  displayMemories();
  document.getElementById("memoryInput").value = "";
}

function displayMemories() {
  const memoryList = document.getElementById("memoryList");
  memoryList.innerHTML = "";
  const memories = JSON.parse(localStorage.getItem("soulMemories")) || [];

  memories.forEach((mem, index) => {
    const li = document.createElement("li");
    li.textContent = mem;
    memoryList.appendChild(li);
  });
}

function downloadMemory() {
  const memories = JSON.parse(localStorage.getItem("soulMemories")) || [];
  if (memories.length === 0) return alert("No memories to download!");

  const blob = new Blob([memories.join("\\n")], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "soul_memories.txt";
  link.click();
}

function clearMemory() {
  if (confirm("Are you sure you want to delete all memories?")) {
    localStorage.removeItem("soulMemories");
    displayMemories();
  }
}

// Auto-display on load
document.addEventListener("DOMContentLoaded", displayMemories);
