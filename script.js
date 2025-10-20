// -----------------------------
// Safe DOM Ready Wrapper
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded");

  // -----------------------------
  // Fade-In Safety — show content immediately
  // -----------------------------
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

  // Initialize dark mode from localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = "Light Mode ☀️";
  }

  // -----------------------------
  // Fix Hidden Sections — Ensure visibility
  // -----------------------------
  const sections = document.querySelectorAll(".hidden");
  sections.forEach(el => {
    el.classList.add("show");
  });

  // -----------------------------
  // Appointment / Contact Form
  // -----------------------------
  const form = document.getElementById("contactForm");
  if (form) {
    const button = form.querySelector("button[type='submit']");

    form.addEventListener("input", () => {
      button.disabled = !form.checkValidity();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      button.disabled = true;
      button.textContent = "Booking...";

      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();
      const payload = { name, phone, message };

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyzefOAw9DFzL5qA2nG5SeXsJQBNa1WMtMV4tyuazW3uFz-mQBomygXt9d8WOlNs_C7/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            mode: "cors"
          }
        );

        console.log("Server response:", response.status);

        if (response.ok || response.status === 200) {
          Swal.fire("✨ Appointment Sent!", "We'll contact you soon to confirm.", "success");
          form.reset();
        } else {
          Swal.fire("❌ Oops", "Something went wrong — please try again.", "error");
        }
      } catch (err) {
        console.error("Form submission error:", err);
        Swal.fire("❌ Oops", "Network or server issue — please try again.", "error");
      } finally {
        button.disabled = false;
        button.textContent = "Book Now";
      }
    });
  }
});
