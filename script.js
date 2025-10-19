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
  // Appointment Form
  // -----------------------------
  const form = document.getElementById("contactForm");
  const button = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
  e.preventDefault();
  button.disabled = true;
  button.textContent = "Booking...";

  const formData = new FormData(form);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwzI4rqvk2MeshT1IkNOVOfB_5m6APDRumQwfTmqUNf8zcPsv5ek2lGlh6tjKDk9BDnmg/exec", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (result.status === "success") {
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
