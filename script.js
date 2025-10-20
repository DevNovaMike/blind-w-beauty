document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode
  function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = isDark ? "Light Mode ☀️" : "Dark Mode 🌙";
  }
  window.toggleDarkMode = toggleDarkMode;

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = "Light Mode ☀️";
  }

  document.querySelectorAll(".hidden").forEach(el => el.classList.add("show"));

  // Appointment Form
  const form = document.getElementById("contactForm");
  if (!form) return;
  const button = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.textContent = "Booking...";

    const formData = new FormData(form); // ✅ avoids preflight

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyzefOAw9DFzL5qA2nG5SeXsJQBNa1WMtMV4tyuazW3uFz-mQBomygXt9d8WOlNs_C7/exec",
        { method: "POST", body: formData }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        Swal.fire("✨ Appointment Sent!", "We'll contact you soon to confirm.", "success");
        form.reset();
      } else {
        Swal.fire("⚠️ Error", result.error || "Something went wrong — please try again.", "error");
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
