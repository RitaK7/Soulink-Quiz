// results-fixed.js

import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';

document.addEventListener("DOMContentLoaded", () => {
  // Load user data from localStorage
  const quizData = JSON.parse(localStorage.getItem("soulQuiz"));

  if (!quizData) {
    console.warn("No soulQuiz data found.");
    return;
  }

  // Show basic info
  document.getElementById("result-name").textContent = quizData.name || "—";
  document.getElementById("result-birthdate").textContent = quizData.birthdate || "—";
  document.getElementById("result-relationshipType").textContent = quizData.relationshipType || "—";
  document.getElementById("result-loveLanguage").textContent = quizData.loveLanguage || "—";
  document.getElementById("result-zodiacSign").textContent = quizData.zodiacSign || "—";
  document.getElementById("result-chineseSign").textContent = quizData.chineseSign || "—";
  document.getElementById("result-lifePathNumber").textContent = quizData.lifePathNumber || "—";

  // Love Language description
  const loveLanguageDescriptions = {
    "Words of Affirmation": "You thrive on kind words and meaningful praise. Your heart blossoms through verbal connection.",
    "Acts of Service": "You believe that love is action. You show you care through thoughtful help and kind deeds.",
    "Receiving Gifts": "You value thoughtful presents as symbols of love and appreciation.",
    "Quality Time": "You cherish deep moments and undivided attention in your relationships.",
    "Physical Touch": "Touch is your way of feeling closeness, care, and affection."
  };

  const loveDesc = loveLanguageDescriptions[quizData.loveLanguage] || "Description not available.";
  document.getElementById("result-loveLanguage-desc").textContent = loveDesc;

  // Zodiac descriptions
  document.getElementById("result-zodiac-desc").textContent = quizData.zodiacDescription || "Description not available.";
  document.getElementById("result-chinese-desc").textContent = quizData.chineseDescription || "Description not available.";
  document.getElementById("result-lifePath-desc").textContent = quizData.lifePathDescription || "Numerology meaning not available.";

  // EmailJS init
  emailjs.init("SY7ptjuNI88paiVbz");

  const feedbackForm = document.getElementById("feedback-form");
  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_ifo7026", "template_lrn1v8j", this).then(
      () => {
        alert("Thank you! Your feedback was sent successfully.");
        this.reset();
      },
      (error) => {
        console.error("EmailJS send error:", error);
        alert("Failed to send feedback. Please try again later.");
      }
    );
  });
});