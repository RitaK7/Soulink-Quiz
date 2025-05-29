// checkPlan.js — Soulink plan validation script
document.addEventListener('DOMContentLoaded', () => {
  const userPlan = localStorage.getItem("userPlan");
  if (!userPlan) {
    alert("Please choose a plan to continue 🌟");
    window.location.href = "plans.html";
  }
});
