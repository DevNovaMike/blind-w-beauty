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
  const form = document.getElementById("contactForm");
  if (!form) return;

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
        "https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload),
          cache: "no-cache"
        }
      );

      console.log("🌐 Response status:", response.status);

      // Try parsing JSON response
      let result = null;
      try {
        result = await response.json();
      } catch (parseErr) {
        console.warn("⚠️ Could not parse JSON:", parseErr);
      }

      // Success check
      if (response.ok && result && result.success) {
        console.log("✅ Success:", result);
        Swal.fire("✨ Appointment Sent!", "We'll contact you soon to confirm.", "success");
        form.reset();
      } else if (response.ok) {
        // Some success cases might not send JSON
        Swal.fire("✨ Appointment Sent!", "Your message was received successfully.", "success");
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
