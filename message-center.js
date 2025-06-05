// message-center.js

document.addEventListener("DOMContentLoaded", () => {
  const messageList = document.getElementById("messageList");
  const sentMessages = JSON.parse(localStorage.getItem("sentMessagesFull") || "[]");

  if (sentMessages.length === 0) {
    messageList.innerHTML = `
      <p class="text-center col-span-3 text-gray-500">You haven't sent any messages yet 💬</p>
    `;
    return;
  }

  sentMessages.forEach(entry => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-xl shadow text-center flex flex-col items-center";
    card.innerHTML = `
      <img src="https://i.pravatar.cc/150?u=${entry.name}" alt="${entry.name}" class="w-20 h-20 rounded-full mb-2">
      <h2 class="text-lg font-semibold">${entry.name}</h2>
      <p class="text-sm text-gray-600 italic">"${entry.message}"</p>
      <button class="mt-3 px-4 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600">💬 Continue Chat</button>
    `;
    messageList.appendChild(card);
  });
});
