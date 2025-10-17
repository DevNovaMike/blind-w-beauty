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
  // Apply dark mode immediately to avoid flash
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = "Light Mode ☀️";
  }

  // Smooth fade-in animations
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
    el.classList.add("show"); // Force show immediately
  });

  // -----------------------------
  // Contact / Appointment Form
  // -----------------------------
  const form = document.getElementById("contactForm");
  const button = form.querySelector("button[type='submit']");

  form.addEventListener("input", () => {
    button.disabled = !form.checkValidity();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.textContent = "Booking...";

    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzn2KOH4u6mnnJWfpyZk88SEQh3Kx1cAb_zg0E4QXdBzHk2D8FGQkvqcPN7JCVInTnW/exec", // ✅ Appointment Messages URL
        {
          method: "POST",
          body: params.toString(),
        }
      );

      const rawText = await response.text();
      console.log("Server response:", rawText);

      let result;
      try {
        result = JSON.parse(rawText);
      } catch {
        throw new Error("Unexpected response format — check console log.");
      }

      if (result.result === "success") {
        Swal.fire("✨ Appointment Sent!", "We'll contact you soon to confirm.", "success");
        form.reset();
      } else {
        throw new Error(result.message || "Server rejected the submission.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      Swal.fire("❌ Oops", "Something went wrong — please try again.", "error");
    } finally {
      button.disabled = false;
      button.textContent = "Book Now";
    }
  });
});
