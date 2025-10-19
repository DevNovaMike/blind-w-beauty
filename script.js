// -----------------------------
// Dark Mode Toggle
// -----------------------------
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");

  const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
  if (btn) btn.textContent = isDark ? "Light Mode ☀️" : "Dark Mode 🌙";
}

// -----------------------------
// Initialize on DOM Content Loaded
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
  // Dark mode init
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = "Light Mode ☀️";
  }

  // Scroll animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll(".hidden").forEach(el => {
    observer.observe(el);
    el.classList.add("show");
  });

  // -----------------------------
  // Appointment Form Submission
  // -----------------------------
  const form = document.getElementById("contactForm");
  const button = form.querySelector("button[type='submit']");

  // Enable submit button when form is valid
  form.addEventListener("input", () => {
    button.disabled = !form.checkValidity();
  });

  // Submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.textContent = "Booking...";

    // Use FormData to avoid CORS preflight
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyzefOAw9DFzL5qA2nG5SeXsJQBNa1WMtMV4tyuazW3uFz-mQBomygXt9d8WOlNs_C7/exec", // <-- Replace with your deployed Apps Script URL
        {
          method: "POST",
          body: formData // ✅ FormData avoids preflight
        }
      );

      // Apps Script returns JSON string
      const result = await response.json();

      if (result.result === "success") {
        Swal.fire({
          icon: "success",
          title: "✨ Appointment Sent!",
          text: "We'll contact you soon to confirm.",
          confirmButtonColor: "#d4a373",
        });
        form.reset();
        button.disabled = true;
      } else {
        throw new Error(result.message || "Server rejected the submission.");
      }

    } catch (err) {
      console.error("Form submission error:", err);
      Swal.fire({
        icon: "error",
        title: "❌ Oops",
        text: "Something went wrong — please try again.",
      });
    } finally {
      button.disabled = false;
      button.textContent = "Book Now";
    }
  });
});
