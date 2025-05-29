
document.addEventListener("DOMContentLoaded", () => {
  const userPlan = localStorage.getItem("userPlan") || "free";
  document.querySelectorAll("[data-required-plan]").forEach(el => {
    const required = el.getAttribute("data-required-plan");
    if ((required === "standard" && userPlan === "free") || (required === "premium" && userPlan !== "premium")) {
      el.innerHTML = `<div style="background:#fff4f4;color:#900;padding:20px;border:1px solid #f00;border-radius:10px;">
        🚫 This feature is only available for ${required} users. <a href='plans.html'>Upgrade here</a>.
      </div>`;
    }
  });
});
