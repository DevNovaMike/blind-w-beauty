// -----------------------------
// Safe DOM Ready Wrapper
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded");

  // Make page visible
  document.body.style.opacity = "1";

  // -----------------------------
  // Dark Mode Toggle
  // -----------------------------
  function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = isDark ? "Light Mode ☀️" : "Dark Mode 🌙";
  }
  window.toggleDarkMode = toggleDarkMode;

  // Restore dark mode state
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = "Light Mode ☀️";
  }

  // -----------------------------
  // Always Reveal Sections
  // -----------------------------
  document.querySelectorAll(".hidden").forEach(el => el.classList.add("show"));

  // -----------------------------
  // Appointment Form Submission
  // -----------------------------
  try {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("message", message);

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec",
    {
      method: "POST",
      body: formData, // ✅ no JSON, no headers — avoids preflight
    }
  );

  console.log("Server response:", response.status);

  if (response.ok) {
    Swal.fire("✨ Appointment Sent!", "We'll contact you soon to confirm.", "success");
    form.reset();
  } else {
    Swal.fire("⚠️ Error", "Something went wrong — please try again later.", "error");
  }
} catch (err) {
  console.error("❌ Submission error:", err);
  Swal.fire("❌ Network Error", "Please check your connection and try again.", "error");
} finally {
  button.disabled = false;
  button.textContent = "Book Now";
}
  });
});
