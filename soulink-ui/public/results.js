// Example result code from original file
const form = document.getElementById("feedbackForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // feedback logic will go here
});

// --- EmailJS Feedback Logic ---
emailjs.init('SY7ptjuNl88paiVbz');

emailjs.send(
  'service_ifo7026',
  'template_1rn1v8j',
  {
    email: form.email.value,
    page: form.page.value,
    rating: form.rating.value,
    message: form.message.value
  },
  'SY7ptjuNl88paiVbz'
);