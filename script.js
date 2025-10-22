document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  // -----------------------------
  // Dark Mode Toggle
  // -----------------------------
  function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = isDark ? "Light Mode ☀️" : "Dark Mode 🌙";
  }

  // restore dark mode
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = "Light Mode ☀️";
  }

  window.toggleDarkMode = toggleDarkMode; // make it global for button onclick

// -----------------------------
  // DOM utility: show hidden sections
  // Show all hidden sections (fade in)
// -----------------------------
  const DOM = {
    showHiddenSections: () => {
      const hiddenSections = document.querySelectorAll(".hidden");
      hiddenSections.forEach((section, index) => {
        // Add staggered animation delay
        setTimeout(() => {
          section.classList.add("show");
        }, index * 100);
      });
    },
  };

  // Show all sections on page load
  DOM.showHiddenSections();
  const hiddenSections = document.querySelectorAll(".hidden");
  hiddenSections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add("show");
      section.classList.remove("hidden");
    }, index * 100);
  });

// -----------------------------
// Contact form submission
// -----------------------------
  const form = document.getElementById("contact-form");
if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("status");
    status.textContent = "Sending...";
const formData = new FormData(form);

try {
const response = await fetch(
"https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec",
        {
          method: "POST",
          body: formData,
        }
        { method: "POST", body: formData }
);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!response.ok) throw new Error("Network response not OK");
const result = await response.json();

if (result.success) {
        alert("✅ Message sent successfully!");
        status.textContent = "✅ Appointment sent successfully!";
form.reset();
} else {
        alert("❌ Error: " + result.error);
        status.textContent = "❌ Error: " + (result.error || "Something went wrong");
}
} catch (err) {
      console.error("❌ Submission error:", err);
      alert("Error sending message. Please try again later.");
      console.error(err);
      status.textContent = "⚠️ Failed to send message. Please try again.";
}
});
});
